<template>
	<div id="setlist">
		<spinner v-if="!loaded"></spinner>
		<table v-else-if="songs.length > 0" class="table is-fullwidth is-striped">
			<tbody>
				<tr v-for="(song, idx) in songs" :key="song.id">
					<td>{{ idx + 1 }}</td>
					<td><router-link :to="{ name: 'song', params: { id: song.id } }">{{ song.title }}</router-link></td>
					<td>{{ song.key }}</td>
					<td>{{ song.pitch }}</td>
				</tr>
			</tbody>
		</table>
		<div v-else>
			No set list for this event.
		</div>
	</div>
</template>

<script>
import common from "@/common"
import spinner from "../util/spinner"

export default {
	name: "setlist",
	props: ["event"],
	components: {
		spinner,
	},
	data() {
		return {
			common: common,
			loaded: false,
			songs: []
		}
	},
	mounted() {
		var self = this
		common.apiGet("setList", { event: this.event }, function(data) {
			self.songs = data.songs
			self.loaded = true
		})
	}
}
</script>
