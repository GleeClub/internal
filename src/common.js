import axios from "axios"

export default {
	user: {
		authenticated: false
	},

	members: {},

	roman(n)
	{
		var numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"]
		var numerals = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"]
		if (n > 20) return "" + n
		return numbers[n] + " (" + numerals[n] + ")"
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

	api(action, method, params, callback, errorCallback) {
		var data
		var headers = {}
		if (process.env.NODE_ENV == "development") headers["x-identity"] = process.env.TEST_AUTH
		if (method == "get") {
			params.action = action
			data = null
		}
		else if (method == "post") {
			data = params
			params = { action: action }
		}
		axios({
			url: "https://gleeclub.gatech.edu/buzz/api.php",
			method: method,
			data: data,
			params: params,
			headers: headers
		})
		.then(function(response) {
			var status = response.data.status
			if (status == "ok") callback(response.data)
			else {
				alert(response.data.message)
				if (errorCallback) errorCallback()
			}
		})
		.catch(function (error) {
			alert(error)
			if (errorCallback) errorCallback()
		})
	},

	apiGet(action, params, callback, errorCallback = null) {
		this.api(action, "get", params, callback, errorCallback)
	},

	apiPost(action, params, callback, errorCallback = null) {
		this.api(action, "post", params, callback, errorCallback)
	}
}
