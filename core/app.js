var build = require('./modules/build.js');
var ui = require('./modules/ui.js');
var events = require('./modules/events.js');
var d3 = require("d3");

// SET MENU MAX HEIGHT
var height = $(window)[0].innerHeight;
$('#options').css('height', height);

// CREATE THE BUILD
build.create().then((response) => {

   // RENDER THE OPTIONS
   ui.options(response);
   events.options(response, d3);

});