import Vue from "vue"
import Router from "vue-router"
import home from "@/components/home"
import events from "@/components/events"
import repertoire from "@/components/repertoire"
import roster from "@/components/roster"

Vue.use(Router)

export default new Router({
	routes: [
		{ path: "/", component: home },
		{ path: "/events", component: events },
		{ path: "/events/:id", name: "event", component: events, props: true },
		{ path: "/repertoire", component: repertoire },
		{ path: "/repertoire/:id", name: "song", component: repertoire, props: true },
		{ path: "/roster", component: roster }
	]
})
