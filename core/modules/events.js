// WHEN OPTION IS CLICKED
function options(build, d3) {

   $('body').on('click', '#option', (event) => {

      // FIND THE TARGET & THE YEARS WITH DATAPOINTS
      var target = build[event.target.innerText];
      var years = Object.keys(target);
      
      // SET SELECTOR HEADERS
      $('#target').text(event.target.innerText + ' (' + years[0] + '-' + years[years.length - 1] + ')');

      // RENDER REQUEST INTO ONTO A CHART
      render(target, d3);
   });
}

// RENDER DATA TO A CHART
function render(target, d3) {

   // NUKE OLD SVG
   $('svg').remove();

   // CHART SELECTOR DIMENSIONS
   var selector = {
      height: $('#chart')[0].offsetHeight,
      width: $('#chart')[0].offsetWidth
   }

   // DECLARE CONTAINERS
   var lists = {
      population: [],
      emission: [],
      score: 0
   }

   // FILL THE LISTS
   Object.keys(target).forEach(year => {
      lists.population.push(target[year].population);
      lists.emission.push(target[year].emission);
      lists.score += target[year].score;
   });

   // CREATE D3 PATHS FOR BOTH
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
   options: options
};