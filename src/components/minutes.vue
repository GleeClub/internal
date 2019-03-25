<template>
	<div id="minutes">
		<section class="section">
			<div class="container">
				<div class="columns">
					<div class="column is-narrow">
						<div class="box">
							<spinner v-if="!loaded"></spinner>
							<div v-else-if="minutes.length > 0">
								<table class="table is-fullwidth is-hoverable">
									<thead></thead>
									<tbody>
										<tr v-for="m in minutes" :key="m.id" :class="{ 'is-selected': sel && sel.id == m.id }" @click="$router.replace({ name: 'minutes', params: { id: m.id, page: 'public' } })">
											<td>{{ m.name }}</td>
										</tr>
									</tbody>
									<tfoot></tfoot>
								</table>
							</div>
							<p v-else>No minutes</p>
						</div>
					</div>
					<div class="column">
						<div class="box" v-if="id">
							<div class="tabs" v-if="common.user.permissions.includes('view-complete-minutes') || common.user.permissions.includes('edit-minutes')">
								<ul>
									<li :class="{ 'is-active': page && page == 'public' }"><router-link :to="{ name: 'minutes', params: { id: id, page: 'public' } }">Redacted</router-link></li>
									<li v-if="common.user.permissions.includes('view-complete-minutes')" :class="{ 'is-active': page && page == 'private' }"><router-link :to="{ name: 'minutes', params: { id: id, page: 'private' } }">Complete</router-link></li>
									<li v-if="common.user.permissions.includes('edit-minutes')" :class="{ 'is-active': page && page == 'edit' }"><router-link :to="{ name: 'minutes', params: { id: id, page: 'edit' } }">Edit</router-link></li>
								</ul>
							</div>
							<spinner v-if="!sel"></spinner>
							<div v-else-if="page == 'public'" v-html="sel.public"></div>
							<div v-else-if="page == 'private' && common.user.permissions.includes('view-complete-minutes')" v-html="sel.private"></div>
							<div v-else-if="page == 'edit' && common.user.permissions.includes('edit-minutes')">Edit minutes</div>
						</div>
						<div v-else class="box">
							<p>Select minutes</p>
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
	name: "minutes",
	props: ["id", "page"],
	components: {
		spinner,
	},
	data() {
		return {
			common: common,
			loaded: false,
			minutes: [],
			sel: null,
		}
	},
	watch: {
		id: {
			immediate: true,
			handler(newid, oldid) {
				console.log([oldid, newid])
				var self = this
				var s = parseInt(newid)
				if (!s || isNaN(s)) this.sel = null
				else common.apiGet("minutes", { id: newid }, function(data) {
					self.sel = data
					self.sel.id = newid
				})
			}
		},
	},
	mounted() {
		var self = this
		common.apiGet("minutes", {}, function(data) {
			self.minutes = data.minutes
			self.minutes.reverse()
			self.loaded = true
		})
	}
}
</script>
