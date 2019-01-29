(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var build = require('./modules/build.js');

build.create().then((data) => {
   log(data);
});
},{"./modules/build.js":2}],2:[function(require,module,exports){
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
   var emissions = fetch('EN.ATM.CO2E.KT');

   // WAIT FOR BOTH PROMISES TO RESOLVE
   return Promise.all([population, emissions]).then((response) => {
      
      // OVERWRITE THE OLD
      population = response[0][1];
      emissions = response[1][1];

      // DECLARE UNIFIED DATA OBJECT
      var data = {};

      // LOOP THROUGH & INJECT THE POPULATION BLOCK
      population.forEach(item => {
            
         // CHECK IF COUNTRY AND YEAR HAVE BEEN DECLARED
         if (data[item.country.value] == undefined) { data[item.country.value] = {}; }
         if (data[item.country.value][item.date] == undefined && item.value != null) {
            
            // DEFUALT OBJECT
            data[item.country.value][item.date] = {
               population: 'N/A', emissions: 'N/A'
            };
         }

         // INJECT POPULATION COUNT IF ITS AVAILABLE
         if (item.value != null) {
            data[item.country.value][item.date].population = item.value;
         }
      });

      // LOOP THROUGH & INJECT THE EMISSIONS BLOCK
      emissions.forEach(item => {

         // INJECT EMISSION COUNT IF ITS AVAILABLE & PARENT PROPERTY ISNT UNDEFINED
         if (item.value != null && data[item.country.value][item.date] != undefined) {
            data[item.country.value][item.date].emissions = item.value;
         }
      });

      return data;
   });
}

// EXPORT MODULES
module.exports = {
   create: create
};
},{}]},{},[1]);
