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

      // RECALIBRATE OPTIONS MENU
      ui.options();
   });
}

// SELECT EVENTS
function select(build, render, d3) {
   $('body').on('click', '#option', (event) => {

      // FETCH SELECTED COUNTRY
      var country = $(event.currentTarget).attr('country');

      // SET INPUT VALUE
      $('#search').val(country);

      // RENDER CHART
      render.chart(build[country], d3);
   });
}

// EXPORT MODULES
module.exports = {
   dropdown: dropdown,
   settings: settings,
   select: select
};