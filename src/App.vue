<template>
	<div id="app">
		<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<router-link to="/" class="navbar-item">
					<span class="icon is-small" style="width: 3vw;">
						<i class="fas fa-home"></i>
					</span>
				</router-link>
				<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" v-bind:class="{'is-active': burgerIsActive}" v-on:click="burgerIsActive = !burgerIsActive">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				</a>
			</div>
			<div class="navbar-menu" v-bind:class="{'is-active': burgerIsActive}">
			<div v-if="user.authenticated" class="navbar-start">
				<router-link to="/events" class="navbar-item">Events</router-link>
				<router-link to="/repertoire" class="navbar-item">Music</router-link>
				<router-link to="/roster" class="navbar-item">People</router-link>
				<router-link to="/officer" class="navbar-item">Admin</router-link>
			</div>
			<div v-else class="navbar-start">
				<!--a class="navbar-item">Something</a-->
			</div>
			<div v-if="user.authenticated" class="navbar-end">
				<a class="navbar-item" @click="logout">{{ user.name }}</a>
			</div>
			</div>
		</nav>
		<router-view v-if="user.authenticated"></router-view>
		<login v-else @reload="loadUser"></login>
	</div>
</template>

<script>
import common from "./common"
import login from "@/components/login"

export default {
	name: "app",
	components: {
		login
	},
	data() {
		return {
			common: common,
			burgerIsActive: false,
			user: {
				authenticated: false
			}
		}
	},
	methods: {
		loadUser() {
			var self = this
			common.apiGet("user", {}, function(data) {
				self.user = data
			})
		},
		logout() {
			this.$cookies.remove("email")
			this.loadUser()
		}
	},
	mounted() {
		this.loadUser()
	}
}
</script>

<style>

</style>
