var eventsapp = new Vue({
	el: "#events",
	data: {
		burgerIsActive: false,
		events: [],
		deets: null
	},
	mounted() {
		var self = this;
		apiGet("events", {}, function(data) {
			self.events = data.events.reverse()
		})
	}
});
