<template>
	<div id="attendees">
		<table class="table is-fullwidth is-hoverable">
			<tbody>
				<tr v-for="member in attendees" :key="member.id">
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

export default {
	name: "attendees",
	props: ["event"],
	data() {
		return {
			common: common,
			attendees: [],
		}
	},
	mounted() {
		var self = this
		common.apiGet("attendees", { event: this.event }, function(data) {
			self.attendees = data.attendees
		})
	}
}
</script>
