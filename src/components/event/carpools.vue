<template>
	<div id="carpools">
		<ul v-if="carpools.length > 0">
			<li v-for="carpool in carpools" :key="carpool.id">
				{{ carpool.driver }}
				<ul>
					<li v-for="passenger in carpool.passengers" :key="passenger">
						{{ passenger }}
					</li>
				</ul>
			</li>
		</ul>
		<div v-else>
			No carpools set for this event.
		</div>
	</div>
</template>

<script>
import common from "@/common"

export default {
	name: "carpools",
	props: ["event"],
	data() {
		return {
			common: common,
			carpools: []
		}
	},
	mounted() {
		var self = this
		common.apiGet("carpools", { event: this.event }, function(data) {
			self.carpools = data.carpools
		})
	}
}
</script>
