/**
 * @author magnumvint
 */
"use strict";
//start
$(document).ready(function(){	
	//calendar	
	calCtrl.remove();
    calCtrl.init();	
});
var $calOpener,
	calCtrl = {
		init:function() {			
			var $cBtn,co;
			$cBtn = $('input').next().filter(function(i){
				if( $(this).find('>img').attr('alt') === '달력' ){
					return $(this);
				}				
			});			
			$cBtn.on('click', function(e) {	
				e.preventDefault();	
				calCtrl.remove();
				$(this).prev().addClass('c');	
				$calOpener = $(e.currentTarget);				
				var dbcal = new DBcallendar($(e.currentTarget));				
			});			
			$cBtn.prev().on('click focus', function(e){						
				$(this).addClass('c');				
				$(e.currentTarget).next().trigger('click');				
			});			
		},		
		remove:function() {			
			if ($('.calendar').length !== 0) {
	    		$('.calendar').remove();	
	    		$('.calBtn').remove();
	    	};				
		}
	};
    
function DBcallendar(calBtn) {    
    var calBtn,
   		_cPos, 
    	_now,
        _day,
        _month,
        _year,
        $container,
        $yearAndmonth,
        $year,
        $month,
        $days,
        $day,
        $arrYear,
        $arrMonth,
        $dateField,
        $calClose;

    function addZeroM(num) {        //month
        num += 1;        
        if (num < 10) {
            num = "0"+num;                
        };        
        return num;        
    };    
    function addZeroD(num) {                
        if (num < 10) {
            num = "0"+num; 
        };        
        return num;        
    };        
    function setup() {    	
    	var link = $('link').eq(0).attr('href'),
			links = link.substring(0, link.lastIndexOf('/')-3);			//경로 
		calBtn.closest('body').append(
			'<div class="calendar">'+
			'<a href="#" class="calClose"><img src="'+links+'img/common/btn_close_4.gif" alt="달력 닫기" /></a>'+
				'<div class="calendarTop">'+					
					'<select class="formSelect" title="년도" style="width: 95px;">'+
						//'<option>2014년</option>'+
					'</select>'+
					'<select class="formSelect" title="월" style="width: 80px;">'+
						'<option>12월</option>'+
						'<option>11월</option>'+
						'<option>10월</option>'+
						'<option>9월</option>'+
						'<option>8월</option>'+
						'<option>7월</option>'+
						'<option>6월</option>'+
						'<option>5월</option>'+
						'<option>4월</option>'+
						'<option>3월</option>'+
						'<option>2월</option>'+
						'<option>1월</option>'+
					'</select>'+
				'</div>'+
				'<div class="calendarCon">'+
					'<table class="calTable" summary="원하시는 날짜를 선택하실 수 있습니다.">'+
					'<caption>달력</caption>'+
					'<colgroup>'+
						'<col span="7" width="30" />'+				
					'</colgroup>'+
					'<thead>'+
						'<tr>'+
							'<th scope="col" class="hol">일</th><th scope="col">월</th><th scope="col">화</th><th scope="col">수</th><th scope="col">목</th><th scope="col">금</th>'+
							'<th scope="col" class="hol">토</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>'+
					'</tbody>'+
					'</table>'+
				'</div>'+				
			'</div>');
		
		_cPos = parseInt(calBtn.offset().left),
        _now = new Date(),
        _day = _now.getDate(),
        _month = _now.getMonth(),
        _year = _now.getYear(),
        $container = $('.calendar'),        
        $yearAndmonth = $container.find('.calendarTop').find('span'),
        $days = $container.find('.calTable').find('tbody').find('tr'),
        $arrYear = $container.find('.calendarTop').find('.formSelect:eq(0)'),
        $arrMonth = $container.find('.calendarTop').find('.formSelect:eq(1)'),
        $dateField = calBtn.prev();
        $calClose = $('a.calClose');
        $container.css({left:_cPos - 112, top:parseInt(calBtn.offset().top) + 30,position:'absolute'});
        if (_year < 2000) {            
            _year = _year + 1900;
        };        
        //
        $arrYear.append('<option>'+ _year +'년</option>');
        $arrMonth.getSetSSValue( (_month+1) +'월' ); 
        $container.find('.formSelect').sSelect();        
        
        initCalendar(_month, _year);
        buildCalendar(_month, _year);            
    };
    
    function initCalendar(_month, _year) {        
        $yearAndmonth.empty().text( _year+'.'+(_month+1) );        
        $days.each(function(i){
            $(this).empty();    
        });
    };
    
    function buildCalendar(_month, _year) {        
        var i = 0,
            m = _month,
            y = _year,
            totalDays = getTotalDays(m+1, y),
            fDayOfMonth = new Date(y, m, 1),
            initPos = fDayOfMonth.getDay();        
        totalDays += initPos; // 달력 앞 날짜 빈 공란을 포함한 전체 일 수        
        // 달력 첫 줄 빈 칸 입력        
        for (i = 0; i < initPos; i++) {
            var $dEl = $('<td class="noDate"><a href="#" title="선택">&nbsp;</a></td>');
            $days.eq(0).append($dEl);
        };        
        for (i = initPos; i < totalDays; i++) {
            if (i < 7) {
                var $dEl = $('<td><a href="#">'+(i-(initPos-1))+'</a></td>');
                $days.eq(0).append($dEl);  
            } else if (i > 6 && i < 14) {
                var $dEl = $('<td><a href="#" title="선택">'+(i-(initPos-1))+'</a></td>');
                $days.eq(1).append($dEl); 
            } else if (i > 13 && i < 21) {
                var $dEl = $('<td><a href="#" title="선택">'+(i-(initPos-1))+'</a></td>');
                $days.eq(2).append($dEl); 
            } else if (i > 20 && i < 28) {
                var $dEl = $('<td><a href="#" title="선택">'+(i-(initPos-1))+'</a></td>');
                $days.eq(3).append($dEl); 
            } else if (i > 27 && i < 35) {
                var $dEl = $('<td><a href="#" title="선택">'+(i-(initPos-1))+'</a></td>');
                $days.eq(4).append($dEl); 
            } else if (i > 34 && i < totalDays) {
                var $dEl = $('<td><a href="#" title="선택">'+(i-(initPos-1))+'</a></td>');
                $days.eq(5).append($dEl); 
            };
        };        
        for (i = 0; i < totalDays; i++) {            
            $days.find('td').eq(_day+initPos-1).addClass('today');
        };
        //click        
        $days.each(function(i){
        	$(this).find('td').eq(0).addClass('hol');
        	$(this).find('td').eq(6).addClass('hol');        	
        });        
        $day = $container.find('td');        
        $day.on('click', function(e){
            e.preventDefault();
            var cday = addZeroD($(e.currentTarget).find('a').text()),
		    		$cont = $('.leftArea .calTit > span'),
		    		$tYear = $cont.eq(0),
		    		$tMonth = $cont.eq(2),
		    		$tDay = $cont.eq(4);
            
            if ( $(this).hasClass('noDate') ){            	
            	return false;
            }else{				
				$dateField.val(_year+"."+addZeroM(_month)+"."+cday);
				$dateField.attr('value', '').attr('value', _year+"."+addZeroM(_month)+"."+cday);				
		    	$('.calendar').hide();
		    	$calOpener.focus();	    	
            }
	    	
	    });
	    $calClose.on('click', function(e) {	        
	        e.preventDefault();            
            $('.calendar').hide();
            $calOpener.focus();               
	    });
	    
        function getTotalDays(m, y) {            
            var tds;            
            if (m === 2) {              
                isLeapYear(y) ? tds = 29 : tds = 28;               
            } else if (m === 4 || m === 6 || m === 9 || m === 11) {              
                tds = 30;                      
            } else {                
                tds = 31;                
            };               
            return tds;
        };        
        function isLeapYear(y) {
            if (((y % 4) == 0) && ((y % 100) != 0) || ((y % 400) == 0)) {                
                return (true);            
            } else {            
                return (false);            
            };
        };
        $container.find('a').eq(0).focus();
    };    
    setup();
    
    function resetyear( ny ){
    	$arrYear.empty();
	    for ( var i = ny-10; i <= ny+10; i++ ){
	    	$arrYear.append('<option>'+ i +'년</option>');
	    }
	    $arrYear.getSetSSValue(ny); 	     
	    $arrYear.resetSS();
    }
    resetyear( _year );
    
    $arrYear.on('change', function(e){
        _year = parseInt($(this).val());        
	    $arrYear.find('option').each(function(k){
	    	var y = _year-10,
	    		ty = y+k;	    	
	    	$(this).text( ty +'년');
	    	if ( y+k === _year ){
	    		$(this).attr('selected','selected');
	    	}
	    });
        $arrYear.resetSS();
        initCalendar(_month, _year); 
        buildCalendar(_month, _year);        
    });         
    $arrMonth.on('change', function(e){       
        _month = parseInt($(this).val())-1 ;        
        initCalendar(_month, _year);
        buildCalendar(_month, _year);
    }); 
};