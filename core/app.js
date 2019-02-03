var build = require('./modules/build.js');
var ui = require('./modules/ui.js');
var events = require('./modules/events.js');
var render = require('./modules/render.js');
var d3 = require("d3");

// INJECT LOADING SCREEN
//ui.start_loading();

// CONSTRUCT THE BUILD
build.dev().then((response) => {

   // ADD MODULES
   ui.options(response);
   events.settings(ui);
   events.dropdown();
   events.select(response, render, d3);

   // REMOVE LOADING SCREEN
   //ui.stop_loading();
});