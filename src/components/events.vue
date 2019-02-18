<template>
	<div id="events">
		<section class="section">
			<div class="container">
				<div class="columns">
					<div class="column">
						<div class="box">
							<spinner v-if="!loaded"></spinner>
							<div v-else-if="events.length > 0">
								<div class="buttons has-addons">
									<a v-for="info, id in common.info.eventTypes" class="button is-small" @click="toggleFilter(id)" :style="{ color: filter.includes(id) ? info.color : 'white', background: filter.includes(id) ? 'white' : info.color }">
										{{ info.name }}
									</a>
								</div>
								<table class="table is-fullwidth is-hoverable">
									<thead></thead>
									<tbody>
										<tr v-for="event in events" v-if="matchesFilter(event)" :key="event.id" :class="{ 'is-selected': id && id == event.id }" @click="$router.replace({ name: 'event', params: { id: event.id, page: 'details' } })">
											<td :style="{ width: '1em', padding: '0', background: common.info.eventTypes[event.type].color }"></td>
											<td>{{ event.name }}</td>
											<td>{{ moment.unix(event.call).format("MMM D h:mm A") }}</td>
											<td v-if="moment.unix(event.release).isAfter(moment())" style="text-align: center">
												<div @click.stop>
													<input type="checkbox" :id="'attending-' + event.id" name="attending" class="switch is-rounded" :class="{ 'is-success': event.confirmed, 'is-danger': !event.confirmed, 'is-outlined': !event.confirmed }" v-model="event.shouldAttend" @change="rsvp(event)" :disabled="event.cannotDecline != null && event.shouldAttend && event.confirmed">
													<label :for="'attending-' + event.id" style="margin-right: -0.5em"></label>
												</div>
												<div class="is-size-7" style="white-space: nowrap">
													<div v-if="!event.confirmed" class="has-text-danger">
														Unconfirmed
													</div>
													<div v-else-if="event.shouldAttend" class="has-text-success">
														Attending
													</div>
													<div v-else class="has-text-danger">
														Not attending
													</div>
												</div>
											</td>
											<td v-else style="text-align: center">
												<div :class="{ 'is-size-7': true, 'has-text-success': event.didAttend || !event.shouldAttend, 'has-text-danger': event.shouldAttend && !event.didAttend }" style="white-space: nowrap">
													<span class="icon is-medium">
														<i v-if="event.didAttend" class="fas fa-check fa-lg"></i>
														<i v-else class="fas fa-times fa-lg"></i>
													</span>
													<br>
													<span v-if="event.didAttend">
														Attended
													</span>
													<span v-else-if="!event.shouldAttend">
														Excused
													</span>
													<span v-else>
														Missed
													</span>
												</div>
											</td>
										</tr>
									</tbody>
									<tfoot></tfoot>
								</table>
							</div>
							<p v-else>No events yet this semester.</p>
						</div>
					</div>
					<div class="column">
						<div class="box" v-if="deets">
							<div class="tabs">
								<ul>
									<li :class="{ 'is-active': page && page == 'details' }"><router-link :to="{ name: 'event', params: { id: id, page: 'details' } }">Details</router-link></li>
									<li :class="{ 'is-active': page && page == 'attendees' }"><router-link :to="{ name: 'event', params: { id: id, page: 'attendees' } }">Who's Attending</router-link></li>
									<li v-if="common.isGig(deets)" :class="{ 'is-active': page && page == 'setlist' }"><router-link :to="{ name: 'event', params: { id: id, page: 'setlist' } }">Set List</router-link></li>
									<li v-if="common.isGig(deets)" :class="{ 'is-active': page && page == 'carpools' }"><router-link :to="{ name: 'event', params: { id: id, page: 'carpools' } }">Carpools</router-link></li>
								</ul>
							</div>
							<div v-if="page == 'details'">
								<h1>{{ deets.name }}</h1>
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
								<router-link class="button" v-if="moment.unix(deets.release).isAfter(moment()) && deets.cannotDecline" :to="{ name: 'event', params: { id: id, page: 'absence-request' } }">Request Absence</router-link>
							</div>
							<component v-else :is="common.kebabToCamel(page)" @switch-page="$router.push({ name: 'event', params: { id: id, page: $event } })" :event="deets.id"></component>
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
import common from "@/common"
import moment from "moment"
import spinner from "./util/spinner"
import attendees from "./event/attendees"
import carpools from "./event/carpools"
import setlist from "./event/setlist"
import absenceRequest from "./event/absence-request"

export default {
	name: "events",
	props: ["id", "page"],
	components: {
		spinner,
		attendees,
		carpools,
		setlist,
		absenceRequest,
	},
	data() {
		return {
			common: common,
			moment: moment,
			loaded: false,
			events: [],
			filter: [],
		}
	},
	computed: {
		deets() {
			var sel = parseInt(this.id)
			if (!sel || isNaN(sel)) return null
			var res = this.events.filter(function(e) { return e.id == sel })
			if (res.length != 1) return null
			return res[0]
		}
	},
	methods: {
		toggleFilter(id) {
			var existing = this.filter.indexOf(id)
			if (existing >= 0) this.filter.splice(existing, 1)
			else this.filter.push(id)
		},
		matchesFilter(event) {
			if (this.filter.length == 0) return true
			return this.filter.includes(event.type)
		},
		rsvp(event) {
			if (!event.confirmed) {
				event.shouldAttend = !event.shouldAttend
				this.common.apiGet("rsvp", { event: event.id, attend: event.shouldAttend ? 1 : 0 }, function(data) {
					event.confirmed = true
				})
			}
			else this.common.apiGet("rsvp", { event: event.id, attend: event.shouldAttend ? 1 : 0 }, function(data) { }, function(data) {
				event.shouldAttend = !event.shouldAttend
			})
		}
	},
	mounted() {
		var self = this
		common.apiGet("events", {}, function(data) {
			self.events = data.events.sort(function(a, b) { return b.call - a.call; })
			self.loaded = true
		})
	}
}
</script>
