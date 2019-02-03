// DROPDOWN EVENTS
function dropdown() {

   // SHOW PRIMARY OPTIONS
   $('body').on('click', '#search', () => {

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
         if (check == -1) { $('#options').css('display', 'none'); }
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

      // RECALIBRATE OPTIONS MENU & UPDATE THE SEARCH FILTER
      ui.options();
   });
}

// OPTION SELECTION/FILTERING EVENTS
function select(build, render, d3) {

   // SELECT SOMETHING
   $('body').on('click', '#option', (event) => {

      // FETCH SELECTED COUNTRY
      var country = $(event.currentTarget).attr('country');

      // SET INPUT VALUE & RECALIBRATE SEARCH FILTER
      $('#search').val(country);

      // RENDER CHART
      render.chart(build[country], d3);
   });

   // IF THE WINDOW GETS RESIZED
   $(window).resize(() => {

      // CHECK THE CURRENT INPUT CONTENT
      var input_value = $('#search').val();

      // IF IT ISNT EMPTY, RE-RENDER
      if(input_value.length != 0) { render.chart(build[input_value], d3); }
   });

   // SEARCHING EVENT
   $('body').on('keyup keydown', '#search', () => { search(); });
}

// SEARCHING FOR SOMETHING SPECIFIC
function search(reset = false) {

   // DECLARE QUERY VAR
   var query;

   // USE INPUT VALUE AS QUERY
   if (reset == false) { query = $('#search').val();

   // USE NOTHING AS QUERY
   } else { query = ''; }

   // LOOP THROUGH THE SELECTORS
   $('div #option').each((num) => {

      // SHORTHANDS
      var selector = $('div #option')[num];
      var country = selector.attributes[1].value;

      // IF THE SEARCH MATCHES -- SHOW SELECTOR
      if (country.toLowerCase().indexOf(query.toLowerCase()) > -1) { selector.style.display = 'block';

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