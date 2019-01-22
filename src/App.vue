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
			<div v-if="common.user.authenticated" class="navbar-start">
				<router-link to="/events" class="navbar-item">Events</router-link>
				<router-link to="/repertoire" class="navbar-item">Music</router-link>
				<router-link to="/roster" class="navbar-item">People</router-link>
				<router-link to="/officer" class="navbar-item">Admin</router-link>
			</div>
			<div v-else class="navbar-start">
				<!--a class="navbar-item">Something</a-->
			</div>
			<div v-if="common.user.authenticated" class="navbar-end">
				<router-link :to="{ name: 'profile', params: { id: common.user.id } }" class="navbar-item">{{ common.user.name }}</router-link>
			</div>
			</div>
		</nav>
		<router-view v-if="common.user.authenticated"></router-view>
		<component v-else :is="landingPage" @reload="loadUser" @switch-page="landingPage = $event"></component>
	</div>
</template>

<script>
import common from "./common"
import login from "@/components/login"
import register from "@/components/edit-profile"
import forgot from "@/components/forgot"

export default {
	name: "app",
	components: {
		login,
		register,
		forgot
	},
	data() {
		return {
			common: common,
			landingPage: "login",
			burgerIsActive: false
		}
	},
	methods: {
		loadUser() {
			var self = this
			common.apiGet("user", {}, function(data) {
				self.common.user = data
				if (self.common.user.authenticated) {
					common.apiGet("members", {}, function(data) {
						self.common.members = {}
						for (var member of data.members) {
							self.common.members[member.email] = member.name
						}
					})
				}
			})
		}
	},
	mounted() {
		this.loadUser()
	}
}
</script>
