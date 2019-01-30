// FETCH DATA BASED ON QUERY CODE
function fetch(code) {

   // INITIAL REQUEST TO FIND PAGECOUNT
   var init = $.getJSON('https://api.worldbank.org/v2/country/all/indicator/' + code + '?per_page=1&format=json');

   // WAIT FOR THE PROMISE TO RESOLVE
   return init.then((response) => {

      // FIND ITEMCOUNT BASED ON PAGES
      var items = response[0].pages;

      // REQUEST & RETURN ALL AVAILABLE DATA
      return $.getJSON('https://api.worldbank.org/v2/country/all/indicator/' + code + '?per_page=' + items + '&format=json');
   });
}

// CREATE USABLE DATA OBJECT
function create() {
   
   // FETCH ALL POPULATION & EMISSION DATA
   var population = fetch('SP.POP.TOTL');
   var emission = fetch('EN.ATM.CO2E.KT');

   // WAIT FOR BOTH PROMISES TO RESOLVE
   return Promise.all([population, emission]).then((response) => {
      
      // OVERWRITE THE OLD
      population = response[0][1];
      emission = response[1][1];

      // DECLARE ASSIST VARS
      var data = {};

      // BLACKLIST REGIONS FROM RESPONSE
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

      // LOOP THROUGH BOTH ARRAYS
      for (var x = 0; x < population.length; x++) {

         // CHECK IF THE ITEM IS BLACKLISTED
         var is_blacklisted = blacklisted(population[x].country.value, blacklist);

         // CHECK THAT BOTH SOURCES HAVE A DATAPOINT & THAT THE NAME ISNT BLACKLISTED
         if (population[x].value != null && emission[x].value != null && is_blacklisted == false) {

            // CREATE PROPERTY FOR THE COUNTRY IF IT DOESNT EXIST
            if (data[population[x].country.value] == undefined) {
               data[population[x].country.value] = {};
            }

            // INJECT AN OBJECT THAT CONTAINS DATA FOR THAT SPECIFIC YEAR
            data[population[x].country.value][population[x].date] = {
               population: population[x].value,
               emission: emission[x].value,
               score: population[x].value / emission[x].value
            }
         }
      }

      return data;
   });
}

// CHECK IF A NAME IS BLACKLISTED
function blacklisted(query, blacklist) {

   // DEFAULT TO FALSE
   var response = true;

   // CHECK IF THE QUERY IS CONTAINER IN THE BLACKLIST ARRAY
   var check = $.inArray(query, blacklist);
   
   // IF IT ISNT, CHANGE RESPONSE TO FALSE
   if (check == -1) { response = false; }

   return response;
}

// EXPORT MODULES
module.exports = {
   create: create
};