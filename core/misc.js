// SHORTHAND FOR CONSOLE LOGGING
function log(stuff) { console.log(stuff); }

// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}

// FORMAT NUMBERS TO BE MORE PRESENTABLE
function format_num(number) {

   // IF THE NUMBER IS HIGHER THAN A MILLION -- DIVIDE MY A THOUSAND AND ADD A 'K'
   if (number > 1000000) {
      number = (number / 1000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " K";
   
   } else {
      
      // MORE THAN A THOUSAND
      if (number > 1000) { number = number.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

      // LESS THAN A THOUSAND
      } else { number = number.toFixed(2); }
   }

   return number;
}