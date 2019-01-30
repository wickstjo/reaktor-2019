// CONSTRUCT THE OPTIONS MENU
function options(build) {
   
   // FETCH ALL THE KEYS & DECLARE THE CONTAINER
   var keys = Object.keys(build);
   var container = '';

   // LOOP THROUGH THE KEYS & CONSTRUCT AN OPTION
   keys.forEach(item => { container += '<div id="option">' + item + '</div>'; });

   // INJECT THE CONTAINER
   $('#options #inner').html(container);
}

// EXPORT MODULES
module.exports = {
   options: options
};