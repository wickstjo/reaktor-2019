// RENDER DATA TO A CHART
function chart(data, d3) {
   
   // DECLARE CONTAINERS
   var lists = {
      population: [],
      emission: [],
      capita: []
   }

   // FETCH THE YEARS FOR TOOLTIPS
   var years = Object.keys(data.overview);

   // LOOP THROUGH & FILL THE LISTS
   years.forEach(year => {
      lists.population.push(data.overview[year].population);
      lists.emission.push(data.overview[year].emission);
      lists.capita.push(data.overview[year].emission / data.overview[year].population);
   });

   // CONVERT ARRAY DATA TO CHARTS
   generate_charts(lists, years, d3);
}

// GENERATE CHARTS
function generate_charts(data, years, d3) {

   // FIND THE HEADER KEYS
   var keys = Object.keys(data);

   // LOOP THROUGH
   keys.forEach(header => {

      // CHART SELECTOR DIMENSIONS
      var selector = {
         height: $('#' + header + '-chart .inner')[0].clientHeight,
         width: $('#' + header + '-chart .inner')[0].clientWidth
      }

      // NUKE OLD CONTENT
      $('#' + header + '-chart .inner').html('');

      // SET Y SCALE OFFSET FOR MIN/MAX POINTS
      var yOffset = 20;

      // Y SCALING
      var yScale = d3.scaleLinear()
         .domain([Math.max(...data[header]), Math.min(...data[header])])
         .range([20, selector.height - yOffset])

      // X SCALING
      var xScale = d3.scaleTime()
         .domain([0, data[header].length - 1])
         .rangeRound([0, selector.width])

      // PATH METHOD
      var pathify = d3.area()
         .x((data, i) => { return xScale(i) })
         .y0(yScale(0) + yOffset)
         .y1((data) => { return yScale(data)})
         //.curve(d3.curveCardinal)

      // GENERATE AN AREA PATH
      var path = pathify(data[header]);

      // GENERATE CANVAS
      var canvas = d3.select('#' + header + '-chart .inner').append('svg')

         // ADD POPULATION PATH
         canvas.append('path')
            .attr('class', header + '-area')
            .attr('d', path)

         // ADD GRIDLINES
         canvas.selectAll('.' + header + '-line')
            .data(data[header])
            .enter().append('line')
               .attr('x1', (data, i) => { return xScale(i) })
               .attr('x2', (data, i) => { return xScale(i) })
               .attr('y1', 0)
               .attr('y2', selector.height)

         canvas.selectAll(header + 'circles')
            .data(data[header])
            .enter().append('circle')
               .attr('cx', (data, i) => { return xScale(i) })
               .attr('cy', (data) => { return yScale(data) })
               .attr('r', 3)
               .on('mouseover', function(d, i) {
                  d3.select(this).attr("r", 8)
                  show_tooltip(d3.event, years[i], d);
               }) 
               .on('mouseout', function() {
                  d3.select(this).attr("r", 3)
                  hide_tooltip();
               })
   });
}

// SHOW TOOLTIP
function show_tooltip(event, year, value) {

   // SHORTHAND
   var tooltip = $('#tooltip');

   // INJECT NEW TOOLTIP CONTENT
   tooltip.html(year + ': ' + value).css('display', 'block')

   // FIND DOT COORDINATES
   var coords = {
      top: event.pageY,
      left: event.pageX
   }

   // FIND TOOLTIPS DIMENSIONS
   var dimensions = {
      height: tooltip[0].clientHeight,
      width: tooltip[0].clientWidth
   }

   // POSITION & SHOW THE TOOLTIP
   tooltip
      .css('top', coords.top - (dimensions.height + 15))
      .css('left', coords.left - (dimensions.width / 2))
      .css('opacity', 1)
}

// HIDE TOOLTIP
function hide_tooltip() {
   $('#tooltip')
      .css('opacity', 0)
      .css('display', 'none')
}

// EXPORT MODULES
module.exports = {
   chart: chart
};