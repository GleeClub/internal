<template>
	<div id="home">
		<section class="section">
			<div class="container">
						<div class="box">
							{{ info.name }}<br>
							{{ info.positions.join(", ") }}<br>
							{{ info.quote }}<br>
							{{ info.email }}<br>
							{{ common.formatPhone(info.phone) }}<br>
							{{ info.location }}<br>
							{{ info.major }}<br>
							{{ info.car }}<br>
							{{ info.techYear }}<br>
							{{ info.section }}<br>
							<img :src="info.picture">
						</div>
			</div>
		</section>
	</div>
</template>

<script>
import common from "@/common"
import moment from "moment"

export default {
	name: "profile",
	props: ["id"],
	data() {
		return {
			common: common,
			moment: moment,
			info: null
		}
	},
	mounted() {
		var self = this;
		common.apiGet("member", { member : this.id }, function(data) {
			self.info = data.profile
		})
	}
}
</script>
