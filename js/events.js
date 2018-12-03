var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

var eventsapp = new Vue({
	el:"#events",
	data(){
		return{
			burgerIsActive: false,
			events:[],
			deets:null
		}
	},
	methods:{
		humanTime: function(jsTime){
		  //Friday, March 23, 2018 at 8:00pm
		  // jsTime = jsTime*1000.0;
		  var tempDate = new Date();
		  tempDate.setTime(jsTime);
		  var ampm;
		  tempDate.getHours()<12 ? ampm="am" : ampm="pm";
		  return ""+days[tempDate.getDay()]+", "+months[tempDate.getMonth()]+" "+tempDate.getDate()+", "+tempDate.getFullYear()+" at "+(tempDate.getHours()%12)+":"+(tempDate.getMinutes()<10 ? "0"+tempDate.getMinutes() : tempDate.getMinutes())+ampm;
		},
		loadDeets: function(eventId){
			// console.log(eventId);
			for (var i = 0; i < this.events.length; i++) {
				if(this.events[i].id == eventId){
					this.deets = this.events[i];
					break;
				}
			};
		}
	},
	mounted(){
		var self = this;
		axios.post('https://gleeclub.gatech.edu/buzz/api.php?action=events', {
		  choir: 'glee'
		},{
		  headers:{
		    "x-identity": "AcGuO6+kAWp11AQ+SKQWfD/bekyKoXkYkzh/vZNshuQ="
		  }
		})
		.then(function (response) {
		  console.log(response.data);
		  self.events = response.data.events.reverse();
		})
		.catch(function (error) {
		  console.log(error);
		});
	}
});