// DROPDOWN EVENTS
function dropdown() {

   // SHOW PRIMARY OPTIONS
   $('body').on('click', '#primary-search', () => {

      var position = {
         top: $('#primary-search')[0].offsetTop + $('#primary-search')[0].offsetHeight,
         left: $('#primary-search')[0].offsetLeft
      }

      $('#primary-chart').css('opacity', 0);

      $('#primary-options').css('top', position.top);
      $('#primary-options').css('left', position.left);
      $('#primary-options').css('display', 'block');
   });

   // CLOSE OPTION EVENTS
   $('body').on('click', (event) => {
      
      // PICK UP TARGET ID
      var target = $(event.target).attr('id');

      // IF THE PRIMARY OPTIONS ARE VISIBLE
      if ($('#primary-options').css('display') == 'block') {

         // DEFINE WHITELIST & CHECK IF THE ID IS WHITELISTED
         var whitelist = ['primary-search', 'regions', 'capita', 'highlow'];
         var check = $.inArray(target, whitelist);

         // IF IT ISNT
         if (check == -1) {
            $('#primary-options').css('display', 'none');
            $('#primary-chart').css('opacity', 1);
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
      $('#primary-search').val(country);

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