Vue.config.devtools = true;
var dateFmtLong = "dddd, MMMM D [at] h:mm A"

var homeapp = new Vue({
	el: '#home',
	data: {
		burgerIsActive: false,
		attendance: {
			attendance: [],
			finalScore: 0,
			gigCount: 0,
			gigReq: 0
		},
		events: []
	},
	methods: {
		drawAttendanceGraph: function() {
			var margin = { "top": 20, "right": 20, "bottom": 20, "left": 24 };
			var width = d3.select("svg").node().parentNode.clientWidth;
			var height = 500;
			var svg = d3.select("svg")
				.attr("width", width)
				.attr("height", height)
				.attr("transform", "translate(" + margin.left / 2 + ", " + margin.top / 2 + ")");
			var gradient = d3.select("svg").append("defs")
				.append("linearGradient")
				.attr("id", "attendanceGradient")
				.attr("gradientTransform", "rotate(90)");
			gradient.append("stop")
				.attr("offset", "0%")
				.attr("stop-color", "lightgrey")
			gradient.append("stop")
				.attr("offset", "100%")
				.attr("stop-color", "darkgrey");
			var div = d3.select("#tooltip")
				.attr("class", "box")
				.attr("class", "hidden");
			var parseTime = d3.timeParse("%d-%b-%y");
			attendance = this.attendance;
			attendance.attendance.forEach(function (d) { d.date = new Date(d.date * 1000); });
			var x = d3.scaleTime()
				.rangeRound([margin.left, width-margin.right]);
			var y = d3.scaleLinear()
				.rangeRound([height-margin.bottom, margin.top]);
			x.domain(d3.extent(attendance.attendance, function(d) { return d.date; }));
			y.domain([0, 100]);
			svg.append("g")
				.attr("transform", "translate(0," + (height - margin.bottom) + ")")
				.call(d3.axisBottom(x).ticks(3));
			svg.append("g")
				.attr("transform", "translate(" + margin.left + ", 0)")
				.call(d3.axisLeft(y));
			var valueline = d3.line()
					.x(function(d) { return x(d.date); })
					.y(function(d) {
						if (d.partialScore > 0) return y(d.partialScore);
						else return y(0);
					})
					.curve(d3.curveMonotoneX);
			attendance.attendance.unshift({
				"date": attendance.attendance[0].date,
				"partialScore": 0
			});
			attendance.attendance.push({
				"date":attendance.attendance[attendance.attendance.length - 1].date,
				"partialScore": 0
			});
			svg.append("path")
				.datum(attendance.attendance)
				.attr("class", "line")
				.attr("d", valueline);
			attendance.attendance.shift();
			attendance.attendance.pop();

			var svgContainer = svg;
			var circles = svgContainer.selectAll("circle")
				.data(attendance.attendance)
				.enter()
				.append("circle")
				.attr("cx", function (d) { return x(d.date); })
				.attr("cy", function (d) {
					if (d.partialScore > 0) return y(d.partialScore);
					else return y(0);
				})
				.attr("r", function (d) { return 4; })
				.attr("class", "attendanceDot")
				.attr("stroke-width", 3)
				.on("mouseover touchdown", function(d) {
					div.attr("class", "box shown");
					div.append("p").html("<strong>" + d.name + "</strong>");
					div.append("p").html(moment(d.date).format(dateFmtLong));
					div.append("p").html(d.pointChange + " points <span v-else class='icon is-primary has-text-primary'><i class='fas fa-arrow-right'></i></span> " + d.partialScore + "%");
					div.append("p").html("<em>" + d.explanation + "</em>");
					div.attr("style", "position:absolute;left:" + d3.event.pageX + "px;top:" + d3.event.pageY + "px;");
				})
				.on("mouseout touchup", function(d) {
					div.attr("class", "hidden");
					div.html("");
				});
		}
	},
	computed: {
		gigDots() {
			ret = new Array(this.attendance.gigReq);
			var dotcounter = 0;
			for (var i = 0; i < this.attendance.attendance.length; i++) {
				if (this.attendance.attendance[i].gigCount) {
					ret[dotcounter] = this.attendance.attendance[i];
					dotcounter++;
					if (dotcounter + 1 == this.attendance.gigReq) break;
				}
			};
			return ret
		},
		nextEvents() {
			var now = moment().unix()
			return this.events.filter(function(e) { return e.call > now }).slice(0, 3)
		}
	},
	mounted() {
		var self = this;
		apiGet("attendance", {}, function(data) {
			self.attendance = data;
			self.drawAttendanceGraph();
		})
		apiGet("events", {}, function(data) {
			self.events = data.events;
		})
	}
});
