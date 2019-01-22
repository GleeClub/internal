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
					<div v-if="id == common.user.id">
					<button type="button" class="button" @click="logout">Log Out</button>
					<router-link to="/profile">Edit</router-link>
					</div>
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
	methods: {
		logout() {
			this.$cookies.remove("email")
			location.reload() // TODO Maybe just load the login age without refreshing the whole page
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
