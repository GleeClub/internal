<template>
	<div id="events">
		<section class="section">
			<div class="container">
				<div class="columns">
					<div class="column">
						<div class="box">
							<table class="table is-fullwidth is-hoverable">
								<thead></thead>
								<tbody>
									<tr v-for="event in events" :key="event.id" @click="deets = event">
										<td>{{ event.name }}</td>
										<td>{{ moment.unix(event.call).format("MMM D h:mm A") }}</td>
										<td>{{ event.type }}</td>
										<td>{{ event.confirmed }}</td>
									</tr>
								</tbody>
								<tfoot></tfoot>
							</table>
						</div>
					</div>
					<div class="column">
						<div class="box" v-if="deets">
							<h1>{{deets.name}}</h1>
							<p>Be there at: {{ moment.unix(deets.call).format("LLLL") }}</p>
							<p>{{ deets.comments }}</p>
							<p>Confirmed: {{ deets.confirmed }}</p>
							<p>Should Attend: {{ deets.shouldAttend }}</p>
							<p>Attended: {{ deets.didAttend }}</p>
							<p>Location: {{ deets.location }}</p>
							<p v-if="deets.perform">Perform at: {{ moment.unix(deets.perform).format("h:mm A") }}</p>
							<p>Points: {{ deets.points }}</p>
							<p>Section: {{ deets.section }}</p>
							<p>Type: {{ deets.type }}</p>
							<p v-if="deets.uniform">Uniform: {{ deets.uniform }}</p>
						</div>
						<div v-else class="box">
							<p>Select an event</p>
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

export default {
	name: "events",
	data() {
		return {
			common: common,
			moment: moment,
			events: [],
			deets: null
		}
	},
	mounted() {
		var self = this;
		common.apiGet("events", {}, function(data) {
			self.events = data.events.reverse()
		})
	}
}
</script>
