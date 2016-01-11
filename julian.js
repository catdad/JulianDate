/* jshint browser: true */

(function(window, document, navigator){
	//helper - get element
	function O(id){
		return document.getElementById(id);
	}
	function C(selector, elem){
		elem = (elem) ? elem : document;
		return elem.getElementsByClassName(selector)[0];
	}
	
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
			
		switch(month) {
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
				month = 1; //'January';
				day = julian;
				break;
			case julian<=(59 + leap):
				month = 2; //'February';
				day = julian - 31;
				break;
			case julian<=(90 + leap):
				month = 3; //'March';
				day = julian - (59 + leap);
				break;
			case julian<=(120 + leap):
				month = 4; //'April';
				day = julian - (90 + leap);
				break;
			case julian<=(151 + leap):
				month = 5; //'May';
				day = julian - (120 + leap);
				break;
			case julian<=(181 + leap):
				month = 6; //'June';
				day = julian - (151 + leap);
				break;
			case julian<=(212 + leap):
				month = 7; //'July';
				day = julian - (181 + leap);
				break;
			case julian<=(243 + leap):
				month = 8; //'August';
				day = julian - (212 + leap);
				break;
			case julian<=(273 + leap):
				month = 9; //'September';
				day = julian - (243 + leap);
				break;
			case julian<=(304 + leap):
				month = 10; //'October';
				day = julian - (273 + leap);
				break;
			case julian<=(334 + leap):
				month = 11; //'November';
				day = julian - (304 + leap);
				break;
			default:
				month = 12; //'December';
				day = julian - (334 + leap);
				break;
		}
		
		//iPhone doesn't like iso date
		//var nd = new Date([year, month, day].join('-')); //get date from ISO string
		var nd = new Date(year, month-1, day);
		
		return nd;
	}
	
	Date.prototype.getJulian = function(){ return getJulian(this); };
	
	var julian = {
		date: new Date( (new Date()).toDateString() ), //code expects UTC date
		julianDOM: O('julianInput'),
		dateDOM: O('dateInput'),
        
        cleanDate: function(date) {
            return new Date(date.toDateString());
        },
        now: function() {
            return this.cleanDate(new Date());
        },
        toIsoDate: function(date) {
            return date.toISOString().substring(0,10);
        },
		
		changeJulian: function(val) {
            this.date = getDate(val);
			this.displayJulian().displayDate();
		},
		changeDate: function(val) {
			this.date = val;
			this.displayJulian().displayDate();
		},
		error: function() {
            this.julianDOM.value = 'error';
            this.dateDOM.value = '';
		},
		displayJulian: function() {
			this.julianDOM.value = this.date.getJulian();
			return this;
		},
		displayDate: function() {
            this.dateDOM.value = this.toIsoDate(this.cleanDate(this.date));
			return this;
		}
	};
	
	//initialize
	window.julian = julian;
	julian.displayJulian().displayDate();
	
	var infoCard = C('toggle card');
	infoCard.trigger = C('trigger', infoCard);
	infoCard.text = C('text', infoCard);
	infoCard.trigger.onclick = function(ev){
		if (infoCard.classList.contains('open')) {
			infoCard.trigger.innerHTML = 'More Info';
			infoCard.classList.remove('open');
			infoCard.classList.add('close');
		}
		else {
			infoCard.trigger.innerHTML = 'Less Info';
			infoCard.classList.remove('close');
			infoCard.classList.add('open');
		}
	};
	
	//events
	var showToday = function(){
		O('today').classList.remove('hide');
	};
	
	var hideToday = function(){
		O('today').classList.add('hide');
	};
	
	function offlineMode(){
		var card = document.getElementsByClassName('cache card')[0];
		card.classList.remove('hide');
	}
	
	function onlineMode(){
		window.applicationCache.update(); //check for update
		
		var card = document.getElementsByClassName('cache card')[0];
		card.classList.add('hide');
	}
	
	// online/offline listeners
	if (window.applicationCache){
		window.addEventListener('offline', offlineMode, false);
		window.addEventListener('online', onlineMode, false);
		window.applicationCache.addEventListener('noupdate', function(){ 
//            console.log('no update');
        }, false);
		window.applicationCache.addEventListener('updateready', function(){
			window.applicationCache.swapCache();
		}, false);
	}
	//initial check
	if (!navigator.onLine) offlineMode();
	
	//select custom date
	julian.dateDOM.onchange = function(ev) {
		julian.changeDate( new Date(this.value) );
        
		showToday();
	};
	
	//immedaitely show changes
    julian.julianDOM.addEventListener('focus', function() {
        var that = this;
        setTimeout(function(){
            that.select();
        }, 0);
    });
	julian.julianDOM.addEventListener('input', function(ev) {
		var val = +this.value; //force to number
        
		if (!isNaN(val) && val < 367 && val > 0) {
			julian.changeJulian(val);
        }
		
		showToday();
	});
    julian.julianDOM.addEventListener('change', function(ev) {
        this.blur();
        
        var val = +this.value;
        
        if (isNaN(val) || val > 367 || val < 1) {
            julian.error();
        }
    });
	
	//reset julian to today
	O('today').onclick = function(){
		julian.date = julian.now();
		julian.displayJulian().displayDate();
		hideToday();
	};
})(window, document, navigator);
