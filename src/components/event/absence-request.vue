<template>
	<form id="absence-request" @submit.prevent="submit">
		<div class="field">
			<label class="label">Reason</label>
			<div class="control">
				<textarea class="textarea" v-model="reason" placeholder="My dog ate my homework."></textarea>
			</div>
		</div>
		<div class="buttons is-right">
			<button type="button" class="button" @click="$emit('switch-page', 'details')">Never Mind</button>
			<button type="submit" class="button is-primary">Beg for Mercy</button>
		</div>
	</form>
</template>

<script>
import common from "@/common"

export default {
	name: "absence-request",
	props: ["event"],
	data() {
		return {
			common: common,
			reason: "",
		}
	},
	methods: {
		submit() {
			var self = this
			this.common.apiPost("requestAbsence", { event: this.event, reason: this.reason }, function(data) {
				self.$emit("switch-page", "details")
				alert("Your request was submitted.  You lazy bum!")
			})
		}
	}
}
</script>
