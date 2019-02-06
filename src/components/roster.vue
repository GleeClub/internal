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
								<td><router-link :to="{ name: 'profile', params: { id: m.email } }">{{ m.name.full }}</router-link></td>
								<td>{{ common.info.sections[m.section] }}</td>
								<td><a :href="'mailto:' + m.email">{{ m.email }}</a></td>
								<td><a :href="'tel:' + m.phone">{{ common.formatPhone(m.phone) }}</a></td>
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
import common from "@/common"

export default {
	name: "roster",
	data() {
		return {
			common: common,
			members: []
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
