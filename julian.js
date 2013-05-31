(function(){
	function isLeap(y){
		if (y%400 === 0) return true;
		else if (y%100 === 0) return false;
		else if (y%4 === 0) return true;
		else return false;
	}

	function getDay(date){
		var day = date.getUTCDate(),
			month = date.getUTCMonth() + 1, //month starts at 0
			year = date.getUTCFullYear(),
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
		date: new Date( (new Date()).toDateString() ),
		julianDOM: document.getElementById("julian"),
		dateDOM: document.getElementById("date"),
		
		//functions
		displayJulian: function(){
			this.julianDOM.innerHTML = this.date.getJulian();
			return this;
		},
		displayDate: function(){
			this.dateDOM.innerHTML = this.date.toUTCString().substr(0, 16);
			return this;
		}
	}
	
	//initialize
	window.julian = julian;
	julian.displayJulian().displayDate();
	
	//events
	var showInfo = function(){
		var card = document.getElementsByClassName("info card")[0];
		card.classList.remove("hide");
	}
	
	var hideInfo = function(){
		var card = document.getElementsByClassName("info card")[0];
		card.classList.add("hide");
	}
	
	var showToday = function(){
		document.getElementById("dateInput").value = "";
		document.getElementById("today").classList.remove("hide");
	}
	
	var hideToday = function(){
		document.getElementById("today").classList.add("hide");
	}
	
	document.getElementById("info").onclick = showInfo;
	document.getElementById("close").onclick = hideInfo;
	
	document.getElementById("today").onclick = function(){
		julian.date = new Date( (new Date()).toDateString() );
		julian.displayJulian().displayDate();
		
		hideToday();
	};
	
	document.getElementById("date").onclick = function(){
		document.getElementById("dateInput").focus();
		document.getElementById("dateInput").click();
	};
	
	document.getElementById("dateInput").onchange = function(ev){
		julian.date = new Date(ev.target.value);
		julian.displayJulian().displayDate();
		
		showToday();
	};
})();
