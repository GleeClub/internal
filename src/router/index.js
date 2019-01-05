import Vue from "vue"
import Router from "vue-router"
import home from "@/components/home"
import events from "@/components/events"
import repertoire from "@/components/repertoire"
import roster from "@/components/roster"

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: "/",
			name: "Home",
			component: home
		},
		{
			path: "/events",
			name: "Events",
			component: events
		},
		{
			path: "/repertoire",
			name: "Music",
			component: repertoire
		},
		{
			path: "/roster",
			name: "People",
			component: roster
		},
	]
})
