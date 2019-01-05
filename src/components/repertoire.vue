<template>
	<div id="repertoire">
		<section class="section">
			<div class="container">
				<div class="columns">
					<div class="column">
						<div class="box">
							<h1 class="title is-4">Current</h1>
							<table class="table is-fullwidth is-hoverable">
								<tbody>
									<tr v-for="song in current" :key="song.id" @click="sel = song">
										<td>{{ song.title }}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="box">
							<h1 class="title is-4">Other</h1>
							<table class="table is-fullwidth is-hoverable">
								<tbody>
									<tr v-for="song in other" :key="song.id" @click="sel = song">
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
import common from "../common"

export default {
	name: "repertoire",
	data() {
		return {
			common: common,
			songs: [],
			sel: null,
			musicDir: null
		}
	},
	methods: {
		getLink(type, target) {
			if (type == "pdf" || type == "midi") return this.musicDir + "/" + target
			if (type == "video") return "https://youtu.be/" + target
			return target
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
		}
	},
	mounted() {
		var self = this;
		common.apiGet("songs", {}, function(data) {
			self.songs = data.songs
			self.musicDir = data.music_dir
		})
	}
}
</script>
