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

      // FETCH SPECIFIC DATA
      var target = build[event.target.innerText];

      render(target, d3);
   });
}

// RENDER A CHART
function render(target, d3) {

   // CHART SELECTOR DIMENSIONS
   var selector = {
      height: $('#chart')[0].offsetHeight,
      width: $('#chart')[0].offsetWidth
   }

   // Y-SCALING
   var yScale = d3.scaleLinear()
      .domain([target.min.population, target.max.population])
      .range([0, selector.height])

   // X-SCALING
   var xScale = d3.scaleLinear()
      .domain([0, Object.keys(target.data).length])
      .rangeRound([0, selector.width]) 

   // GENERATE PATH METHOD
   var pathify = d3.line()
      .x((data, i) => { return xScale(i) })
      .y((data) => { return yScale(data) })

   // CONVERT XY OBJECTS INTO D3 PATHS
   var testinggg = pathify(target.data);
   
   // GENERATE GRAPH CANVAS
   var canvas = d3.select('#chart').append('svg')
      .attr('height', selector.height)
      .attr('width', selector.width)

   // GENERATE PATH
   canvas.append('path')
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1)
      .attr('opacity', 1)
      .attr('d', testinggg)

   // GENERATE DOTS FOR BREAKPOINTS
   canvas.selectAll('line')
      .data(target.data)
         .enter().append('line')
            .attr('x1', (d, i) => { return xScale(i) })
            .attr('y1', (d, i) => { return yScale(data.spread.avg[i] - (d.difference * 5)) })
            .attr('x2', (d, i) => { return xScale(i) })
            .attr('y2', (d, i) => { return yScale(data.spread.avg[i] + (d.difference * 5)) })
            .attr('stroke', settings.border.color)
            .attr('stroke-width', line)
            .attr('opacity', settings.opacity)
}

// EXPORT MODULES
module.exports = {
   options: options,
   chart: chart
};