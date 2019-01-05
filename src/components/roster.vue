<template>
	<div id="roster">
		<section class="section">
			<div class="container">
				<div class="box">
					<table class="table is-fullwidth">
						<thead>
							<tr>
								<td>Name</td>
								<td>Section</td>
								<td>E-mail</td>
								<td>Phone</td>
								<td>Location</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="m in members">
								<td>{{ m.name }}</td>
								<td>{{ m.section }}</td>
								<td><a :href="'mailto:' + m.email">{{ m.email }}</a></td>
								<td><a :href="'tel:' + m.phone">{{ formatPhone(m.phone) }}</a></td>
								<td>{{ m.location }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import common from "../common"

export default {
	name: "roster",
	data() {
		return {
			common: common,
			members: []
		}
	},
	methods: {
		formatPhone(n) {
			var s = n.toString()
			if (s.length != 10) return s
			return "(" + s.slice(0, 3) + ") " + s.slice(3, 6) + "-" + s.slice(7, 10)
		}
	},
	mounted() {
		var self = this;
		common.apiGet("members", {}, function(data) {
			self.members = data.members
		})
	}
}
</script>
