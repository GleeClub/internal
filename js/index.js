Vue.config.devtools = true;

var homeapp = new Vue({
  el: '#home',
  data(){
  	return{
  		events: '',
      burgerIsActive: false,
      thereAreEvents: false
  	}
  },
  methods:{
    drawAttendanceGraph: function(){
      var margin = {
        "top":20,
        "right":20,
        "bottom":20,
        "left":24
      };
      var width = d3.select("svg").node().parentNode.clientWidth;
      var height = 500;
      var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate("+margin.left/2+", "+margin.top/2+")");

      var gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "attendanceGradient")
        .attr("gradientTransform", "rotate(90)");
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "magenta")
      gradient.append("stop")
        .attr("offset", "10%")
        .attr("stop-color", "cyan")
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "grey");
      var div = d3.select("#tooltip")
          .attr("class", "tooltip")
          .attr("class", "hidden");
      var parseTime = d3.timeParse("%d-%b-%y");
      sampleData.attendance.forEach(function (d){
        d.date = new Date(d.date*1000);
        // d.date = parseTime(d.date);
        // console.log("date", d.date);
      });

      var x = d3.scaleTime()
        .rangeRound([margin.left, width-margin.right]);
      var y = d3.scaleLinear()
        .rangeRound([height-margin.bottom, margin.top]);
      x.domain(d3.extent(sampleData.attendance, function(d) { return d.date; }));
      y.domain([0, 100]);
      // console.log("y", y(50));
      // console.log("date", sampleData.attendance[10].date);
      // console.log("x", x(sampleData.attendance[10].date));

      svg.append("g")
        .attr("transform", "translate(0," + (height-margin.bottom) + ")")
        .call(d3.axisBottom(x)
          .ticks(3));
      svg.append("g")
          .attr("transform", "translate("+ margin.left +", 0)")
        .call(d3.axisLeft(y));

      // console.log("valueline", valueline);
      var valueline = d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) {
            if(d.partialScore > 0) return y(d.partialScore);
            else return y(0);
          })
          .curve(d3.curveMonotoneX);
      sampleData.attendance.unshift(
        {
          "date":sampleData.attendance[0].date,
          "partialScore":0
        });
      sampleData.attendance.push({
        "date":sampleData.attendance[sampleData.attendance.length-1].date,
        "partialScore":0
      });
      svg.append("path")
        .datum(sampleData.attendance)
        .attr("class", "line")
        .attr("d", valueline);
      sampleData.attendance.shift();
      sampleData.attendance.pop();

      var svgContainer = svg;
      var circles = svgContainer.selectAll("circle")
        .data(sampleData.attendance)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.date); })
        .attr("cy", function (d) {
          if(d.partialScore > 0) return y(d.partialScore);
          else return y(0);
        })
        .attr("r", function (d) { return 4; })
        .attr("class", "attendanceDot")
        .attr("stroke-width", 3)
        .on("mouseover touchdown", function(d){
          div.attr("class", "shown");
          div.append("p").html(d.name);
          div.append("p").html(d.date);
          div.append("p").html(d.pointChange+" points");
          div.append("p").html(d.partialScore+"%");
          div.append("p").html(d.explanation);
          div.attr("style", "position:absolute;left:"+d3.event.pageX+"px;top:"+d3.event.pageY+"px;");
        })
        .on("mouseout touchup", function(d){
          div.attr("class", "hidden");
          div.html("");
        });
    },
    testThings: function(){
      alert("hello pls");
    }
  },
  mounted(){
    this.drawAttendanceGraph();
    this.testThings();
  	// var self = this;
   //  axios.post('https://gleeclub.gatech.edu/api.php?action=publicevents', {
   //    choir: 'glee'
   //  })
   //  .then(function (response) {
   //    // console.log(response);
   //    self.events = [];
   //    if(response.data.events[0]){
   //      self.events[0] = response.data.events[0];
   //      self.thereAreEvents = true;
   //    }
   //    if(response.data.events[1]) self.events[1] = response.data.events[1];
   //    if(response.data.events[2]) self.events[2] = response.data.events[2];
   //  })
   //  .catch(function (error) {
   //    console.log(error);
   //  });
  }
});