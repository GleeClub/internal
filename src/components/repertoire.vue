<template>
	<div id="repertoire">
		<section class="section">
			<div class="container">
				<div class="columns">
					<div class="column">
						<div class="box">
							<h1 class="title is-4">Current</h1>
							<spinner v-if="!loaded"></spinner>
							<table v-else class="table is-fullwidth is-hoverable">
								<tbody>
									<tr v-for="song in current" :key="song.id" :class="{ 'is-selected': id && id == song.id }" @click="select(song)">
										<td>{{ song.title }}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="box">
							<h1 class="title is-4">Other</h1>
							<spinner v-if="!loaded"></spinner>
							<table v-else class="table is-fullwidth is-hoverable">
								<tbody>
									<tr v-for="song in other" :key="song.id" :class="{'is-selected': id && id == song.id}" @click="select(song)">
										<td>{{ song.title }}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="column">
						<div class="box">
							<div v-if="sel">
								<h1 class="title is-4">{{ sel.title }}</h1>
								<strong>Key:</strong> {{ sel.key }} — <strong>Starting pitch:</strong> {{ sel.pitch }}
								<p>{{ sel.info }}</p>
								<table class="table is-fullwidth">
									<tr v-for="link in sel.links" :key="link.id">
										<td>{{ link.type }}</td>
										<td>
											<a :href="getLink(link.type, link.target)">{{ link.name }}</a>
										</td>
									</tr>
								</table>
							</div>
							<p v-else>Select a song.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import common from "@/common"
import spinner from "./util/spinner"

export default {
	name: "repertoire",
	props: ["id"],
	components: {
		spinner,
	},
	data() {
		return {
			common: common,
			loaded: false,
			songs: [],
			musicDir: null
		}
	},
	methods: {
		getLink(type, target) {
			if (type == "pdf" || type == "midi") return this.musicDir + "/" + target
			if (type == "video") return "https://youtu.be/" + target
			return target
		},
		select(song) {
			this.$router.replace({ name: 'song', params: { id: song.id } })
		}
	},
	computed: {
		current() {
			return this.songs
				.filter(function(s) { return s.current })
				.sort(function(a, b) { return a.title.localeCompare(b.title) })
		},
		other() {
			return this.songs
				.filter(function(s) { return !s.current })
				.sort(function(a, b) { return a.title.localeCompare(b.title) })
		},
		sel() {
			var id = parseInt(this.id)
			if (!id || isNaN(id)) return null
			var res = this.songs.filter(function(s) { return s.id == id })
			if (res.length != 1) return null
			return res[0]
		}
	},
	mounted() {
		var self = this;
		common.apiGet("songs", {}, function(data) {
			self.songs = data.songs
			self.musicDir = data.music_dir
			self.loaded = true
		})
	}
}
</script>
