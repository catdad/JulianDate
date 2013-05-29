(function(){
	function isLeap(y){
		if (y%400 === 0) return true;
		else if (y%100 === 0) return false;
		else if (y%4 === 0) return true;
		else return false;
	}

	function getDay(date){
		var day = date.getDate(),
			month = date.getMonth() + 1, //month starts at 0
			year = date.getFullYear(),
			doy = 0;
		
		switch(month){
			case 1:
				doy = day;
				break;
			case 2:
				doy = day + 31;
				break;
			default:
				doy = Math.floor(30.6*month - 91.4) + day; //floor(30.6 (m + 1)) + d - 122
				doy += (isLeap(year)) ? 60:59;
				break;
		}
		
		return doy; // date on egg cartons starts at 1 (or maybe 0)
	}
	
	function setDay(julian, date){
		var year = date.getFullYear();
		
	}
	
	Date.prototype.getJulian = function(){ return getDay(this); }
	
	var julian = {
		//vars
		date: new Date(),
		julianDOM: document.getElementById("julian"),
		dateDOM: document.getElementById("date"),
		
		//functions
		displayJulian: function(){
			this.julianDOM.innerHTML = this.date.getJulian();
			return this;
		},
		displayDate: function(){
			this.dateDOM.innerHTML = this.date.toDateString();
			return this;
		}
	}
	
	julian.displayJulian().displayDate();
})();