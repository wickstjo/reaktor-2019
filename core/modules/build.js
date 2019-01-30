// FETCH DATA BASED ON QUERY CODE
function fetch(code) {

   // INITIAL REQUEST TO FIND PAGECOUNT
   var init = $.getJSON('https://api.worldbank.org/v2/country/all/indicator/' + code + '?per_page=1&format=json');

   // WAIT FOR THE PROMISE TO RESOLVE
   return init.then((response) => {

      // FIND ITEMCOUNT BASED ON PAGES
      var items = response[0].pages;

      items = 1000;

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

      // LOOP THROUGH BOTH ARRAYS
      for (var x = 0; x < population.length; x++) {

         // CHECK THAT THERES A DATAPOINT FOR BOTH POPULATION & EMISSION FOR THAT YEAR
         if (population[x].value != null && emission[x].value != null) {

            // CREATE PROPERTY FOR THE COUNTRY IF IT DOESNT EXIST
            if (data[population[x].country.value] == undefined) {
               data[population[x].country.value] = {};
            }

            // INJECT AN OBJECT THAT CONTAINS DATA FOR THAT SPECIFIC YEAR
            data[population[x].country.value][population[x].date] = {
               population: population[x].value,
               emission: emission[x].value
            }
         }
      }

      return data;
   });
}

// EXPORT MODULES
module.exports = {
   create: create
};