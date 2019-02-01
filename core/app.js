var build = require('./modules/build.js');
var ui = require('./modules/ui.js');
var events = require('./modules/events.js');
var render = require('./modules/render.js');
var d3 = require("d3");

// CREATE THE BUILD
build.dev().then((response) => {

   ui.options(response);
   events.settings(ui);

   // OPTIONS STUFF
   //events.options(response, render, d3);

});