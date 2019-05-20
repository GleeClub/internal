<template>
	<div id="create-event" class="columns">
		<div class="column">
			<div class="field">
			  <label class="label">Event Name</label>
			  <div class="control">
			    <input class="input" type="text" placeholder="Flashmobbing the HOMO SEX IS SIN people">
			  </div>
			  <p class="help">Make it descriptive, make it short.</p>
			</div>
			<div class="field">
			  <label class="label">Event Location</label>
			  <div class="control">
			    <input class="input" type="text" placeholder="Your mom's house 😂">
			  </div>
			  <p class="help">ha gottem</p>
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
			  <label class="label">Call Time</label>
			  <div class="control">
			    <input class="input" type="time">
			  </div>
			  <p class="help">4:20 lamo</p>
			</div>
			<div class="field">
			  <label class="label">Release Time</label>
			  <div class="control">
			    <input class="input" type="time">
			  </div>
			  <p class="help">4:20 lamo</p>
			</div>
			<div class="field">
			  <label class="label">Release Date</label>
			  <div class="control">
			    <input class="input" type="date">
			  </div>
			  <p class="help"></p>
			</div>
			<div class="field">
			  <label class="label">How many points is this worth?</label>
			  <div class="control">
			    <input class="input" type="text" placeholder="69">
			  </div>
			  <p class="help"></p>
			</div>
		</div>
		<div class="column">
			<div class="field">
				<label class="label">Event Type</label>
				<div class="control">
					<label class="radio">
						<input type="radio" name="gigType" checked>Volunteer Gig
					</label><br>
					<label class="radio">
						<input type="radio" name="gigType">Tutti Gig
					</label><br>
					<label class="radio">
						<input type="radio" name="gigType">Sectional
					</label><br>
					<label class="radio">
						<input type="radio" name="gigType">Rehearsal
					</label><br>
					<label class="radio">
						<input type="radio" name="gigType">Ombuds
					</label><br>
					<label class="radio">
						<input type="radio" name="gigType">Other
					</label>
				</div>
			</div>
			<div class="field">
				<label class="label">Semester</label>
				<div class="select is-loading control">
					<select>
						<option>Fall 2019</option>
						<option>Spring 2020</option>
					</select>
				</div>
			</div>
			<div class="field">
			  <label class="label">Event Summary</label>
			  <div class="control">
			    <textarea class="textarea" placeholder="We're gonna get in there, we're gonna use our mouths, and we're gonna get out."></textarea>
			  </div>
			  <p class="help"></p>
			</div>
		</div>
		<div class="column">
			<div class="field">
				<div class="control">
					<label class="checkbox">
						<input type="checkbox" checked>This event is public, so I want it to show up on the external site
					</label>
				</div>
			</div>
			<div class="field">
				<div class="control">
					<label class="checkbox">
						<input type="checkbox" checked>This event is for all sections
					</label>
					<label class="checkbox">
						<input type="checkbox" checked>This event is for the T1 section
					</label>
					<label class="checkbox">
						<input type="checkbox" checked>This event is for the T2 section
					</label>
					<label class="checkbox">
						<input type="checkbox" checked>This event is for the B1 section
					</label>
					<label class="checkbox">
						<input type="checkbox" checked>This event is for the B2 section
					</label>
				</div>
			</div>
			<div class="field">
				<div class="control">
					<label class="checkbox">
						<input type="checkbox">No one has to come to this event (forum, fundatory, etc)
					</label>
				</div>
			</div>
			<div class="field">
				<div class="control">
					<label class="checkbox">
						<input type="checkbox">This event counts as a volunteer gig
					</label>
				</div>
			</div>
			<div class="field">
				<div class="control">
					<label class="checkbox">
						<input type="checkbox">Members are required to attend (overrides any other setting)
					</label>
				</div>
			</div>
			<div class="field">
				<label class="label">Repeat</label>
				<div class="select is-loading control">
					<select>
						<option>None</option>
						<option>Weekly</option>
						<option>Monthly</option>
					</select>
				</div>
			</div>
			<div class="field">
			  <label class="label">Repeat until</label>
			  <div class="control">
			    <input class="input" type="date">
			  </div>
			  <p class="help"></p>
			</div>
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
