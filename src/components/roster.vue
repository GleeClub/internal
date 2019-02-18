<template>
	<div id="roster">
		<section class="section">
			<div class="container">
				<div class="box">
					<spinner v-if="!loaded"></spinner>
					<table v-else class="table is-fullwidth">
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
import spinner from "./util/spinner"

export default {
	name: "roster",
	components: {
		spinner,
	},
	data() {
		return {
			common: common,
			loaded: false,
			members: [],
		}
	},
	mounted() {
		var self = this;
		common.apiGet("members", {}, function(data) {
			self.members = data.members
			self.loaded = true
		})
	}
}
</script>
