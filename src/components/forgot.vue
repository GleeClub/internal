<template>
	<section v-else class="section">
		<div class="container">
			<div class="columns is-centered is-vcentered" style="height: 75%; display: flex">
				<div class="column is-narrow">
					<form id="forgot" class="box" @submit.prevent="submit">
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">E-mail</label>
							</div>
							<div class="control">
								<input class="input" type="email" v-model="user" placeholder="gburdell3@gatech.edu">
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
	</section>
</template>

<script>
export default {
	name: "forgot",
	data() {
		return {
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
