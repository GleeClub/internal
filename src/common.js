import axios from "axios"

export default {
	user: {
		authenticated: false
	},
	info: {},
	members: {},

	roman(n)
	{
		var numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"]
		var numerals = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"]
		if (n > 20) return "" + n
		return numbers[n] + " (" + numerals[n] + ")"
	},

	isGig(event)
	{
		return event.type == "volunteer" || event.type == "tutti"
	},

	memberName(email) {
		if (this.members[email]) return this.members[email].full
		return "(" + email + ")"
	},

	formatPhone(n) {
		var s = n.toString()
		if (s.length != 10) return s
		return "(" + s.slice(0, 3) + ") " + s.slice(3, 6) + "-" + s.slice(6, 10)
	},

	camelToKebab(s) {
		var ret = ""
		var lower = true
		for (var c of s) {
			if (c >= 97 && c <= 122) {
				if (!lower) ret += "-"
				lower = true
				ret += c
			}
			else {
				if (lower) ret += "-"
				lower = false
				ret += c.toLowerCase()
			}
		}
		return ret
	},

	kebabToCamel(s) {
		var ret = ""
		var capitalize = false
		for (var c of s) {
			if (c == "-") {
				capitalize = true
				continue
			}
			ret += capitalize ? c.toUpperCase() : c
			capitalize = false
		}
		return ret
	},

	api(method, path, params, callback, errorCallback) {
		var data = null
		var headers = {}
		if (process.env.NODE_ENV == "development") {
			headers["token"] = process.env.TEST_AUTH
		} else if (this.$cookies.get(keyName)) {
			headers["token"] = this.$cookies.get(keyName)
		}
		if (method == "post") {
			data = params
			params = {}
		}

		axios({
			url: `https://gleeclub.gatech.edu/cgi-bin/api/${path}`,
			method: method,
			data: data,
			params: params,
			headers: headers
		})
		.then(function(response) {
			callback(response.data)
		})
		.catch(function (error) {
			if (errorCallback) {
				errorCallback(response.data)
			} else {
				alert(response.data.message)
			}
		})
	},

	apiGet(path, params, callback, errorCallback = null) {
		this.api("get", path, params, callback, errorCallback)
	},

	apiPost(path, params, callback, errorCallback = null) {
		this.api("post", path, params, callback, errorCallback)
	},

	apiDelete(path, params, callback, errorCallback = null) {
		this.api("delete", path, params, callback, errorCallback)
	}

	// api(action, method, params, callback, errorCallback) {
	// 	var data
	// 	var headers = {}
	// 	if (process.env.NODE_ENV == "development") headers["x-identity"] = process.env.TEST_AUTH
	// 	if (method == "get") {
	// 		params.action = action
	// 		data = null
	// 	}
	// 	else if (method == "post") {
	// 		data = params
	// 		params = { action: action }
	// 	}
	// 	axios({
	// 		url: "https://gleeclub.gatech.edu/cgi-bin/api",
	// 		method: method,
	// 		data: data,
	// 		params: params,
	// 		headers: headers
	// 	})
	// 	.then(function(response) {
	// 		var status = response.data.status
	// 		if (status == "ok") callback(response.data)
	// 		else {
	// 			alert(response.data.message)
	// 			if (errorCallback) errorCallback()
	// 		}
	// 	})
	// 	.catch(function (error) {
	// 		alert(error)
	// 		if (errorCallback) errorCallback()
	// 	})
	// },

	// apiGet(action, params, callback, errorCallback = null) {
	// 	this.api(action, "get", params, callback, errorCallback)
	// },

	// apiPost(action, params, callback, errorCallback = null) {
	// 	this.api(action, "post", params, callback, errorCallback)
	// },

	// apiDelete(action, params, callback, errorCallback = null) {
	// 	this.api(action, "delete", params, callback, errorCallback)
	// }
}
