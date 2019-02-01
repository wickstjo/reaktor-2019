// WHEN OPTION IS CLICKED
function options(build, render, d3) {

   $('body').on('click', '#option', (event) => {

      // FIND THE TARGET DATA & THE YEARS WITH DATAPOINTS
      var data = build[event.target.innerText];
      var years = Object.keys(data);
      
      // SET SELECTOR HEADERS
      $('#target').text(event.target.innerText + ' (' + years[0] + '-' + years[years.length - 1] + ')');

      // RENDER REQUEST INTO ONTO A CHART
      render.chart(data, d3)
      render.panel(data);
   });
}

// SETTINGS EVENTS
function settings(ui) {
   $('body').on('click', '#regions, #capita, #highlow', (event) => {

      var status = $(event.target).attr('class');

      if (status == 'active') {
         $(event.target).attr('class', 'inactive');
      } else {
         $(event.target).attr('class', 'active');
      }

      ui.options();
   });
}

// EXPORT MODULES
module.exports = {
   options: options,
   settings: settings
};