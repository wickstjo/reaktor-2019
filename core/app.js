var build = require('./modules/build.js');
var ui = require('./modules/ui.js');
var events = require('./modules/events.js');

// INJECT LOADING SCREEN
ui.start_loading();

// CONSTRUCT THE BUILD
build.create().then((response) => {

   // ADD MODULES
   ui.options(response);
   events.settings(ui);
   events.dropdown();
   events.select(response);

   // REMOVE LOADING SCREEN
   ui.stop_loading();
});