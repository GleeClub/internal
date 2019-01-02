var app = new Vue({
	el: "#roster",
	data: {
		burgerIsActive: false,
		members: [],
	},
	methods: {
		formatPhone(n) {
			var s = n.toString()
			if (s.length != 10) return s
			return "(" + s.slice(0, 3) + ") " + s.slice(3, 6) + "-" + s.slice(7, 10)
		}
	},
	mounted() {
		var self = this;
		apiGet("members", {}, function(data) {
			self.members = data.members
		})
	}
});
