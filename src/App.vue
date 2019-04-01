<template>
	<div id="app">
		<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<router-link to="/" class="navbar-item">
					<span class="icon is-small" style="width: 3vw;">
						<i class="fas fa-home"></i>
					</span>
				</router-link>
				<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" :class="{'is-active': burgerIsActive}" @click="burgerIsActive = !burgerIsActive">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				</a>
			</div>
			<div class="navbar-menu">
			<div v-if="common.user.authenticated" class="navbar-start">
				<router-link to="/events" class="navbar-item">Events</router-link>
				<router-link to="/repertoire" class="navbar-item">Music</router-link>
				<router-link to="/roster" class="navbar-item">People</router-link>
				<router-link to="/minutes" class="navbar-item">Minutes</router-link>
				<router-link to="/officer" class="navbar-item">Admin</router-link>
			</div>
			<div v-else class="navbar-start">
				<!--a class="navbar-item">Something</a-->
			</div>
			<div v-if="common.user.authenticated" class="navbar-end">
				<router-link :to="{ name: 'profile', params: { id: common.user.id } }" class="navbar-item">{{ common.user.name.full }}</router-link>
			</div>
			</div>
		</nav>
		<section v-if="showConfirm && $route.name != 'confirm'" id="confirm-note">
			<div class="notification is-info">
				<button class="delete" @click="showConfirm = false"></button>
				<div id="confirm-layout">
					<div>
						Welcome!  Feel free to browse the site, but if you're going to be active in Glee Club this semester, please confirm your account so we can get you into the system.
					</div>
					<div>
						<router-link :to="{ name: 'confirm' }" id="confirm-button" class="button is-info is-inverted is-outlined">Confirm</router-link>
					</div>
				</div>
			</div>
		</section>
		<spinner v-if="loaded < 2"></spinner>
		<router-view v-else-if="common.user.authenticated" @reload="loadUser"></router-view>
		<component v-else :is="landingPage" @reload="loadUser" @switch-page="landingPage = $event"></component>
	</div>
</template>

<script>
import common from "./common"
import login from "@/components/login"
import register from "@/components/edit-profile"
import forgot from "@/components/forgot"
import spinner from "@/components/util/spinner"

export default {
	name: "app",
	components: {
		login,
		register,
		forgot,
		spinner,
	},
	data() {
		return {
			loaded: 0,
			common: common,
			landingPage: "login",
			showConfirm: false,
			burgerIsActive: false
		}
	},
	methods: {
		loadUser() {
			this.loaded = false;
			var self = this
			common.apiGet("info", {}, function(data) {
				self.common.info = data.info
				self.loaded += 1
			})
			common.apiGet("user", {}, function(data) {
				self.common.user = data
				if (self.common.user.authenticated) {
					common.apiGet("members", {}, function(data) {
						self.common.members = {}
						for (var member of data.members) {
							self.common.members[member.email] = member.name
						}
						self.loaded += 1
					})
					self.showConfirm = self.common.user.enrollment == "inactive";
				}
				else self.loaded += 1
			})
		}
	},
	mounted() {
		this.loadUser()
	}
}
</script>

<style>
#confirm-note
{
	margin: 2em;
	margin-bottom: -1em;
}
#confirm-layout
{
	width: 100%;
	display: flex;
	align-items: center;
}
#confirm-button
{
	margin: 0 2em;
}
</style>
