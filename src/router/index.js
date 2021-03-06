import Vue from "vue"
import Router from "vue-router"
import home from "@/components/home"
import events from "@/components/events"
import repertoire from "@/components/repertoire"
import roster from "@/components/roster"
import officer from "@/components/officer"
import profile from "@/components/profile"
import editProfile from "@/components/edit-profile"
import confirmAccount from "@/components/confirm-account"
import minutes from "@/components/minutes"

Vue.use(Router)

export default new Router({
	routes: [
		{ path: "/", component: home },
		{ path: "/events", component: events },
		{ path: "/events/:id", redirect: "/events/:id/details" },
		{ path: "/events/:id/:page", name: "event", component: events, props: true },
		{ path: "/repertoire", component: repertoire },
		{ path: "/repertoire/:id", name: "song", component: repertoire, props: true },
		{ path: "/roster", component: roster },
		{ path: "/roster/:id", name: "profile", component: profile, props: true },
		{ path: "/officer", component: officer },
		{ path: "/officer/:page", name: "officer", component: officer, props: true },
		{ path: "/profile", component: editProfile },
		{ path: "/confirm", name: "confirm", component: confirmAccount },
		{ path: "/minutes", component: minutes },
		{ path: "/minutes/:id", redirect: "/minutes/:id/public" },
		{ path: "/minutes/:id/:page", name: "minutes", component: minutes, props: true },
	],
	linkActiveClass: "is-active"
})
