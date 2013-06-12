(function(){
	function isLeap(y){
		if (y%400 === 0) return true;
		else if (y%100 === 0) return false;
		else if (y%4 === 0) return true;
		else return false;
	}
	
	
	function getJulian(date){
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
	
	function getDate(julian){
		var year = (new Date()).getFullYear();
		var leap = (isLeap(year)) ? 1:0;
		var month = 0;
		var day = 0;
		
		switch(true){
			case julian<=(31):
				month = 1; //"January";
				day = julian;
				break;
			case julian<=(59 + leap):
				month = 2; //"February";
				day = julian - 31;
				break;
			case julian<=(90 + leap):
				month = 3; //"March";
				day = julian - (59 + leap);
				break;
			case julian<=(120 + leap):
				month = 4; //"April";
				day = julian - (90 + leap);
				break;
			case julian<=(151 + leap):
				month = 5; //"May";
				day = julian - (120 + leap);
				break;
			case julian<=(181 + leap):
				month = 6; //"June";
				day = julian - (151 + leap);
				break;
			case julian<=(212 + leap):
				month = 7; //"July";
				day = julian - (181 + leap);
				break;
			case julian<=(243 + leap):
				month = 8; //"August";
				day = julian - (212 + leap);
				break;
			case julian<=(273 + leap):
				month = 9; //"September";
				day = julian - (243 + leap);
				break;
			case julian<=(304 + leap):
				month = 10; //"October";
				day = julian - (273 + leap);
				break;
			case julian<=(334 + leap):
				month = 11; //"November";
				day = julian - (304 + leap);
				break;
			default:
				month = 12; //"December";
				day = julian - (334 + leap);
				break;
		}
		
		/*
		var newDate = new Date();
		newDate.setDate = day;
		newDate.setFullYear = year;
		newDate.setMonth = (month - 1); //month starts at 0
		/* */
		
		var nd = new Date(year+'-'+month+'-'+day);
		
		//var UTCDate = new Date( newDate.toDateString() ); //code expects UTC Date
		
		//return UTCDate;
		return nd;
	}
	
	window.getDate = getDate;
	
	Date.prototype.getJulian = function(){ return getJulian(this); }
	
	var julian = {
		//vars
		date: new Date( (new Date()).toDateString() ), //code expects UTC date
		julianDOM: document.getElementById("julian"),
		dateDOM: document.getElementById("date"),
		
		//functions
		changeJulian: function(val){
			//this.julianDOM.innerHTML = val;
			console.log(val);
			
			this.date = getDate(val);
			
			console.log(this.date);
			this.displayJulian().displayDate();
			console.log('change done');
		},
		changeDate: function(val){
			this.date = val;
			this.displayJulian().displayDate();
		},
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
	
	//select custom date
	document.getElementById("date").onclick = function(){
		document.getElementById("dateInput").focus();
		document.getElementById("dateInput").click();
	};
	
	document.getElementById("dateInput").onchange = function(ev){
		document.getElementById("dateInput").click(); //hack necessary for immediate update
		julian.changeDate( new Date(ev.target.value) );
		this.value = null;
		
		showToday();
	};
	
	//select custom julian
	document.getElementById("julian").onclick = function(){
		document.getElementById("julianInput").focus();
		document.getElementById("julianInput").click();
	};
	
	document.getElementById("julianInput").oninput = function(ev){
		//julian.changeJulian(Number(ev.target.valueAsNumber));
		julian.changeJulian(Number(this.value));
		
		showToday();
	};
	document.getElementById("julianInput").onchange = function(){
		this.value = null;
	}
})();
