// RENDER DATA TO A CHART
function chart(data, d3) {

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
   Object.keys(data).forEach(year => {
      lists.population.push(data[year].population);
      lists.emission.push(data[year].emission);
      lists.score += data[year].score;
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
         .attr('class', 'population-chart')
         .attr('d', paths.population)

      // ADD PATH
      canvas.append('path')
         .attr('class', 'emission-chart')
         .attr('d', paths.emission)
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
      .curve(d3.curveCardinal)

   // RETURN A GENERATED PATH
   return pathify(source);
}

// RENDER SIDEPANEL CONTENTS
function panel(data) {

   // FIND KEYS & DECLARE CONTAINER
   var years = Object.keys(data);
   var container = '';

   years.forEach(year => {
      container += '<div id="block"><u>' + year + '</u><br>' + data[year].population + '<br>' + data[year].emission + '</div>';
   });

   $('#details #inner').html(container);
}

// EXPORT MODULES
module.exports = {
   chart: chart,
   panel: panel
};