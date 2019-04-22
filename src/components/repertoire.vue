<template>
	<div id="repertoire">
		<section class="section">
			<div class="container">
				<div class="columns">
					<div class="column is-narrow">
						<div class="box">
							<h1 class="title is-4">Current</h1>
							<spinner v-if="!loaded"></spinner>
							<table v-else class="table is-fullwidth is-hoverable">
								<tbody>
									<tr v-for="song in current" :key="song.id" @click="select(song);$el.querySelector('#musicDeetsBox').scrollIntoView({behavior: 'smooth'})" :style="{'background-color' : id && id == song.id ? '#eeeeee':''}">
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
									<tr v-for="song in other" :key="song.id" :style="{'background-color' : id && id == song.id ? '#eeeeee':''}" @click="select(song);$el.querySelector('#musicDeetsBox').scrollIntoView({behavior: 'smooth'})">
										<td>{{ song.title }}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="column">
						<div class="box" id="musicDeetsBox">
							<div v-if="sel">
								<h1 class="title is-4">{{ sel.title }}</h1>
								<p v-if="sel.info">{{ sel.info }}</p><br v-if="sel.info">
								<p>Key: <b>{{ sel.key }}</b></p>
								<p>Starting pitch: <b>{{ sel.pitch }}</b></p><br>
								<table class="table is-fullwidth">
									<tr v-if="sel.links.pdf">
										<td style="border:none;">PDFs</td>
										<td style="border:none;">
											<div class="buttons">
												<a v-for="link in sel.links.pdf" class="button is-outlined is-primary" :href="getLink(link.type, link.target)">
													<span class="icon">
														<i class="fas fa-scroll"></i>
													</span>
													<span>{{link.name}}</span>
												</a>
											</div>
										</td>
									</tr>
									<tr v-if="sel.links.midi">
										<td style="border:none;">MIDIs</td>
										<td style="border:none;">
											<div class="buttons">
												<a v-for="link in sel.links.midi" class="button is-outlined is-primary" :href="getLink(link.type, link.target)">
													<span class="icon">
														<i class="fas fa-volume-up"></i>
													</span>
													<span>{{link.name}}</span>
												</a>
											</div>
										</td>
									</tr>
									<tr v-if="sel.links.video">
										<td style="border:none;">Videos</td>
										<td style="border:none;" class="buttons">
											<span style="display: flex;align-items: center;" v-for="link in sel.links.video">
												<span class="icon has-text-grey-lighter" style="margin-right: .5rem;">
													<i class="fas fa-external-link-alt"></i>
												</span>
												<a class="button" :href="getLink('video', link.target)" target="_blank">
													<span class="icon has-text-danger">
														<i class="fab fa-youtube"></i>
													</span>
												</a>
												<p><span>{{link.name}}</span></p>
											</span>	
										</td>
									</tr>
									<!--<tr v-for="link in sel.links" :key="link.id">
										<td style="border:none;">{{ link.type }}</td>
										<td style="border:none;">
											<a v-if="link.type == 'pdf'" class="button is-large" :href="getLink(link.type, link.target)">
												<span class="icon is-medium">
													<i class="fas fa-file"></i>
												</span>
												<span>{{link.name}}</span>
											</a>
											<a v-if="link.type == 'midi'" class="button is-large" :href="getLink(link.type, link.target)">
												<span class="icon is-medium has-text-primary">
													<i class="fas fa-file-audio"></i>
												</span>
												<span>{{link.name}}</span>
											</a>
											<span v-if="link.type == 'video'" style="display: flex;align-items: center;">
												<a class="button is-large" :href="getLink(link.type, link.target)" target="_blank">
													<span class="icon is-medium has-text-danger">
														<i class="fab fa-youtube"></i>
													</span>
													<span>{{link.name}}</span>
												</a>
												<span class="icon has-text-grey-light is-medium">
													<i class="fas fa-external-link-alt"></i>
												</span>
											</span>											
										</td>
									</tr>-->
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
