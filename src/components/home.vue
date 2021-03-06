<template>
	<div id="home">
		<section class="section">
			<div class="container">
				<h1 class="title">Score</h1>
				<p>Right now you have a <strong>{{ events.finalScore }}</strong>.<br><span class="has-text-grey-light is-italic">{{ attendanceMessage }}</span></p>
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
							<p v-else v-for="(event, i) in nextEvents" :key="i"> <span class="tag is-primary is-rounded">{{ i + 1 }}</span><router-link :to="'events/' + event.id"> {{ event.name }} – {{ moment(event.call).fromNow() }}</router-link></p>
						</div>
					</div>
					<div class="column">
						<h1 class="title">Volunteerism</h1>
						<div class="box">
							<p>OK so you've only been to {{ common.roman(events.gigCount) }} volunteer gigs this semester and you need to go to {{ common.roman(events.gigReq) }}. So. Uh, you know, do that.</p>
							<p style="text-align: center">
								<span v-if="events">
									<span v-for="(n, i) in gigDots" :key="i">
										<span v-if="n" class="icon is-large tooltip is-tooltip has-text-primary" v-bind:data-tooltip="n.name + ' on ' + moment(n.call).format(dateFmtTimeless)"><i class="fas fa-check-circle fa-2x"></i>
										</span>
										<span v-else class="icon is-large tooltip is-tooltip has-text-primary" data-tooltip="Hopefully something soon..."><i class="far fa-frown fa-2x"></i></span>
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
import common from "@/common"
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
			dateFmtTimeless: "dddd, MMMM D",
			past: [],
			future: [],
			events: {
				events: [],
				finalScore: 0,
				gigCount: 0,
				gigReq: 0
			}
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
			var attendance = this.past.concat(this.future);
			var pastEvents = [];
			attendance.forEach(function (d) { d.call = new Date(d.call * 1000); }); // FIXME Changing global state
			attendance.forEach(function (d) {
				if(d.pointChange !== null) pastEvents.push(d);
			});
			var x = d3.scaleTime()
				.rangeRound([margin.left, width-margin.right]);
			var y = d3.scaleLinear()
				.rangeRound([height-margin.bottom, margin.top]);
			x.domain(d3.extent(attendance, function(d) { return d.call; }));
			y.domain([0, 100]);
			svg.append("g")
				.attr("transform", "translate(0," + (height - margin.bottom) + ")")
				.call(d3.axisBottom(x).ticks(3));
			svg.append("g")
				.attr("transform", "translate(" + margin.left + ", 0)")
				.call(d3.axisLeft(y));
			var valueline = d3.line()
					.x(function(d) { return x(d.call); })
					.y(function(d) {
						if (d.partialScore > 0) return y(d.partialScore);
						else return y(0);
					})
					.curve(d3.curveMonotoneX); //http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8
			pastEvents.unshift({
				"call": pastEvents[0].call,
				"partialScore": 0
			});
			pastEvents.push({
				"call":pastEvents[pastEvents.length - 1].call,
				"partialScore": 0
			});
			svg.append("path")
				.datum(pastEvents)
				.attr("class", "line")
				.attr("d", valueline);
			pastEvents.shift();
			pastEvents.pop();

			var svgContainer = svg;
			var circleSelect = svgContainer.selectAll("circle")
				.data(pastEvents)
				.enter();
			circleSelect
				.append("circle")
				.attr("cx", function (d) { return x(d.call); })
				.attr("cy", function (d) {
					if (d.partialScore > 0) return y(d.partialScore);
					else return y(0);
				})
				.attr("r", function () { return 4; })
				.attr("class", "attendanceDot")
				.attr("stroke-width", 3);
			circleSelect
				.append("circle")
				.attr("cx", function (d) { return x(d.call); })
				.attr("cy", function (d) {
					if (d.partialScore > 0) return y(d.partialScore);
					else return y(0);
				})
				.attr("r", function () { return 8; })
				.attr("fill-opacity", "0")
				.on("mouseover touchdown", function(d) {
					div.attr("class", "box shown");
					div.append("p").html("<strong>" + d.name + "</strong>");
					div.append("p").html(moment(d.call).format(this.dateFmtLong));
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
			var ret = this.past
				.filter(function(e) { return e.gigCount && e.didAttend })
				.slice(0, 5)
			while (ret.length < this.events.gigReq) ret.push(null)
			console.log(ret)
			return ret
		},
		nextEvents() {
			var now = moment().unix()
			return this.future
				.sort(function(a, b) { return a.call - b.call })
				.slice(0, 5)
		},
		attendanceMessage() {
			if (this.events.finalScore >= 90) return "Ayy lamo nice."
			else if (this.events.finalScore >= 80) return "OK not bad, I guess."
			else if (this.events.finalScore >= 70) return "Pls"
			else return "BRUH get it together."
		}
	},
	mounted() {
		var self = this;
		common.apiGet("events", {}, function(data) {
			self.events = data
			var now = moment().unix()
			self.past = data.events.filter(function(e) { return e.call < now })
			self.future = data.events.filter(function(e) { return e.call >= now })
			if (self.past.length) self.drawAttendanceGraph()
			else {
				var newp = d3.select(".container").insert("p", "svg")
				newp.html("New semester, new you! Make it count.")
				d3.select("svg").remove()
				d3.select("#tooltip").remove()
				d3.select(".container").select("p").append("br")
				d3.select(".container").select("p").append("br")
				d3.select("#attendanceIssue").remove()
			}
		})
	}
}
</script>

<style>
.line {
	stroke: #b4a46a;
	fill: url("#attendanceGradient");
	stroke-width: 2;
}
.attendanceDot {
	fill: #b4a46a;
}
</style>

