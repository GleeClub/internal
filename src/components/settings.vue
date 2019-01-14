<template>
	<div id="events">
		<section class="section">
			<div class="container">
				<div class="columns">
					<div class="column">
						<aside class="menu">
							<ul class="menu-list">
								<li><router-link to="/settings/gig-requests">Gig Requests</router-link></li>
								<li><router-link to="/settings/make-announcement">Make Announcement</router-link></li>
								<li><router-link to="/settings/absence-requests">Absence Requests</router-link></li>
								<li><router-link to="/settings/change-semester">Edit Semester</router-link></li>
								<li><router-link to="/settings/officers">Officer Positions</router-link></li>
								<li><router-link to="/settings/permissions">Site Permissions</router-link></li>
								<li><router-link to="/settings/uniforms">Uniforms</router-link></li>
								<li><router-link to="/settings/dues">Dues</router-link></li>
								<li><router-link to="/settings/document-links">Document Links</router-link></li>
							</ul>
						</aside>
					</div>
					<div class="column">
						<div class="box">
							{{ page }}
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
	name: "events",
	props: ["page"],
	data() {
		return {
			common: common
		}
	}
}
</script>
