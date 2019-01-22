<template>
	<section v-else class="section">
		<div class="container">
			<div class="columns is-centered is-vcentered" style="height: 75%; display: flex">
				<div class="column is-narrow">
					<form id="login" class="box" @submit.prevent="login">
						<h1 class="title is-1" style="text-align: center"><span style="color: #b4a46a">Glub</span><span style="color: #666">Hub</span></h1>
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">E-mail</label>
							</div>
							<div class="control">
								<input class="input" type="email" v-model="user" placeholder="gburdell3@gatech.edu">
							</div>
						</div>
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Password</label>
							</div>
							<div class="control">
								<input class="input" type="password" v-model="pass" placeholder="••••••••">
							</div>
						</div>
						<div class="buttons is-right">
							<button type="button" class="button" @click="$emit('switch-page', 'register')">Register</button>
							<button type="button" class="button" @click="$emit('switch-page', 'forgot')">Forgot</button>
							<button type="submit" :class="{ button: true, 'is-primary': true, 'is-loading': loading }">Sign In</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import common from "@/common"

export default {
	name: "login",
	data() {
		return {
			common: common,
			loading: false,
			user: "",
			pass: ""
		}
	},
	methods: {
		login() {
			var self = this
			self.loading = true
			common.apiPost("auth", { user: self.user, pass: self.pass }, function(data) {
				self.$cookies.set("email", data.identity)
				self.$emit("reload")
			}, function() {
				self.loading = false
			})
		}
	}
}
</script>

<style>
</style>
