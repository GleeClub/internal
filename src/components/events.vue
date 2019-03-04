<template>
	<div id="events">
		<section class="section">
			<div class="container">
				<div class="columns">
					<div class="column">
						<div class="box">
							<spinner v-if="!loaded"></spinner>
							<div v-else-if="events.length > 0">
								<div class="buttons">
									<a v-for="info, id in common.info.eventTypes" class="button is-rounded is-light" @click="toggleFilter(id)" :class="{'is-primary':filter.includes(id)}">
										{{ info.name }}
									</a>
								</div>
								<table class="table is-fullwidth is-hoverable">
									<thead></thead>
									<tbody>
										<tr v-for="event in events" v-if="matchesFilter(event)" :key="event.id" :class="{ '': id && id == event.id }" @click="$router.replace({ name: 'event', params: { id: event.id, page: 'details' } })" :style="{'background-color' : id && id == event.id ? '#eeeeee':''}">
											<td>{{ event.name }}</td>
											<td>{{ moment.unix(event.call).format("MMM D h:mm A") }}</td>
											<td v-if="moment.unix(event.release).isAfter(moment())" style="text-align: center">
												<div v-if="event.confirmed && event.shouldAttend" class="has-text-success">
													<span class="icon is-medium">
														<i class="fas fa-check fa-lg"></i>
													</span>
												</div>
												<div v-else-if="event.confirmed && !event.shouldAttend" class="has-text-success">
													<span class="icon is-medium">
														<i class="fas fa-times fa-lg"></i>
													</span>
												</div>
												<div v-else-if="!event.confirmed && event.shouldAttend" class="has-text-grey">
													<span class="icon is-medium">
														<i class="fas fa-check fa-lg"></i>
													</span>
												</div>
												<div v-else-if="!event.confirmed && !event.shouldAttend" class="has-text-grey">
													<span class="icon is-medium">
														<i class="fas fa-times fa-lg"></i>
													</span>
												</div>
											</td>
											<td v-else style="text-align: center">
												<div :class="{ 'has-text-success': event.didAttend || !event.shouldAttend, 'has-text-danger': event.shouldAttend && !event.didAttend }" style="white-space: nowrap;">
													<span class="icon is-medium">
														<i v-if="event.didAttend" class="fas fa-check fa-lg"></i>
														<i v-else class="fas fa-times fa-lg"></i>
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
								<h1 class="title is-3">{{ deets.name }}</h1>
								<p class="subtitle is-5">{{ moment.unix(deets.call).format("LLLL") }}<br>{{ deets.location }}
								</p>
								<p v-if="deets.comments">{{ deets.comments }}<br><br></p>

								<div v-if="moment.unix(deets.release).isAfter(moment())">
									<p v-if="deets.confirmed && deets.shouldAttend">You're <b>confirmed</b> to be <b>attending</b></p>
									<p v-if="deets.confirmed && !deets.shouldAttend">The officers know you won't be there</p>
									<span v-if="!deets.confirmed && deets.shouldAttend"><p>You're coming, right?</p><a class="button is-primary">Yep, I'll be there</a></span>
									<span v-if="!deets.confirmed && !deets.shouldAttend"><p>You're not coming, right?</p><a class="button is-primary">Nah, I'm gonna miss it</a></span>
								</div>
								<div v-else>
									<p v-if="deets.didAttend && deets.shouldAttend">You were there! What a great time.</p>
									<p v-if="deets.didAttend && !deets.shouldAttend">Wow, thanks for coming. What a guy!</p>
									<p v-if="!deets.didAttend && deets.shouldAttend">You <b>weren't there</b>, and that's <b>not ok</b>. <a href="mailto:gleeclub_officers@lists.gatech.edu?subject=Attendance%20Issue">Email the officers</a> if there's a problem.</p>
									<p v-if="!deets.didAttend && !deets.shouldAttend">You <b>weren't there</b>, but that's <b>ok</b>.</p>
								</div><br>

								<p v-if="deets.perform">Perform at: {{ moment.unix(deets.perform).format("h:mm A") }}</p>
								<p>This event is worth <b>{{ deets.points }} points</b></p>
								<p v-if="deets.section != 'None'">This event is for the {{ deets.section }} section</p>
								<p style="text-decoration: underline dotted;" v-if="deets.uniform"><span style="cursor:pointer;" class="tooltip is-tooltip-multiline" :data-tooltip="this.common.info.uniforms[deets.uniform].description">{{ this.common.info.uniforms[deets.uniform].name }}</span></p><br>
								<router-link class="button is-primary is-outlined" v-if="moment.unix(deets.release).isAfter(moment()) && deets.disabled" :to="{ name: 'event', params: { id: id, page: 'absence-request' } }">Request Absence</router-link>
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
					event.disabled = data.disabled
				})
			}
			else this.common.apiGet("rsvp", { event: event.id, attend: event.shouldAttend ? 1 : 0 }, function(data) {
				event.disabled = data.disabled
			}, function(data) {
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
