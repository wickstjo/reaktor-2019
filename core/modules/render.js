// RENDER DATA TO A CHART
function chart(data, d3) {

   // NUKE OLD SVG
   $('svg').remove();

   // CHART SELECTOR DIMENSIONS
   var selector = {
      height: $('#primary-chart')[0].offsetHeight - 4,
      width: $('#primary-chart')[0].offsetWidth - 4
   }

   // DECLARE CONTAINERS
   var lists = {
      population: [],
      emission: [],
      capita: [],
      score: 0
   }

   // FILL THE LISTS
   Object.keys(data.overview).forEach(year => {
      lists.population.push(data.overview[year].population);
      lists.emission.push(data.overview[year].emission);
      lists.score += data.overview[year].score;
   });

   // UNIVERSAL X-SCALING
   var xScale = d3.scaleTime()
      .domain([0, lists.population.length - 1])
      .rangeRound([0, selector.width])

   // POPULATION Y-SCALING
   var yScalePop = generate_yScaling(lists.population, selector, d3);
   var yScaleEmi = generate_yScaling(lists.emission, selector, d3);

   // POPULATION AXIS (LEFT)
   var popAxis = d3.axisRight(yScalePop)
      .tickPadding(7)
      .ticks(5)

   // POPULATION AXIS (LEFT)
   var emiAxis = d3.axisTop(yScaleEmi)
      .tickPadding(7)
      .ticks(5)

   // GENERATE D3 PATHS FOR BOTH
   var paths = {
      population: generate_path(lists.population, xScale, yScalePop, d3),
      emission: generate_path(lists.emission, xScale, yScaleEmi, d3)
   }

   // GENERATE CANVAS
   var canvas = d3.select('#primary-chart').append('svg')

      // ADD POPULATION PATH
      canvas.append('path')
         .attr('class', 'population-chart')
         .attr('d', paths.population)

      // ADD DOTS
      canvas.selectAll('.pop')
         .data(lists.population)
            .enter().append('circle')
            .attr('class', 'pop')
            .attr('cx', (data, i) => { return xScale(i) })
            .attr('cy', (data) => { return yScalePop(data) })
            .attr('r', 2)

      // ADD EMISSION PATH
      canvas.append('path')
         .attr('class', 'emission-chart')
         .attr('d', paths.emission)

      // ADD DOTS
      canvas.selectAll('.eme')
         .data(lists.emission)
            .enter().append('circle')
            .attr('class', 'eme')
            .attr('cx', (data, i) => { return xScale(i) })
            .attr('cy', (data) => { return yScaleEmi(data) })
            .attr('r', 2)

      // ADD GRIDLINES
      canvas.append('g')
         .attr('transform', 'translate(0, ' + selector.height + ')')
         .call(
            d3.axisBottom(xScale)
               .tickSize(-selector.height)
               .tickFormat('')
               .ticks(lists.population.length)
         )

      // ADD POPULATION AXIS
      canvas.append('g')
         .attr('class', 'yAxis')
         .call(popAxis)
         .style('pointer-events', 'unset')

      // ADD EMISSION AXIS
      canvas.append('g')
         .attr('class', 'yAxisx')
         .call(emiAxis)
         .style('pointer-events', 'unset')
}

// GENERATE A D3 AREA PATH
function generate_path(source, xScale, yScale, d3) {

   // PATH METHOD
   var pathify = d3.area()
      .x((data, i) => { return xScale(i) })
      .y0(yScale(0))
      .y1((data) => { return yScale(data) })
      //.curve(d3.curveCardinal)

   // RETURN A GENERATED PATH
   return pathify(source);
}

// GENERATE YSCALING
function generate_yScaling(source, selector, d3) {
   return d3.scaleLinear()
      .domain([Math.max(...source), Math.min(...source)])
      .range([0, selector.height])
}

// EXPORT MODULES
module.exports = {
   chart: chart
};