<template>
	<div class="container fullheight">
		<div class="columns is-centered is-vcentered" style="display: flex">
			<div class="column is-narrow">
				<form id="forgot" class="box" @submit.prevent="submit">
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">E-mail</label>
						</div>
						<div class="control">
							<input class="input" type="email" v-model="email" placeholder="gburdell3@gatech.edu">
						</div>
					</div>
					<div class="buttons is-right">
						<button type="button" class="button" @click="$emit('switch-page', 'login')">Back</button>
						<button type="submit" class="button is-primary">Send Link</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import common from "@/common"

export default {
	name: "forgot",
	data() {
		return {
			common: common,
			email: ""
		}
	},
	methods: {
		submit() {
			var self = this
			this.common.apiGet("forgot", { email: this.email }, function(data) {
				self.$emit("switch-page", "login")
			})
		}
	},
	mounted() {
	}
}
</script>
