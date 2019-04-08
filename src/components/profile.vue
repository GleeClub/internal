<template>
	<div id="home">
		<section class="section">
			<div class="container">
				<div class="box">
					<div class="columns" v-if="info">
						<div class="column is-narrow">
							<img :src="info.picture ? info.picture : 'http://lorempixel.com/g/256/256'">
						</div>
						<div class="column">
							{{ info.name.full }}<br>
							{{ info.positions.join(", ") }}<br>
							{{ info.about ? info.about : "I don't have a quote" }}<br>
							<a :href="'mailto:' + info.email">{{ info.email }}</a><br>
							<a :href="'tel:' + info.phone">{{ common.formatPhone(info.phone) }}</a><br>
							{{ info.location }}<br>
							{{ info.major }}<br>
							{{ info.car > 0 ? info.car + " passengers" : "No car" }}<br>
							Year {{ info.year }}<br>
							{{ common.info.sections[info.section] }}<br>
							<div v-if="id == common.user.id">
							<button type="button" class="button" @click="logout">Log Out</button>
							<router-link to="/profile">Edit</router-link>
						</div>
					</div>
					</div>
					<spinner v-else></spinner>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import common from "@/common"
import moment from "moment"
import spinner from "./util/spinner"

export default {
	name: "profile",
	props: ["id"],
	components: {
		spinner,
	},
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
			this.common.user = { authenticated: false }
			this.$router.push("/")
		}
	},
	mounted() {
		var self = this;
		common.apiGet("member", { member: this.id }, function(data) {
			self.info = data.profile
		})
	}
}
</script>
