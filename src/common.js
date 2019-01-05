import axios from "axios"

export default {
	roman(n)
	{
		var numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"]
		var numerals = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"]
		if (n > 20) return "" + n
		return numbers[n] + " (" + numerals[n] + ")"
	},

	apiGet(action, params, callback)
	{
		params.action = action
		var endpoint = "https://gleeclub.gatech.edu/buzz/api.php"
		axios.get(endpoint, {
			params: params,
			headers: {
				"x-identity": "AcGuO6+kAWp11AQ+SKQWfD/bekyKoXkYkzh/vZNshuQ="
			}
		})
		.then(function(response) {
			var status = response.data.status
			if (status == "ok") callback(response.data)
			else alert(response.data.message)
		})
		.catch(function (error) {
			alert(error)
		})
	}
}
