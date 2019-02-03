var build = {};
var countries = [];

// CONSTRUCT THE OPTIONS MENU
function options(response = null) {

   // IF A PARAMETER IS GIVEN, SET THE GLOBAL VARS
   if (response != null) {
      build = response;
      countries = Object.keys(build);
   }

   // DECLARE THE SELECTOR CONTAINER
   var container = '';

   // FILTER & SORT THE LIST OF COUNTRIES
   var filtered = filter(countries);

   // LOOP THROUGH THE KEYS & CONSTRUCT AN OPTION
   filtered.forEach((item, index) => {
      container += '<div id="option" country="' + item.country + '"><div class="split"><div>' + (index + 1) + '. ' + item.country + '</div><div>' + format_num(item.value) + '</div></div></div>';
   });

   // INJECT THE CONTAINER
   $('#options').html(container);
}

// SORT MENU ITEMS
function filter(keys) {
   
   // CHECK WHICH OPTIONS ARE ACTIVE
   var regions = is_active('#regions');
   var capita = is_active('#capita');
   var highlow = is_active('#highlow');

   // IF 'REMOVE REGIONS' IS ACTIVE
   if (regions == true) {
      keys = keys.filter(word => is_blacklisted(word));
   }
   
   // DECLARE TEMP OBJECT
   var temp = [];

   // LOOP THROUGH THE FILTERED COUNTRIES
   keys.forEach(country => {
      
      // DEFAULT SORTING VALUE
      var value = build[country].recent.total;

      // IF 'PER CAPITA' IS ACTIVE
      if (capita == true) { value = build[country].recent.capita }

      // CREATE & PUSH AN OBJECT
      temp.push({ country: country, value: value });
   });
   
   // BUBBLE SORT FROM HIGH TO LOW
   keys = bubble_sort(temp);

   // IF 'LOWEST FIRST' IS ACTIVE, REVERSE THE ARRAY
   if (highlow == true) { keys = keys.reverse() }

   return keys;
}

// CHECK IF AN OPTION IS ACTIVE
function is_active(selector) {

   var response = true;
   var check = $(selector).attr('class');

   if (check == 'inactive') { response = false; }

   return response;
}

// CHECK IF A NAME IS BLACKLISTED
function is_blacklisted(name) {

   // DEFAULT RESPONSE
   var response = true;

   // BLACKLISTED NAMES
   var blacklist = [
      'Arab World',
      'Caribbean small states',
      'Central Europe and the Baltics',
      'Early-demographic dividend',
      'East Asia & Pacific',
      'East Asia & Pacific (excluding high income)',
      'East Asia & Pacific (IDA & IBRD countries)',
      'Euro area',
      'Europe & Central Asia',
      'Europe & Central Asia (excluding high income)',
      'Europe & Central Asia (IDA & IBRD countries)',
      'European Union',
      'Fragile and conflict affected situations',
      'Heavily indebted poor countries (HIPC)',
      'High income',
      'IBRD only',
      'IDA & IBRD total',
      'IDA blend',
      'IDA only',
      'IDA total',
      'Late-demographic dividend',
      'Latin America & Caribbean',
      'Latin America & Caribbean (excluding high income)',
      'Latin America & the Caribbean (IDA & IBRD countries)',
      'Least developed countries: UN classification',
      'Low & middle income',
      'Low income',
      'Lower middle income',
      'Middle East & North Africa',
      'Middle East & North Africa (excluding high income)',
      'Middle East & North Africa (IDA & IBRD countries)',
      'Middle income',
      'North America',
      'OECD members',
      'Other small states',
      'Pacific island small states',
      'Post-demographic dividend',
      'Pre-demographic dividend',
      'Small states',
      'South Asia',
      'South Asia (IDA & IBRD)',
      'Sub-Saharan Africa',
      'Sub-Saharan Africa (excluding high income)',
      'Sub-Saharan Africa (IDA & IBRD countries)',
      'Upper middle income',
      'World'
   ];

   // CHECK IF THE VALUE IS BLACKLISTED
   if ($.inArray(name, blacklist) != -1) { response = false; }

   return response;
}

// BUBBLE SORT KV LIST
function bubble_sort(list) {

   // https://stackoverflow.com/questions/7502489/bubble-sort-algorithm-javascript
   var swapped;

   do {
      swapped = false;
      for (var i = 0; i < list.length - 1; i++) {
         if (list[i].value < list[i + 1].value) {
            var temp = list[i];
            list[i] = list[i + 1];
            list[i + 1] = temp;
            swapped = true;
         }
      }
   } while (swapped);

   return list;
}

// FORMAT NUMBERS TO BE MORE PRESENTABLE
function format_num(number) {

   // IF THE NUMBER IS HIGHER THAN A MILLION -- DIVIDE MY A THOUSAND AND ADD A 'K'
   if (number > 1000000) {
      number = (number / 1000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " K";
   
   } else {
      
      // MORE THAN A THOUSAND
      if (number > 1000) { number = number.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

      // LESS THAN A THOUSAND
      } else { number = number.toFixed(2); }
   }

   return number;
}

// EXPORT MODULES
module.exports = {
   options: options
};