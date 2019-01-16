<template>
	<div id="events">
		<section class="section">
			<div class="container">
				<div class="box">
					You're not logged in.
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import common from "@/common"

export default {
	name: "login",
	data() {
		return {
			common: common
		}
	}
}
</script>
