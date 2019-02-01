// SHORTHAND FOR CONSOLE LOGGING
function log(stuff) { console.log(stuff); }

// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}

function shorten(number) {
   return ((number * 1000) / 1000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' K';
}