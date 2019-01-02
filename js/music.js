var app = new Vue({
	el: "#repertoire",
	data: {
		burgerIsActive: false,
		songs: [],
		sel: null,
		musicDir: null
	},
	methods: {
		getLink(type, target) {
			if (type == "pdf" || type == "midi") return baseurl + this.musicDir + "/" + target
			if (type == "video") return "https://youtu.be/" + target
			return target
		}
	},
	computed: {
		current() {
			// TODO Sort
			return this.songs.filter(function(s) { return s.current })
		},
		other() {
			return this.songs.filter(function(s) { return !s.current })
		}
	},
	mounted() {
		var self = this;
		apiGet("songs", {}, function(data) {
			self.songs = data.songs
			self.musicDir = data.music_dir
		})
	}
});
