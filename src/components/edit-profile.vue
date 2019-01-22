<template>
	<section v-else class="section">
		<div class="container">
			<div id="edit-profile" class="box">
				<h3 class="title">{{ common.user.authenticated ? "Edit" : "Create" }} Profile</h3>
				<form @submit.prevent="submit">
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Name</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="firstName" placeholder="First">
								</p>
							</div>
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="prefName" placeholder="Preferred">
								</p>
							</div>
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="lastName" placeholder="Last">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Contact</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="email" name="email" placeholder="E-mail address">
								</p>
							</div>
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="phone" placeholder="Phone number">
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
									<input class="input" type="password" name="pass1" placeholder="Password">
								</p>
							</div>
							<div class="field">
								<p class="control">
									<input class="input" type="password" name="pass2" placeholder="Confirm">
								</p>
							</div>
						</div>
					</div>
					<div class="buttons is-right">
						<button type="submit" class="button is-primary">Submit</button>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import common from "@/common"

export default {
	name: "edit-profile",
	data() {
		return {
			common: common
		}
	},
	methods: {
		submit() {
			// TODO
		}
	},
	mounted() {
	}
}
</script>
