var $ = require("jquery");
var selected = '';

// DROPDOWN EVENTS
function dropdown() {

   // SHOW PRIMARY OPTIONS
   $('body').on('click', '#search', () => {

      // IF THE DROPDOWN ISNT OPEN, PURGE THE INPUT VALUE & RESET THE FILTER
      if ($('#options').css('display') != 'block') {
         $('#search').val('');
         search();
      }

      // FIND MENU HEIGHT
      var top = $('#menu')[0].offsetHeight;

      // CHANGE POSITION
      $('#options').css('top', top);
      $('#options').css('display', 'block');
   });

   // CLOSE OPTION EVENTS
   $('body').on('click', (event) => {
      
      // PICK UP TARGET ID
      var target = $(event.target).attr('id');

      // IF THE PRIMARY OPTIONS ARE VISIBLE
      if ($('#options').css('display') == 'block') {

         // DEFINE WHITELIST & CHECK IF THE ID IS WHITELISTED
         var whitelist = ['search', 'regions', 'capita', 'highlow'];
         var check = $.inArray(target, whitelist);

         // IF IT ISNT
         if (check == -1) {
            $('#options').css('display', 'none');
            $('#search').val(selected);
         }
      }
   });
}

// SETTINGS EVENTS
function settings(ui) {
   $('body').on('click', '#regions, #capita, #highlow', (event) => {

      // CHECK CURRENT STATUS
      var status = $(event.target).attr('class');

      // TOGGLE TO INACTIVE
      if (status == 'active') { $(event.target).attr('class', 'inactive');

      // TOGGLE TO ACTIVE
      } else { $(event.target).attr('class', 'active'); }

      // RECALIBRATE OPTIONS MENU & SEARCH FILTER
      ui.options();
      search();
   });
}

// OPTION SELECTION/FILTERING EVENTS
function select(build) {

   // FETCH THE D3 MODULE
   var d3 = require("d3");
   var render = require('../modules/render.js');


   // ON LOAD, RENDER A RANDOM COUNTRY
   if (selected == '') {
      var random = randomize(Object.keys(build));
      $('#search').val(random);
      selected = random;
      render.chart(build[random], d3);
   }

   // SELECT SOMETHING
   $('body').on('click', '#option', (event) => {

      // FETCH SELECTED COUNTRY
      var country = $(event.currentTarget).attr('country');

      // SET INPUT VALUE & SELECTED VAR
      $('#search').val(country);
      selected = country;

      // RENDER CHART
      render.chart(build[country], d3);
   });

   // IF THE WINDOW GETS RESIZED
   $(window).resize(() => {

      // DEFAULT SEARCH PLACEHOLDER
      var placeholder = 'Select a Country or Region';

      // IF WINDOW SIZE IS SMALL, CHANGE IT
      if (window.innerWidth < 600) {
         placeholder = 'Country';
      }

      // SET PLACEHOLDER
      $('#search').attr('placeholder', placeholder);

      // IF IT ISNT EMPTY, RE-RENDER
      if(selected != '') { render.chart(build[selected], d3); }
   });

   // SEARCHING EVENT
   $('body').on('keyup keydown', '#search', () => { search(); });
}

// SEARCHING FOR SOMETHING SPECIFIC
function search() {

   // DECLARE QUERY VAR
   var query = $('#search').val();

   // LOOP THROUGH THE SELECTORS
   $('div #option').each((num) => {

      // SHORTHANDS
      var selector = $('div #option')[num];
      var country = selector.attributes[1].value;

      // IF THE SEARCH MATCHES -- SHOW SELECTOR
      if (country.toLowerCase().indexOf(query.toLowerCase()) > -1) { selector.style.display = 'block'; something = true; 

      // IF IT DOESNT -- HIDE IT
      } else { selector.style.display = 'none'; }
   });
}

// EXPORT MODULES
module.exports = {
   dropdown: dropdown,
   settings: settings,
   select: select
};