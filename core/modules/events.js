function options(build, d3) {

   $('body').on('click', '#option', (event) => {

      // FIND THE TARGET
      var target = build[event.target.innerText];

      // SET SELECTOR HEADERS
      $('#country').text(event.target.innerText);

      // RENDER REQUEST INTO ONTO A CHART
      render(target, d3);
   });
}

// GENERATE RELATIONAL CHART & UPDATE DATA OBJECT
function render(target, d3) {

   // CREATE SHORTHANDS FOR CHART SELECTORS
   var selector = {
      population: '#population #content #inner #chart',
      emission: '#emission #content #inner #chart'
   }

   // NUKE OLD SVGs
   $('svg').remove();

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
      population: generate_path(lists.population, selector.population, d3),
      emission: generate_path(lists.emission, selector.emission, d3)
   }

   // GENERATE GRAPH CANVAS
   var canvas = d3.select(selector.population).append('svg')

      // ADD PATH
      canvas.append('path')
         .attr('fill', 'red')
         .attr('d', paths.population)
         .attr('opacity', 0.4)

   // GENERATE GRAPH CANVAS
   canvas = d3.select(selector.emission).append('svg')

      // ADD PATH
      canvas.append('path')
         .attr('fill', 'blue')
         .attr('d', paths.emission)
         .attr('opacity', 0.4)
}

// GENERATE A PATH
function generate_path(source, selector, d3) {

   // CHART SELECTOR DIMENSIONS
   selector = {
      height: $(selector)[0].offsetHeight,
      width: $(selector)[0].offsetWidth
   }

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