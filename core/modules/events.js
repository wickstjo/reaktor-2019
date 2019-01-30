// SHOW/HIDE OPTIONS MENU
function options() {

   // SHOW OPTIONS MENU
   $('body').on('mouseover', '#options-header, #options-body', () => {
      
      // LEFT ALIGNMENT + OFFSET
      var left = $('#options-header')[0].offsetLeft + 25;

      // TOP ALIGNMENT
      var top = $('#options-header')[0].offsetTop;
      top += $('#options-header')[0].offsetHeight;

      // EXECUTE CSS MOVEMENT & MAKE THE SELECTOR VISIBLE
      $('#options-body').css('display', 'block');
      $('#options-body').css('left', left);
      $('#options-body').css('top', top);

   });

   // HIDE OPTIONS MENU
   $('body').on('mouseout', '#options-header, #options-body', () => {
      $('#options-body').css('display', 'none');
   });

}

// SELECT CHART
function chart(build, d3) {

   $('body').on('click', '#option', (event) => {

      // HIDE THE OPTIONS
      $('#options-body').css('display', 'none');

      $('#options-header').text(event.target.innerText);

      // RENDER REQUEST INTO ONTO A CHART
      render(build[event.target.innerText], d3);
   });
}

// GENERATE RELATIONAL CHART & UPDATE DATA OBJECT
function render(target, d3) {

   $('#chart').html('');

   // CHART SELECTOR DIMENSIONS
   var selector = {
      height: $('#chart')[0].offsetHeight - 4,
      width: $('#chart')[0].offsetWidth - 4
   }

   // DECLARE CONTAINERS
   var lists = {
      population: [],
      emission: []
   }

   // FILL THE LISTS
   Object.keys(target).forEach(year => {
      lists.population.push(target[year].population);
      lists.emission.push(target[year].emission);
   });

   var paths = {
      population: generate_path(lists.population, selector, d3),
      emission: generate_path(lists.emission, selector, d3)
   }

   // GENERATE GRAPH CANVAS
   var canvas = d3.select('#chart').append('svg')

      // ADD PATH
      canvas.append('path')
         .attr('fill', 'red')
         .attr('d', paths.population)
         .attr('opacity', 0.4)

      // ADD PATH
      canvas.append('path')
         .attr('fill', 'blue')
         .attr('d', paths.emission)
         .attr('opacity', 0.4)
}

// GENERATE A PATH
function generate_path(source, selector, d3) {

   // Y-SCALING -- BASED ON OVERALL HIGHEST VALUE
   var yScale = d3.scaleLinear()
      .domain([Math.max(...source), Math.min(...source)])
      .range([0, selector.height])

   // X-SCALING
   var xScale = d3.scaleTime()
      .domain([0, source.length - 1])
      .rangeRound([0, selector.width])

   // PATH METHOD
   var pathify = d3.area()
      .x((data, i) => { return xScale(i) })
      .y0(yScale(0))
      .y1((data) => { return yScale(data) })

   // RETURN A GENERATED PATH
   return pathify(source);
}

// EXPORT MODULES
module.exports = {
   options: options,
   chart: chart
};