<template>
	<div id="confirm">
		<section class="section">
			<div class="box">
				<div v-if="common.user.enrollment != 'inactive'" class="has-text-success" style="text-align: center; padding: 2em 0">
					<i class="fas fa-check"></i>
					You're confirmed for this semester.
				</div>
				<form v-else @submit.prevent="submit">
					<h4 class="title is-4">Confirm Your Account</h4>
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
							<label class="label">Enrollment</label>
						</div>
						<div class="field-body">
							<div class="field is-grouped">
								<div class="control">
									<div class="select">
										<select v-model="profile.section">
											<option v-for="section, id in common.info.sections" :value="id">{{ section }}</option>
										</select>
									</div>
								</div>
								<div class="control">
									<div class="buttons has-addons">
										<span :class="{ button: true, 'is-primary': profile.enrollment == 'class' }" @click="profile.enrollment = 'class'">Class</span>
										<span :class="{ button: true, 'is-primary': profile.enrollment == 'club' }" @click="profile.enrollment = 'club'">Club</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="buttons is-right">
						<button type="submit" class="button is-primary">Save</button>
					</div>
				</form>
			</div>
		</section>
	</div>
</template>

<script>
import common from "@/common"

export default {
	name: "confirm",
	data() {
		return {
			common: common,
			profile: {
				location: null,
				onCampus: null,
				enrollment: null,
				section: null
			}
		}
	},
	methods: {
		submit() {
			var self = this
			common.apiPost("confirmAccount", this.profile, function(data) {
				self.$emit("reload")
			})
		}
	},
	mounted() {
		var self = this
		common.apiGet("member", { member: self.common.user.id }, function(data) {
			self.profile = {
				location: data.profile.location,
				onCampus: data.profile.onCampus,
				enrollment: common.user.enrollment,
				section: common.user.section
			}
		})
	}
}
</script>
