 
(function($) {

	$.fn.DatePickerTotal = function(){
    
    return this.each(function() {

	var now = new Date(); 
	var currentDate = now.getDate();
	// console.log(currentDate);
	var currentMonth = now.getMonth();
	// console.log(currentMonth);
	var currentYear = now.getFullYear();
	var datepickerFieldElem = $(this);
    var datepickerElem = $('<div class="datepicker"></div>');
    var dateElem = $('<div class="date" id="date"></div>');
    var prevBtnElem = $('<div class="prevbtn"> < </div>');
    var nextBtnElem = $('<div class="nextbtn"> > </div>');
    var firstDay = new Date(now.getFullYear(),now.getMonth(), 1);
    firstDay = firstDay.getDay();
 	var lastDay = new Date(now.getFullYear(),now.getMonth() + 1,0); 
 	var closeButton = $('<div {" class="closebtn">x</button>');

	datepickerElem.append(dateElem);
	dateElem.append(prevBtnElem);
	datepickerElem.append(closeButton);

	//toggle on click display Div	
    datepickerFieldElem.click(function() {
    	$(this).after(datepickerElem);
   		showDays();
	   	$(this).unbind("click");
    	   	//datepickerElem.clone().appendTo(datepickerElemContainer);
	   	  	//dateElem.clone().appendTo('<div class="month">' + months[now.getMonth() +1] + ' ' + now.getFullYear() + '</div>');	 
    });


	months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	daysInMonths = ['31', '28', '31', '30', '31', '31', '31', '31', '31', '31', '31', '31'];
	days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
	
	//days in a row    
	for(i=0; i < days.length; i++) {
		datepickerElem.append('<div class="boxWithDays">' + days[i] + '</div>'); 
	}

	// show all days
	datepickerElem.append('<div id="showDays"></div>');	
  	dateElem.append('<div class="month">' + months[now.getMonth()] + ' ' + now.getFullYear() + '</div>');	  

	var bMonth = months[now.getMonth()];
    var aMonth = months.indexOf(bMonth);
    // console.log(aMonth);
	var cMonth = daysInMonths[aMonth];

	function showDays(){
		var a = datepickerElem.children("#showDays"); 
		a.append('<div class="alldays"></div>');
		dateElem.append(nextBtnElem);

			for(var i = 0; i < firstDay; i++) {
				$('.alldays').append('<div class="daybox"></div>');
			}

			for(var i=1; i <= cMonth; i++) {
				if(i === currentDate && currentMonth === aMonth) {
					$('.alldays').append('<div class="daybox today">' + i + '</div>');				
				} else {
					$('.alldays').append('<div class="daybox">' + i + '</div>');								
				}
			}
	}

		// show days
	function showArrayDays() {
		for(var i=1; i <= cMonth; i++) {
			if(i === currentDate && currentMonth === aMonth) {
				$('.alldays').append('<div class="daybox today">' + i + '</div>');				
			} else {
				$('.alldays').append('<div class="daybox">' + i + '</div>');								
			}
		}
	}
    // previous button click
	prevBtnElem.on("click", function() {
		var firstDay = new Date(now.getFullYear(),now.getMonth() - 1);
		firstDay = firstDay.getDay();		
		var prevMonth = now.setMonth(now.getMonth() - 1);	  
		$('.month').html(months[now.getMonth()]+' '+ now.getFullYear());
		$('.alldays').empty();
		console.log(aMonth);
		console.log(currentMonth);
		aMonth--;
		
		if (aMonth < 0) {
			aMonth = 11;
		}		
		
		cMonth = daysInMonths[aMonth];
		
		for(var i = 0; i < firstDay; i++) {
			$('.alldays').append('<div class="daybox"></div>');
		}

		showArrayDays();

	    // console.log("test1")
	});

    // next button click
	nextBtnElem.on("click", function() {
		var firstDay = new Date(now.getFullYear(),now.getMonth() + 1);
    	firstDay = firstDay.getDay();		
		var nextMonth = now.setMonth(now.getMonth() + 1);
		$('.month').html(months[now.getMonth()]+' '+ now.getFullYear());
		$('.alldays').empty();
		
		aMonth++;
		
		if (aMonth > 11) {
			aMonth = 0;
		}
		cMonth = daysInMonths[aMonth];
		
		for(var i = 0; i < firstDay; i++) {
			$('.alldays').append('<div class="daybox"></div>');
		}

		showArrayDays();

	});




	closeButton.on("click", function(){
		datepickerElem.hide();
	   	datepickerFieldElem.bind("click",function(){
	   		datepickerElem.show();
	   	});
	});

	//display value date
	$(document).on("click", ".daybox",function() {
		 if($("#datepicker-field").val() != "") {
		  		$("#datepicker-field2").attr("value",$(this).html() + "/" + (aMonth + 1)  + "/" + [now.getFullYear()]);
		  		// console.log("closing");
		  		closeButton.click();
		  }else {
		  	$("#datepicker-field").attr("value",$(this).html() + "/" + (aMonth + 1)  + "/" + [now.getFullYear()]);
		  	// console.log("closing");
		  		closeButton.click();
		  };
	});

	});

  }; // end doc.ready


}( jQuery ));



