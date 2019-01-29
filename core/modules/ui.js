// CONSTRUCT THE OPTIONS MENU
function options(build) {

   // FETCH ALL THE KEYS
   var keys = Object.keys(build);

   // DECLARE THE SELECTOR CONTAINER
   var container = '';

   // LOOP THROUGH THE KEYS & CONSTRUCT AN OPTION
   keys.forEach(item => {
      container += '<div id="option">' + item + '</div>';
   });

   // INJECT THE CONTAINER
   $('#options').html(container);
}

// EXPORT MODULES
module.exports = {
   options: options
};