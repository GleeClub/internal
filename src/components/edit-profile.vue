<template>
	<section v-else class="section">
		<div class="container">
			<h3 class="title is-3">{{ common.user.authenticated ? "Edit" : "Create" }} Profile</h3>
			<div id="edit-profile" class="box">
				<p v-if="common.user.authenticated">You can make changes to your stats here. It's important we know as much about you as possible to <span style="text-decoration: line-through;">creep</span> <span style="text-decoration: line-through;">better serve you</span> make you drive carpools. It'll also help your new friends get to know you!</p>
				<p v-else>Note that this registration is not mandatory. If you are unwilling to provide any of the required information, let an officer know and we will work out alternate means of registration.</p>
				<form v-if="loaded" @submit.prevent="submit" style="margin-top: 1em">
					<h4 class="title is-4">Really Important Stuff</h4>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Name</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="firstName" v-model="profile.firstName" placeholder="First">
								</p>
							</div>
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="prefName" v-model="profile.prefName" placeholder="Preferred (optional)">
								</p>
							</div>
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="lastName" v-model="profile.lastName" placeholder="Last">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">E-mail</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="email" name="email" v-model="profile.email" placeholder="gburdell3@gatech.edu">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Phone Number</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="phone" name="phone" v-model="profile.phone" placeholder="6788675309">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Password</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="password" name="password" v-model="profile.password" placeholder="Password">
								</p>
							</div>
							<div class="field">
								<p class="control">
									<input class="input" type="password" name="password2" v-model="profile.password2" placeholder="Confirm">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Location</label>
						</div>
						<div class="field-body">
							<div class="field is-grouped">
								<p class="control is-expanded">
									<input class="input" type="text" name="location" v-model="profile.location" placeholder="Glenn">
								</p>
								<p class="control">
									<div class="buttons has-addons">
										<span :class="{ button: true, 'is-primary': profile.onCampus }" @click="profile.onCampus = true">On-campus</span>
										<span :class="{ button: true, 'is-primary': ! profile.onCampus }" @click="profile.onCampus = false">Off-campus</span>
									</div>
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Major</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="major" v-model="profile.major" placeholder="Undecided engineering">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Hometown</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="hometown" v-model="profile.hometown" placeholder="Winslow, Arizona">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Car</label>
						</div>
						<div class="field-body">
							<div class="field is-grouped">
								<p class="control checkbox">
									<label class="checkbox">
										<input type="checkbox" name="hasCar" v-model="hasCar">
										I have a car
									</label>
								</p>
								<div class="field has-addons" v-if="hasCar">
									<p class="control">
										<input class="input" type="number" name="passengers" v-model="profile.passengers" placeholder="How many?">
									</p>
									<p class="control">
										<a class="button is-static">passengers</a>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Enrollment</label>
						</div>
						<div class="field-body">
							<div class="field is-grouped">
								<div class="control">
									<div class="buttons has-addons">
										<span :class="{ button: true, 'is-primary': profile.enrollment == 'inactive' }" @click="profile.enrollment = 'inactive'">Inactive</span>
										<span :class="{ button: true, 'is-primary': profile.enrollment == 'class' }" @click="profile.enrollment = 'class'">Class</span>
										<span :class="{ button: true, 'is-primary': profile.enrollment == 'club' }" @click="profile.enrollment = 'club'">Club</span>
									</div>
								</div>
								<div class="control">
									<div class="select">
										<select v-model="profile.section" :disabled="inactive">
											<option v-for="section, id in common.info.sections" :value="id">{{ section }}</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
					<h4 class="title is-4">Nice to Know</h4>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">About Me</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="about" v-model="profile.about" placeholder="I like big butts and I cannot lie">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Picture URL</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="picture" v-model="profile.picture" placeholder="https://create.mylittlepony.movie/images/ponyparticon_bodybig.png">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Year at GT</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="number" name="techYear" v-model="profile.techYear" placeholder="2">
								</p>
							</div>
						</div>
					</div>
					<div class="buttons is-right">
						<button v-if="!common.user.authenticated" type="button" class="button" @click="$emit('switch-page', 'login')">Back</button>
						<button type="submit" class="button is-primary">Save</button>
					</div>
				</form>
				<spinner v-else></spinner>
			</div>
		</div>
	</section>
</template>

<script>
import common from "@/common"
import spinner from "./util/spinner"

export default {
	name: "edit-profile",
	components: {
		spinner,
	},
	data() {
		return {
			common: common,
			loaded: false,
			hasCar: false,
			profile: {
				firstName: null,
				prefName: null,
				lastName: null,
				email: null,
				phone: null,
				password: null,
				password2: null,
				location: null,
				onCampus: true,
				major: null,
				hometown: null,
				passengers: null,
				enrollment: "class",
				section: 0,
				about: null,
				picture: null,
				techYear: null
			}
		}
	},
	computed: {
		inactive() {
			return this.profile.enrollment == "inactive"
		}
	},
	methods: {
		submit() {
			var self = this
			this.profile.passengers = this.hasCar ? this.profile.passengers : 0
			common.apiPost("updateProfile", { profile: this.profile }, function(data) {
				self.$router.push("/")
				self.$emit("reload")
			})
		}
	},
	mounted() {
		var self = this
		if (this.common.user.authenticated) {
			common.apiGet("member", { member: self.common.user.id }, function(data) {
				self.profile = {
					firstName: self.common.user.name.first,
					prefName: self.common.user.name.pref,
					lastName: self.common.user.name.last,
					email: self.common.user.id,
					phone: data.profile.phone,
					location: data.profile.location,
					onCampus: data.profile.onCampus,
					major: data.profile.major,
					hometown: data.profile.hometown,
					passengers: data.profile.car > 0 ? data.profile.car : null,
					enrollment: data.profile.enrollment,
					section: self.common.user.section,
					about: data.profile.about,
					picture: data.profile.picture,
					techYear: data.profile.year
				}
				self.hasCar = data.profile.car > 0
				self.loaded = true
			})
		}
		else self.loaded = true
	}
}
</script>

<style>
.buttons
{
	margin-bottom: 0 !important;
}
.buttons .button
{
	margin-bottom: 0;
}
input[type$="number"]
{
	max-width: 10em;
}
p.control.checkbox
{
	height: 2.25em;
	padding-top: 0.5em;
	padding-left: 1em;
	padding-right: 1em;
}
</style>
