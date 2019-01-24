<template>
	<section v-else class="section">
		<div class="container">
			<h3 class="title">{{ common.user.authenticated ? "Edit" : "Create" }} Profile</h3>
			<div id="edit-profile" class="box">
				<p>You can make changes to your stats here. It's important we know as much about you as possible to <span style="text-decoration: line-through;">creep</span> <span style="text-decoration: line-through;">better serve you</span> make you drive carpools. It'll also help your new friends get to know you!</p><br>
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
							<label class="label">Email</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="email" name="email" placeholder="gburdell3@gatech.edu">
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
									<input class="input" type="phone" name="phone" placeholder="678-867-5309">
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
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Quote</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="quote" placeholder="I like big butts and I cannot lie">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Location</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="text" name="" placeholder="Glenn">
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
									<input class="input" type="text" name="major" placeholder="Undecided Engineering">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Car</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="number" name="car" placeholder="How many passengers can you take in your car? Put 0 if you don't have a car.">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Year</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<input class="input" type="number" name="year" placeholder="2">
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Section</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<div class="select">
									    <select>
									      <option>Tenor 1</option>
									      <option>Tenor 2</option>
									      <option>Baritone</option>
									      <option>Bass</option>
									    </select>
									  </div>
								</p>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Seriousness</label>
						</div>
						<div class="field-body">
							<div class="field">
								<p class="control">
									<div class="buttons has-addons">
									  <span class="button is-primary">Class</span>
									  <span class="button" disabled>Club</span>
									</div>
								</p>
							</div>
						</div>
					</div>
					<div class="buttons is-right">
						<button type="submit" class="button is-primary">Save</button>
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
