<template>
	<div id="home">
		<section class="section">
			<div class="container">
				<h1 class="title">Score</h1>
				<p>Right now you have a <strong>{{ attendance.finalScore }}</strong>. {{ attendanceMessage }}</p>
				<svg></svg>
				<p id="attendanceIssue"><br>Do you have an issue? Do you need a daddy tissue? <a href="mailto:gleeclub_officers@lists.gatech.edu?subject=Attendance%20Issue">Email the officers</a> to cry about it.</p>
			</div>
			<div id="tooltip" class="box"></div>
		</section>
		<section class="section">
			<div class="container">
				<div class="columns">
					<div class="column">
						<h1 class="title">Next Up</h1>
						<div class="box">
							<p v-if="nextEvents.length == 0">No more events this semester (:(</p>
							<p v-else v-for="(event, i) in nextEvents" :key="i"> <span class="tag is-primary is-rounded">{{ i + 1 }}</span><a :href="'events/' + event.id"> {{ event.name }} – {{ moment.unix(event.call).fromNow() }}</a></p>
						</div>
					</div>
					<div class="column">
						<h1 class="title">Volunteerism</h1>
						<div class="box">
							<p>OK so you've only been to {{ common.roman(attendance.gigCount) }} volunteer gigs this semester and you need to go to {{ common.roman(attendance.gigReq) }}. So. Uh, you know, do that.</p>
							<p>
								<span v-if="attendance">
									<span v-for="(n, i) in gigDots" :key="i">
										<span v-if="n" class="icon is-large is-tooltip-primary is-primary tooltip has-text-primary" v-bind:data-tooltip="n.name + ' on ' + moment(n.date).format(dateFmtLong)"><i class="fas fa-check-circle fa-2x"></i>
										</span>
										<span v-else class="icon is-large is-primary has-text-primary"><i class="far fa-frown fa-2x"></i></span>
									</span>
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import common from "../common"
import moment from "moment"
import * as d3 from "d3"

export default {
	name: "home",
	data() {
		return {
			common: common,
			moment: moment,
			d3: d3,
			dateFmtLong: "dddd, MMMM D [at] h:mm A",
			attendance: {
				attendance: [],
				finalScore: 0,
				gigCount: 0,
				gigReq: 0
			},
			events: [],
			attendanceMessage: ""
		}
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
			var attendance = this.attendance;
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
					.curve(d3.curveMonotoneX); //http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8
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
			svgContainer.selectAll("circle")
				.data(attendance.attendance)
				.enter()
				.append("circle")
				.attr("cx", function (d) { return x(d.date); })
				.attr("cy", function (d) {
					if (d.partialScore > 0) return y(d.partialScore);
					else return y(0);
				})
				.attr("r", function () { return 4; })
				.attr("class", "attendanceDot")
				.attr("stroke-width", 3)
				.on("mouseover touchdown", function(d) {
					div.attr("class", "box shown");
					div.append("p").html("<strong>" + d.name + "</strong>");
					div.append("p").html(moment(d.date).format(this.dateFmtLong));
					div.append("p").html(d.pointChange + " points <span v-else class='icon is-primary has-text-primary'><i class='fas fa-arrow-right'></i></span> " + d.partialScore + "%");
					div.append("p").html("<em>" + d.explanation + "</em>");
					div.attr("style", "position:absolute;left:" + d3.event.pageX + "px;top:" + d3.event.pageY + "px;");
				})
				.on("mouseout touchup", function() {
					div.attr("class", "hidden");
					div.html("");
				});
		}
	},
	computed: {
		gigDots() {
			var ret = new Array(this.attendance.gigReq)
			var dotcounter = 0
			for (var i = 0; i < this.attendance.attendance.length; i++) {
				if (this.attendance.attendance[i].gigCount) {
					ret[dotcounter] = this.attendance.attendance[i]
					dotcounter++
					if (dotcounter + 1 == this.attendance.gigReq) break
				}
			}
			return ret
		},
		nextEvents() {
			var now = moment().unix()
			return this.events.filter(function(e) { return e.call > now }).slice(0, 3)
		}
	},
	mounted() {
		var self = this;
		common.apiGet("attendance", {}, function(data) {
			self.attendance = data
			if(self.attendance.finalScore >= 90) self.attendanceMessage = "Ayy lamo nice."
			if(self.attendance.finalScore < 90) self.attendanceMessage = "OK not bad, I guess."
			if(self.attendance.finalScore < 80) self.attendanceMessage = "Pls"
			if(self.attendance.finalScore < 70) self.attendanceMessage = "BRUH get it together."
			if(self.attendance.attendance.length){
				self.drawAttendanceGraph()
			}
			else{
				var newp = d3.select(".container").insert("p", "svg")
				newp.html("New semester, new you! Make it count.")
				d3.select("svg").remove()
				d3.select("#tooltip").remove()
				d3.select(".container").select("p").append("br")
				d3.select(".container").select("p").append("br")
				d3.select("#attendanceIssue").remove()
			}
		})
		common.apiGet("events", {}, function(data) {
			self.events = data.events
		})
	}
}
</script>
