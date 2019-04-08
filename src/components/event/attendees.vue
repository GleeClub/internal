<template>
	<div id="attendees">
		<spinner v-if="!loaded"></spinner>
		<table v-else class="table is-fullwidth">
			<tbody>
				<tr v-for="member in attendees" :key="member.id" :class="{ '': !member.shouldAttend && member.confirmed,
						'is-italic has-text-grey-light': !member.shouldAttend && !member.confirmed,
						'has-text-grey-light': member.shouldAttend && !member.confirmed,
						'has-text-success': member.shouldAttend && member.confirmed, }">
					<td><router-link :to="{ name: 'profile', params: { id: member.id } }">{{ common.memberName(member.id) }}</router-link></td>
					<td>{{ member.shouldAttend ? "attending" : "not attending" }}</td>
					<td>{{ member.confirmed ? "confirmed" : "unconfirmed" }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import common from "@/common"
import spinner from "../util/spinner"

export default {
	name: "attendees",
	props: ["event"],
	components: {
		spinner,
	},
	data() {
		return {
			common: common,
			loaded: false,
			attendees: [],
		}
	},
	mounted() {
		var self = this
		common.apiGet("attendees", { event: this.event }, function(data) {
			self.attendees = data.attendees
			self.loaded = true
		})
	}
}
</script>
