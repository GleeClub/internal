var eventsapp = new Vue({
	el:"#events",
	data: {
		burgerIsActive: false,
		events: [],
		deets: null
	},
	methods: {
		loadDeets: function(eventId) {
			for (var i = 0; i < this.events.length; i++) {
				if (this.events[i].id == eventId) {
					this.deets = this.events[i];
					break;
				}
			};
		}
	},
	mounted() {
		var self = this;
		apiGet("events", {}, function(data) {
			self.events = data.events.reverse()
		})
	}
});
