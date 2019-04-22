<template>
	<div id="create-event">
		<div class="field">
		  <label class="label">Event Name</label>
		  <div class="control">
		    <input class="input" type="text" placeholder="Flashmobbing the HOMO SEX IS SIN people">
		  </div>
		  <p class="help">Make it descriptive, make it short.</p>
		</div>
		<div class="field">
		  <label class="label">Date of Event</label>
		  <div class="control">
		    <input class="input" type="date">
		  </div>
		  <p class="help"></p>
		</div>
		<div class="field">
		  <label class="label">Event Time</label>
		  <div class="control">
		    <input class="input" type="time">
		  </div>
		  <p class="help">4:20 lamo</p>
		</div>
		<div class="field">
		  <label class="label">Event Location</label>
		  <div class="control">
		    <input class="input" type="text" placeholder="Your mom's house 😂">
		  </div>
		  <p class="help">ha gottem</p>
		</div>
		<div class="field">
		  <label class="label">Event Summary</label>
		  <div class="control">
		    <textarea class="textarea" placeholder="We're gonna get in there, we're gonna use our mouths, and we're gonna get out."></textarea>
		  </div>
		  <p class="help"></p>
		</div>

	</div>
</template>

<script>
import common from "@/common"

export default {
	name: "create-event",
	data() {
		return {
			common: common,
		}
	},
	mounted() {
	}
}
</script>
