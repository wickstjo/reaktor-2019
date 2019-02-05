var $ = require("jquery");

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

      // LOOP THROUGH BOTH ARRAYS
      for (var x = 0; x < population.length; x++) {

         // CHECK THAT BOTH SOURCES HAVE A DATAPOINT & THAT THE NAME ISNT BLACKLISTED
         if (population[x].value != null && emission[x].value != null) {

            // CREATE PROPERTY FOR THE COUNTRY IF IT DOESNT EXIST
            if (data[population[x].country.value] == undefined) {
               data[population[x].country.value] = {
                  overview: {},
                  recent: {
                     total: 0,
                     capita: 0
                  }
               };
            }

            // INJECT AN OBJECT THAT CONTAINS DATA FOR THAT SPECIFIC YEAR
            data[population[x].country.value].overview[population[x].date] = {
               population: population[x].value,
               emission: emission[x].value * 1000
            }
         }
      }

      // LOOP THROUGH THE GENERATED OBJECT
      Object.keys(data).forEach(country => {
         
         // FIND THE LATEST ENTRY
         var keys = Object.keys(data[country].overview);
         var latest = Math.max(...keys);

         // SET STATS FOR THE MOST RECENT ENTRY -- FOR SORTING PURPOSES
         data[country].recent.total = data[country].overview[latest].emission;
         data[country].recent.capita = (data[country].overview[latest].emission / data[country].overview[latest].population);
      });

      return data;
   });
}

// FETCH HARDCODED DATASET -- FOR DEVELOPMENT ONLY
function dev() {
   var query = $.getJSON('core/dev_data.json');
   return query.then((response) => { return response; });
}

// EXPORT MODULES
module.exports = {
   create: create,
   dev: dev
};