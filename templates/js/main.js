/**
 * @author magnumvint
 */
/**
 * 쿠키 저장
 */
function m_setCookie(name, value, expiredays){ //쿠키 저장함수
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";" ;
}

/**
 * 쿠키 가져오기
 */
function m_getCookie(Name) {
    var search = Name + "=";
    if (document.cookie.length > 0) { // if there are any cookies
        offset = document.cookie.indexOf(search);
        if (offset != -1) { // if cookie exists
            offset += search.length; // set index of beginning of value
            end = document.cookie.indexOf(";", offset); // set index of end of cookie value
            if (end == -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        }
    }
}

"use strict";
//browser check
var Browser = { chk: navigator.userAgent.toLowerCase() }, rv = -1, checkBrowser = false;
Browser = {
	ie : Browser.chk.indexOf('msie') != -1,
	ie6 : Browser.chk.indexOf('msie 6') != -1,
	ie7 : Browser.chk.indexOf('msie 7') != -1,
	ie8 : Browser.chk.indexOf('msie 8') != -1,
	ie9 : Browser.chk.indexOf('msie 9') != -1,
	opera : !!window.opera,
	firefox : Browser.chk.indexOf('firefox') != -1,
	chrome : Browser.chk.indexOf('chrome') != -1
};

function getInternetExplorerVersion() {
     if (navigator.appName == 'Microsoft Internet Explorer') {        
          var ua = navigator.userAgent;        
          var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
          if (re.exec(ua) != null)            
              rv = parseFloat(RegExp.$1);    
         }      
     return rv; 
}
getInternetExplorerVersion();

if( Browser.ie && rv < 9 ){
	checkBrowser = true;
}

//start
$(document).ready(function(){	
	//footer
	var f = $('div.fLink > select.formSelect').next();
	f.on('click', function(e){
		if(f.find('>div>span').text() === 'Family Site'){
			f.next().attr('href','JavaScript:void(0);');
		}
	});
	if(f.find('>div>span').text() === 'Family Site'){
		f.next().attr('href','JavaScript:void(0);');
	}
	f.next().attr('target','_blank');	
	//menu
	scl.menu();	
	//layer popup
	poplayer.init();
	//pr focus	
	movefocus();
	socialmovefocus();
	//tab Type : tabType animate 고객센터 아코디언
	if( $('a.tabType.sel').length > 0 ){
		var tabdiv = $('#gotoMainContents').find('#tabType');				
		$('a.tabType').on('click', function(e){
			var $this = $(this);
			var idx = $(this).index('.tabType');
			e.preventDefault();
			$('a.tabType').removeClass('sel');
			$(this).addClass('sel');
			var txt = $('a.tabType').attr('title');
			var tittxt = new String( txt );
			$('a.tabType').attr('title', tittxt.replace('상세닫기','상세보기') );
			var tt = $(this).attr('title').split(" ");
			var txtThis = $(this).attr('title');
			var tittxtThis = new String( txtThis );
			tt[tt.length-1] ==='상세보기' ? $(this).attr('title', tittxtThis.replace('상세보기','상세닫기') ) : $(this).attr('title', tittxtThis.replace('상세닫기','상세보기') );			
			tabdiv.each(function(i){
				if( i === idx ){
					$(this).show(0);					
				}else{
					$(this).hide();
				}
			});
			$(window).scrollTop( $this.offset().top );
		}); 
	}
	//tab Type : tabType3
	if( $('ul.tabType3').length > 0){		
		$('ul.tabType3').find('>li > a').on('click',function(e){
			e.preventDefault();
			var idx = $(this).parent().index();
			$('ul.tabType3').find('>li').removeClass('sel');
			$(this).parent().addClass('sel');			
			$('div.tabType3_Block').hide();
			$('div.tabType3_Block').eq(idx).show();
		});
	}
	//gas/apply
	//gas.apply();
	//요금안내
	viewReceipt.moving();
	//기업소개 - 활동분야
	if( $('.designForAct').length > 0 ){
		dfact();
	}
	function dfact(){
		var btn = $('dl.designForAct > dt > a'),
			view = $('dl.designForAct > dd');
		btn.on('click',function(e){
			e.preventDefault();
			var txtThis1= $(this).find('img').attr('src');
			var srctxtThis= new String(txtThis1);
			var txtThis2= $(this).find('img').attr('alt');
			var alttxtThis= new String(txtThis2);
			if( srctxtThis.match(/(open)/) ){
				btn.find('img').attr('alt', alttxtThis.replace('내용닫기','내용보기') );
				$(this).find('img').attr('alt', alttxtThis.replace('내용보기','내용닫기') );
				btn.find('img').attr('src', srctxtThis.replace('_close_1.','_open_1.') );
				$(this).find('img').attr('src', srctxtThis.replace('_open_1.','_close_1.') );
				view.hide();
				$(this).parent().next().show();
			}else{				
				$(this).find('img').attr('alt', alttxtThis.replace('내용닫기','내용보기') );				
				$(this).find('img').attr('src', srctxtThis.replace('_close_1.','_open_1.') );
				$(this).parent().next().hide();
			}
			
		});
	}
	//공사현황관리
	//report.init();
	//////////////////
	//	지도활성화	//
	//////////////////
	if( $('div.mapBox').length > 0 ){
		$('div.mapBox > a[class^="name"]').on('mouseenter focus', function(e){	//시이름에 마우스가 들어갔을때.
			var idx = $(this).attr('class'),
				num = idx.substring(4,6);
			$('div.mapBox > a[class^="area"]').removeClass('on');
			$('div.mapBox > a[class="area'+num+'"]').addClass('on');
		});
		$('div.mapBox > a[class^="area"]').on('mouseenter focus', function(e){	//지도에 마우스가 들어갔을때.			
			$('div.mapBox > a[class^="area"]').removeClass('on');
			$(this).addClass('on');
		});
	}
	//협력업체 - 공지사항/자료실 탭
	if( $('div.designForNotice').length > 0 ){
		$('div.designForNotice > div > a').on('click', function(e){
			//e.preventDefault();	
			$('div.designForNotice > div > div').hide();
			$('div.designForNotice > div > a').removeClass('on');
			$(this).addClass('on');
			$(this).next().show();			
		});
	}
	//////////////////////	
	//	eng ver tab		//
	//////////////////////
	if ( $('div#tab_his_1').length > 0 ){
		engtab();
	}
	function engtab(){
		var list = $('ul.tabType2 > li > a'),
			view = $('div[id^=tab_his]');
		list.on('click', function(e){
			e.preventDefault();
			var idx = $(this).parent().index() + 1;
			$('ul.tabType2 > li').removeClass('sel');
			$(this).parent().addClass('sel');
			view.hide();
			$('div[id=tab_his_'+idx+']').show();
		});
	}
	
});
$(window).load(function(){	
	//top btn
	$(window).scroll(function(){
		var topbtn = $('div.footer a.top');
		if( $(window).scrollTop() > 1999 ){		
			topbtn.removeAttr("class");
			topbtn.show().css({
				'margin-right':'-561px',
				'position':'fixed',
				'right':'50%',
				'bottom':'151px'
			});	
		}else{
			topbtn = $('div.footer > div.inBox > a');			
			topbtn.hide();
			topbtn.addClass('top');
		}
	});
	//홍보센터 역사관
	sHistory();
	//메인 비쥬얼롤링
	if( $('.main_Top > .visual').length > 0 ){
		visualroll();
	}
	function visualroll(){
		var li = $('.main_Top > .visual > li'),
			dot = $('.main_Top > .visual').next(),
			wid = $(window).width();
		//var src = new String(li.eq(0).css('background-image'));
		$('.main_Top').css('overflow','hidden');
		var loc = new String(dot.find('a:first>img').attr('src'));		//../img/main  12-07수정
		var src = loc.substring(0,loc.lastIndexOf('/'));
		li.each(function(k){
			$(this).data('li',k);
			var n = k+1;			
			//var srctxt = src.replace(/(\d[.])/,n+'.');			///bg_visual_1.jpg
			var srctxt = 'url('+src+'/bg_visual_'+ n +'.jpg)';
			$(this).css('background-image', srctxt );
		});
		var cont = 0, checkfocus = false;
		dot.find('a').not(':last').each(function(i){
			$(this).find('img').attr('alt', li.eq(i).find('span').text()+' 선택');
		});		
		dot.find('a').not(':last').on('click', function(e){
			e.preventDefault();
			var idx = $(this).index();
			
			if( li.eq(0).is(':animated') ){
				return false;
			}else{
				cont = idx;
				dot.find('a').each(function(i){
					var txt = $(this).find('img').attr('src');
					var srctxt = new String(txt);
					if( i === idx ){
						$(this).find('img').attr('src', srctxt.replace('_off_','_on_'));
					}else{
						$(this).find('img').attr('src', srctxt.replace('_on_','_off_'));
					}
				});
				moving(idx);
			}
		});
		//set
		var settimes;
		function timeset(){		
		settimes = setInterval( timemove, 10000);
		}
		timeset();
		function timeStop(){			
			clearInterval(settimes);
		}
		function timemove(){
			dot.find('a').eq(cont).trigger('click');
			cont++;
			cont > li.length-1 ? cont = 0 : cont;		
		}
		dot.find('a:last').find('img').attr('src', dot.find('a:last').find('img').attr('src').replace('_play_','_stop_'));
		dot.find('a:last').find('img').attr('alt', dot.find('a:last').find('img').attr('alt').replace('시작','멈춤'));
		dot.find('a:last').on('click', function(e){
			e.preventDefault();
			var txt1 = $(this).find('img').attr('src');
			var srctxt = new String(txt1);
			var txt2 = $(this).find('img').attr('alt');
			var alttxt = new String(txt2);
			if( srctxt.match(/(play)/) ){				
				$(this).find('img').attr('src', srctxt.replace('_play_','_stop_'));
				$(this).find('img').attr('alt', alttxt.replace('시작','멈춤'));
				timeset();
			}else{
				stop();
			}
		});
		dot.find('a').on('mousedown', function(){
			checkfocus = true;
		});
		dot.find('a').on('focusin',function(){			
			if( !checkfocus ){
				stop();
			}
		});
		function stop(){			
			var txt1 = dot.find('a:last').find('img').attr('src');
			var srctxt = new String(txt1);
			var txt2 = dot.find('a:last').find('img').attr('alt');
			var alttxt = new String(txt2);
			dot.find('a:last').find('img').attr('src', srctxt.replace('_stop_','_play_'));
			dot.find('a:last').find('img').attr('alt', alttxt.replace('멈춤','시작'));
			timeStop();
		}
		function setleft(){
			li = $('.main_Top > .visual > li');
			li.each(function(i){				
				$(this).css('left', i*100+'%');				
			});
		}
		setleft();
		//! resize
		function moving(idx){
			li = $('.main_Top > .visual > li');			
			if( li.eq(0).data('li') !== idx ){
				var sel = li.filter(function(i){return $(this).data('li') === idx ;}).insertAfter(li.eq(0));
				sel.css('left', 100+'%');
				li.eq(0).stop().animate({
					'left': '-100%'
				},700,comp);					
				sel.stop().animate({
					'left': '0%'
				},700);				
			}else{				
				return false;
			}			
			function comp(){
				var fir = li.eq(0).appendTo(li.parent());				
				setleft();
				checkfocus = false;
			}
		}
	}
	//메인 상단 팝업배너 롤링
	if( $('.mainBanner').length > 0 ){
		var checkcookieBanner = m_getCookie('checkcookieBanner');		//쿠키 가져오기
		if( checkcookieBanner ){			
			$('.mainBanner').hide();
		}else{			
			if( $('.mainBanner > div.inbox > ul > li').length > 0 ){
				$('.mainBanner').show();
				var mainBanner = new BlockSlide( $('.mainBanner > div.inbox'),'_4.gif' );
			}	
			checkdays();		
		}		
	}
	function checkdays(){
		var cinput = $('.mainBanner > div.inbox > div.check > input#label_check');
		var closed = $('.mainBanner > div.inbox > div.check > a');
		
		closed.on('click', function(e){
			if( mainBanner.stopscroll ){
				mainBanner.stoproll();		
			}
			$(this).closest('.mainBanner').slideUp(250);
			$(this).closest('.mainBanner > div.inbox').slideUp(250);		
			if( cinput.attr('checked') ){				
				m_setCookie('checkcookieBanner', 'days', 1); //쿠키 저장함수
			}				
		});
		
	}
	//메인 팝업존롤링
	if( $('.slidePop').length > 0 ){
		$('.slidePop > div.slide > ul > li').css('float','left');
		var slidepop = new BlockSlide( $('.slidePop > div.slide'),'_2.gif' );
	}
	//메인 사회공헌소식
	if( $('.main_block2 > .inbox> .slideBlock').length > 0 ){		
		var scBlock = new SelectSlide( $('.main_block2 > .inbox> .slideBlock'),'_3.gif' );
	}
	//메인 홍보센터소식
	if( $('.main_block1 > .inbox> .slideBlock').length > 0 ){		
		var prBlock = new SelectSlide( $('.main_block1 > .inbox> .slideBlock'),'_1.gif' );
	}
	//고객센터 main 롤링
	//if( $('h1').text() === '고객센터' ){	
		var noticeBlock = new BlockSlide( $('.noticeBlock > .slide'),'.gif' );		
		var faqBlock = new BlockSlide( $('.faqBlock > .slide'),'.gif' );
	//}
	
	
	
});//endwindow

//////////////////////
//	samchully menu	//
//////////////////////
var scl = (function(parent, $){	
	parent.topOpen = function(e){	//gnb 열기
		var num = 0;		
		typeof e !== 'number' ? e.preventDefault() : num = e ;
		var $this = typeof e !== 'number' ? $(e.currentTarget) : $('div.gnb > ul > li').eq(num).find('>a');		
		$('div.gnb > ul > li > ul').hide();			
		$this.parent().find('>ul').slideDown(0);
		$('div.gnb > ul > li > a').removeClass('on');
		$this.addClass('on');		
	};
	parent.topClose = function( n ){		//gnb 닫기
		$('div.gnb > ul > li > ul').hide();
		$('div.gnb > ul > li > a').removeClass('on');
		n !== -1? $('div.gnb > ul > li').eq(n).find('>a').addClass('on') :$('div.gnb > ul > li >a').removeClass('on');
		
	};
	parent.location = function(){	//location 텍스트붙이기
		$('div.location > div.inBox').empty();
		$('div.location > div.inBox').append('<a href="/main.do">Home</a> &gt; ');
		var last, lo = [];		
		
		if( $('div#gotoMainContents').hasClass('noLnb') ){
			lo.push( $('div#gotoMainContents').find('>h1') );
		}else if( $('div.WrapService').length > 0 ){
			lo.push( $('div.visual').find('>h1') );
		}else{
			lo.push( $('div.leftArea > strong') );
			$('div.leftArea').find('a.sel').each(function(i){
				if($(this).closest('ul').is(':visible') || $(this).next().is(':visible') ){
					lo.push( $(this) );
				}				
			});
		}
		last = lo[lo.length-1];
		lo.pop();
		for(var i = 0; i<lo.length ; i++){
			if( $('div#gotoMainContents').hasClass('noLnb') || $('div.WrapService').length > 0 ){
				return false;
			}else{
				if( i === 0 ){					
					if( lo[i].text() === '고객센터' ){
						$('div.location > div.inBox').append('<a href="'+ $('ul.gnb_menuWr > li.gnb_menu01.other02 > a').attr('href') +'">'+lo[i].text()+'</a> &gt; ');
					}else{
						$('div.location > div.inBox').append('<a href="'+ $('div.leftArea').find('a:first').attr('href') +'">'+lo[i].text()+'</a> &gt; ');
					}					
				}else{
					if( lo[i].text() === '전기광명 역세권' ){						
						$('div.location > div.inBox').append('<a href="'+ $('a.tabCus2.sel').next().find('a:first').attr('href') +'">'+lo[i].text()+'</a> &gt; ');						
					}else if( lo[i].text() === '가스' ){
						$('div.location > div.inBox').append('<a href="'+ $('a.tabCus1.sel').next().find('a:first').attr('href') +'">'+lo[i].text()+'</a> &gt; ');	
					}else{
						$('div.location > div.inBox').append('<a href="'+lo[i].attr('href')+'">'+lo[i].text()+'</a> &gt; ');	
					}								
				}
			}
		}		
		$('div.location > div.inBox').append('<span>'+ last.text() +'</span>');
	};
	parent.leftOpen = function(e){	//lnb 열기,닫기
		var num = 0, target = false;
		typeof e !== 'number' ? e : num = e ;
		
		var $this = typeof e !== 'number' ? $(e.currentTarget) : $('div.leftArea > ul:visible').find('>li').eq(num).find('>a'),
			idx = $this.parent().index();			
		
		$('div.leftArea > ul:visible').find('>li').each(function(n){
			var $$this = $(this);
			if( idx === n ){
				$(this).find('>a').addClass('sel');
				$(this).find('ul').slideDown(300);
				if( typeof target === 'number'){
					$(this).closest('div').find('>ul').not(':eq('+target+')').find('a').removeClass('sel');		//left tab
					$(this).closest('div').find('>ul').not(':eq('+target+')').find('ul').hide();				//left tab
				}		
			}else{
				$(this).find('>a').removeClass('sel');
				$(this).find('ul').slideUp(300);
			}
		});		
	};	
	parent.menu = function(){
		//cnode topmenu의 고정 사이즈 7을  return i < 8 로 변경
		var topmenu = $('div.gnb > ul > li').filter(function(i){return i < 8; }),
			leftmenu = $('div.leftArea > ul > li');
		$('div.gnb > ul > li > ul').hide();
		$('div.gnb > ul > li').eq(0).find('>a').text().match(/[Company]/)?$('div.gnb > ul > li > ul').width(200):$('div.gnb > ul > li > ul').width(180);
		var depth1 = $('div.leftArea > strong').text(), view;
		// 1 DEPTH		
		$('div.gnb > ul > li').each(function(j){
			if( depth1.length > 0 ){
				if( $(this).find('>a').text().match( depth1 ) ){
					view = -1;
					if( depth1.match( /(고객센터)/ ) ){
						$(this).find('>a').removeClass('on');
					}else{
						$(this).find('>a').addClass('on');
						view = j;
					}				
				}else{
					$(this).find('>a').removeClass('on');				
				}
			}			
		});		
		//location
		parent.location();
		//click
		$('div.gnb > ul').height(41);
		var mousecheck = false;		
		topmenu.find('>a').on({
			'mousedown':function(e){
				mousecheck = true;
			},
			'mouseup':function(e){
				topmenu.find('>a').blur();
			},
			'mouseenter':function(e){			
				parent.topOpen(e);
				mousecheck = false;				
			},
			'focus':function(e){			
				if( !mousecheck ){
					parent.topOpen(e);				
				}
			}
		});
		$('div.gnb').parent().next().find('a:first').on('focus',function(){		
			parent.topClose(view);			
		});		
		$('div.gnb').on('mouseleave focus',function(){			
			parent.topClose(view);			
		});
		$('div.gnb').prev().on('focusin', function(){
			parent.topClose(view);			
		});
		//$('div.gnb > ul > li').filter(function(i){return i > 5; }).find('>a').on('mouseenter focusin', function(){
		//	parent.topClose(view);			
		//});
		
		// left
		var onElem = $('div.leftArea > ul > li').find(' > a.sel ').parent().index();
		if( $('div.leftArea > a').length > 1 ){
			$('div.leftArea > a').on('click focus', function(){
				$('div.leftArea > a').removeClass('sel');
				$('div.leftArea > ul').hide();
				$(this).addClass('sel');
				$(this).next().show();
			});			
			//onElem = $('div.leftArea > ul:visible > li ').find('a.sel:last').parent().index();			
		}		
		parent.leftOpen( onElem );
		leftmenu.find('>a').on('click focus', parent.leftOpen );
	};
	return parent;
}(scl || {}, jQuery));

//////////////////////
//	popup handling	//
//////////////////////
var poplayer = (function (parent, $) {
	parent.nine = function(){	//공시정보 관련규정팝업 , 채용사이트:입사지원가이드
		var ul = $('ul.tabType1.nine'),
			fr = $('iframe');
			
		ul.find('>li>a').on('click', function(e){
			e.preventDefault();
			var idx = $(this).parent().index();
			ul.find('>li').removeClass('sel');
			$(this).parent().addClass('sel');
			var txt = fr.attr('src');
			var srctxt = new String(txt);
			fr.attr('src', srctxt.replace( /[0-9]/, idx+1) );			
		});
		//채용사이트 팝업
		var cul = $('ul.ptabType1');
		cul.find('>li>a').on('click', function(e){
			e.preventDefault();
			var idx = $(this).parent().index();
			cul.find('>li').removeClass('sel');
			$(this).parent().addClass('sel');
			var txt = fr.attr('src');
			var srctxt = new String(txt);
			fr.attr('src', srctxt.replace( /[0-9]/, idx+1) );
		});
		
	};
	parent.energyRule = function(){	//열공급규정팝업
		var ul = $('ul.tabtype1'),
			fr = $('iframe');
			
		ul.find('>li>a').on('click', function(e){
			e.preventDefault();
			var idx = $(this).parent().index();
			ul.find('>li').removeClass('sel');
			$(this).parent().addClass('sel');
			var txt = fr.attr('src');
			var srctxt = new String( txt );
			if( srctxt.match(/(\d{2})[.]/) ){
				fr.attr('src', srctxt.replace( /(\d{2})[.]/, idx+1+'.' ) );
			}else{
				fr.attr('src', srctxt.replace( /(\d{1})[.]/, idx+1+'.' ) );
			}
		});			
	};
	parent.equip = function(){	//배관 납품정보 상세보기
		var addbtn = $('div.fLeft > a'),
			hid = $('div.equipDetail > table');
		addbtn.on('click', function(e){
			e.preventDefault();
			var srctxt = new String( $(this).find('img').attr('src') ),
				alttxt = new String( $(this).find('img').attr('alt') );
			hid.toggle();
			if(srctxt.match(/(open)/)){
				$(this).find('img').attr('src', srctxt.replace('_open_','_close_') );
				$(this).find('img').attr('alt', alttxt.replace('펼쳐보기','접어보기') );
			}else{
				$(this).find('img').attr('src', srctxt.replace('_close_','_open_') );
				$(this).find('img').attr('alt', alttxt.replace('접어보기','펼쳐보기') );
			}
		});
	};
	parent.preventInput = function( name ){		//사용시설 공급전안전점검 신청서 해당없음 선택시
		var patt = new RegExp( name );
		var checkBtn = $('h3').filter(function(i){
			var txt = new String(  $(this).text() );
			if( txt.match( patt ) ){
				return $(this);
			}
		}).find('>input');
		if( checkBtn.length === 0 ){
			checkBtn = $('h2').filter(function(i){
				var txt = new String(  $(this).text() );				
				if( txt.match( patt ) ){
					return $(this);
				}
			}).find('>input');
		}
		var tabl;		
		if( checkBtn.parent().next().is('table') ){
			tabl = checkBtn.parent().next();			
		}else if( checkBtn.parent().next().next().is('table') ){
			tabl = checkBtn.parent().next().next();			
		}
		if( tabl ){
			checkBtn.on('change', function(){
				var tabless = tabl.andSelf().siblings().filter(function(i){
					if( $(this).attr('summary') === tabl.attr('summary') ){
						return $(this);
					}
				});				
				if( '차. 전용정압기(조정기)'.match( patt ) ){ //name === '차. 전용정압기(조정기) 설치현황 (  해당없음 )' 
					var sec = tabless.next().next().next(),
						sectable = sec.andSelf().siblings().filter(function(i){
							if( $(this).attr('summary') === sec.attr('summary') ){
								return $(this);
							}
						}),
						third = sectable.next().next(), 
						four = third.next().next();
					if( $(this).is(':checked')){
						//1
						tabless.find('input').attr('disabled', true);
						tabless.find('select').attr('disabled', true);
						//2
						sectable.find('input').attr('disabled', true);
						sectable.find('select').attr('disabled', true);
						//3
						third.find('input').attr('disabled', true);
						third.find('select').attr('disabled', true);
						//4
						four.find('input').attr('disabled', true);
						four.find('select').attr('disabled', true);
					}else{
						tabless.find('input').attr('disabled', false);
						tabless.find('select').attr('disabled', false);
						sectable.find('input').attr('disabled', false);
						sectable.find('select').attr('disabled', false);
						third.find('input').attr('disabled', false);
						third.find('select').attr('disabled', false);
						four.find('input').attr('disabled', false);
						four.find('select').attr('disabled', false);
					}
					
				}else{
					if( $(this).is(':checked')){
						tabless.find('input').attr('disabled', true);
						tabless.find('select').attr('disabled', true);					
					}else{
						tabless.find('input').attr('disabled', false);
						tabless.find('select').attr('disabled', false);
					}
				}
			});
		}
	};
	parent.addline = function( btn ){		//사용시설 공급전안전점검 신청서 행형식 복사
		var tr = btn.next().find('tbody > tr').eq(0);
		var s_tr = tr.clone();		
		btn.find('a').eq(0).on('click', function(e){
			e.preventDefault();					
			if ( btn.next().find('tbody > tr').length > 19 || btn.prev().find('input').is(':checked')){
				return false;
			}else{				
				var tt = s_tr.clone().insertAfter( tr.parent().find('tr').last() );				
				tt.find('select').next().remove();
				tt.find('select').show();
				$(tt.find('select:visible')).sSelect();
				var idx = tt.parent().find('tr').length;
				if( !tt.find('td:eq(0)').hasClass('input') ){
					tt.find('td:eq(0)').text(idx);
				}
				parent.changetit();
			}			
		});
		btn.find('a').eq(1).on('click', function(e){
			e.preventDefault();
			var tr = $(this).parent().next().find('tbody > tr');
			if ( tr.length < 3 || btn.prev().find('input').is(':checked')){
				return false;
			}else{				
				tr.last().remove();
			}
		});
	};
	parent.addtable = function( name, classname ){	//사용시설 공급전안전점검 신청서 테이블형식복사
		var patt = new RegExp( name );
		var btn = $('div.btnBlock4').filter(function(i){
			var txt = new String(  $(this).prev().text() );
			if( txt.match( patt ) ){				
				return $(this);
			}
		});		
		var tabless = btn.next().andSelf().siblings().filter(function(i){
			if( $(this).find('caption').text() === btn.next().find('caption').text() ){
				return $(this);
			}
		});		
		tabless.addClass(classname);
		var t = btn.parent().find('.'+classname).eq(0).clone();		
		btn.find('a').eq(0).on('click', function(e){
			e.preventDefault();
			var table = $(this).parent().parent().find('.'+classname);			
			if ( table.length > 19 || btn.prev().find('input').is(':checked') || btn.siblings('h2').find('input').is(':checked')){
				return false;
			}else{				
				var tt = t.clone().insertAfter( table.last() );
				tt.find('select').next().remove();
				tt.find('select').show();
				$(tt.find('select:visible')).sSelect();
				var idx = table.length+1;
				if( tt.find('tbody > tr:eq(0)>th:eq(0)') ){
					tt.find('tbody > tr:eq(0)>th:eq(0)').text('NO.' + idx );
				}							
			}
		});
		btn.find('a').eq(1).on('click', function(e){
			e.preventDefault();
			var table = $(this).parent().next().siblings('.'+classname);				
			if ( table.length < 2 || btn.prev().find('input').is(':checked') || btn.siblings('h2').find('input').is(':checked') ){
				return false;
			}else{				
				table.last().remove();		
			}			
		});
	};
	
	parent.changetit = function(){		//사용시설 공급전안전점검 신청서 alt 값 바꾸기 page1_1:라.계량기현황page1_2:마.연소기현황
		var atable = $('h2').filter(function(){
			if( $(this).text() === '마. 연소기 현황' ){
				return $(this);
			}
		}).next().next();
		atable.find('tbody > tr').each(function(i){			
			$(this).find('td:eq(1)').find('input').on('change', function(){
				var atit = $(this).val(),				
					aip = $(this).closest('tr').find('td:gt(1)').find('input');					
				aip.each(function(j){
					var aretit = $(this).attr('title').split(' ');					
					if( j < 9 ){
						var txt = $(this).attr('title');
						var srctxt = new String( txt );
						$(this).attr('title', srctxt.replace( aretit[0],atit ) );
					}
				});				
			});
		});
		//
		var btable = $('div').filter(function(){
			if( $(this).attr('title') === '계량기 구분' ){
				return $(this);
			}
		});
		btable.next().find('li>a').on('click', function(){
			var tit =  $(this).text(),
				retit = $(this).closest('tr').find('input').attr('title').split(' '),
				aip = $(this).closest('tr').find('input');				
			aip.each(function(j){
				var aretit = $(this).attr('title').split(' ');				
				var txt = $(this).attr('title');
				var srctxt = new String( txt );
				$(this).attr('title', srctxt.replace( aretit[0],tit ) );				
			});	
			
		});
	};
	parent.all = function(){	//사용시설 공급전안전점검 신청서 1_5 page 일괄적합
		var checkBtn = $('h2').filter(function(i){
				if( $(this).text() === '타. 안전점검 결과표 (  일괄 적합 )' ){
					return $(this);
				}
			}).find('>input');
			
		checkBtn.on('change', function(){
			$(this).parent().siblings('table').find('select').next().find('ul > li >a').removeClass('select-list-selected');
			$(this).parent().siblings('table').find('select').next().find('ul > li:eq(1)>a').addClass('select-list-selected');
			$(this).parent().siblings('table').find('select').next().find('div>span').text('적합');
		});
	};	
	parent.init = function(){
		// wook 141208 $('.popup>h1').text() === '입사지원가이드' ---> $('.popup>h1').text().indexOf('입사지원가이드') !== -1 로 수정함.
		//if( $('.popup>h1').text().indexOf('공시정보 관련규정') !== -1 || $('.popup>h1').text().indexOf('입사지원가이드') !== -1  ){ 
		//	parent.nine();
		//}
		//if( $('.popup>h1').text() === '열공급규정' || $('.popup>h1').text() === '전기공급약관' ){	//12-17 추가
		//	parent.energyRule();
		//}
		if( $('body').hasClass('popup gongsi') || $('.popup>h1').text().indexOf('입사지원가이드') !== -1  ){ 
			parent.nine();
		}
		if( $('body').hasClass('popup elect') || $('body').hasClass('popup heat') ){	//12-17 추가
			parent.energyRule();
		}
		if( $('.popup>h1').text() === '배관 납품정보 상세보기' ){
			parent.equip();
		}
		if( $('div').hasClass('onlineWrap') ){	//안전점검 접수 온라인 신청 서식 등록 행추가/삭제
			//page1-1			
			var special = $('div').filter(function(){
				if( $(this).attr('title') === '특정구분' ){
					return $(this);
				}
			});
			special.next().find('li>a').on('click', function(){
				if( $(this).text() === '특정' ){
					special.parent().next().show();
				}else{
					special.parent().next().hide();
				}
			});
			var btn_page1 = $('h2').filter(function(i){
				if( $(this).text() === '라. 계량기 현황' ){
					return $(this);
				}
			}).next().next();		
			parent.addline( btn_page1 );
			//page1-2
			parent.changetit();			
			//page1-3			
			var btn_page3 = $('h3').filter(function(i){
				if( $(this).text() === '4) 동밸브 정보 (  해당없음 )' ){
					return $(this);
				}
			}).next();
			parent.addline( btn_page3 );
			//page1-4			
			var btn_page4 = $('h2').filter(function(i){
				if( $(this).text() === '자. 가스누출 자동차단장치 신규 설치현황 (  해당없음 )' ){
					return $(this);
				}
			}).next();
			parent.addline( btn_page4 );			
			//page1-5
			parent.all();			
			var pinput = ['업무','공동', // page 1_1
				'신규시설','철거시설', // page 1_2 
				'기본정보',' 밸브정보',' 퍼지밸브정보','동밸브 ', // page 1_3
				'자','전용정압기','카', // page 1_4
				'신규 배관','신규 계량기','철거 배관','철거 계량기']; // page 2
				
			$.each(pinput, function( k, v ){
				parent.preventInput(v);
			});
			var tableObj = {'신규시설':'new','철거시설':'old','기본정보':'valves1',' 밸브정보':'valves2',' 퍼지밸브정보':'valves3', //page 1_3
				'일반정보':'nomal'};//page1-4
			$.each(tableObj, function( j, v ){
				parent.addtable(j,v);
			});
		}		
	};
	
	return parent;
	
}(poplayer || {}, jQuery));

//////////////////////////////
//	가스공급신청 - 계량기	//
//////////////////////////////

var gas = (function(parent, $){		
	parent.used = $('table.tableType1:first > tbody > tr > td > a').filter(function(i){		//추가버튼
				if( $(this).text() === "추가" ){
					return $(this);
				}				
			});
	parent.d = $('table.tableType1 > tbody > tr > td > a').filter(function(i){		//삭제버튼
				if( $(this).text() === "삭제" ){
					return $(this);
				}				
			});
	parent.add = function(){	// 행추가
		$('div.btnBlock4 > a.btn.type5').on('click', function(e){
			//e.preventDefault();
			var $this = $(this).parent();
			var t = $this.next().find('tbody > tr:eq(0)').clone().appendTo( $this.next().find('tbody') );			
			//t.find('input').attr('value','');
			//add btn 
			parent.used.off('click');
			parent.used = $('table.tableType1:first > tbody > tr > td').filter(function(i){
				if( $(this).find('>a').text() === "추가" ){
					return $(this);
				}				
			});
			parent.used.on('click',usedadd);
			//del btn 
			parent.d = $('table.tableType1 > tbody > tr > td > a').filter(function(i){
				if( $(this).text() === "삭제" ){
					return $(this);
				}				
			});			
			parent.del(parent.d);
		});
		parent.used.on('click',usedadd);
		
		function usedadd(event){
			//event.preventDefault();
			var table = $('h3').filter( function(i){ 
					if( $(this).text() ==='4. 사용처 현황' ){
						return this;
					}
				} ).next();
			var tby = table.find('tbody > tr:first').clone().appendTo(table.find('tbody'));
			//del btn 
			parent.d = $('table.tableType1 > tbody > tr > td > a').filter(function(i){
				if( $(this).text() === "삭제" ){
					return $(this);
				}				
			});			
			parent.del(parent.d);
			//tby.find('input').attr('value','');			
		}
		
	};
	
	parent.del = function(d){		//행삭제
		d.off('click');		
		d.on('click', function(e){
			//e.preventDefault();
			var $this = $(this).closest('tr');			
			if( $this.parent().find('>tr').length > 1 ){
				$this.remove();				
			}else{
				$this.find('input').attr('value','');
			}
		});
	};
	parent.apply = function(){	//실행
		if( $('div.btnBlock4').prev().text() === '3. 계량기 현황'){
			parent.add();
			parent.del(parent.d);
		}
	};
	
	return parent;
}(gas || {}, jQuery));

//////////////////////////
//	요금청구서 보는법 	//
//////////////////////////
var viewReceipt = (function(parent, $){
	parent.toggleimg = function(elem){//../../img/service/num2_1_off.png
		var stxt = elem.attr('src');		
		var srctxt = new String( stxt );
		stxt.substring(stxt.lastIndexOf('_'), stxt.lastIndexOf('.')) === '_on'? elem.attr('src', srctxt.replace('_on.','_off.')) : elem.attr('src', srctxt.replace('_off.','_on.'));		
	};
	parent.moving = function(){	
		var div = $('div.designForBill_1');
		if( div.length < 1 ){
			div = $('div.designForBill_2');
		}
		var countBtn = div.find('a').filter(function(i){return i > (div.find('a').length-3);}),
		count = 0;
		var btn = div.find('a').filter(function(i){return i < (div.find('a').length-2);});
		btn.on('click', function(e){
			e.preventDefault();
			var n = $(this).index();
			btn.each(function(i){				
				if( i !== n ){
					var txt = $(this).find('img').attr('src');
					var srctxt = new String( txt );
					$(this).find('img').attr('src', srctxt.replace('_on.','_off.') );
				}
			});
			count = n;
			div.next().find('>li').hide();
			div.next().find('>li').eq(n).show();
			parent.toggleimg( $(this).find('>img') );
		});
		
		countBtn.on('click', function(e){
			e.preventDefault();
			if( $(this).hasClass('prev') ){
				count--;
				count < 0 ? count = div.find('a').length-3 : count;
			}else{
				count++;
				count > div.find('a').length-3 ? count = 0: count;			
			}
			btn.eq(count).trigger('click');
		});
		btn.eq(0).trigger('click');
	};
	
	return parent;
}( viewReceipt || {}, jQuery ));

//////////////////////
//	공사현황관리	//
//////////////////////
var report = (function(parent, $){
	var btnblock = $('div.btnBlock4');
	
	parent.addtable = function( name, classname, tn ){	//테이블복사
		var btn = btnblock.filter(function(i){
			if( $(this).prev().text() === name ){
				return $(this);
			}
		});
		btn.next().addClass(classname );
		var t = btn.parent().find('.'+classname).clone();		
		btn.find('a').eq(0).on('click', function(e){
			//e.preventDefault();
			var table = $(this).parent().parent().find('.'+classname);			
			if ( table.length > tn ){
				return false;
			}else{				
				var tt = t.clone().insertAfter( table.last() );
				tt.find('select').next().remove();
				tt.find('select').show();
				$(tt.find('select:visible')).sSelect();
			}			
		});
		btn.find('a').eq(1).on('click', function(e){
			//e.preventDefault();
			var table = $(this).parent().next().siblings('.'+classname);				
			if ( table.length < 1 ){
				return false;
			}else{				
				table.last().remove();		
			}			
		});
	};
	parent.addline = function( name, classname, x, dn ){	//행복사
		var btn = btnblock.filter(function(i){
			if( $(this).prev().text() === name ){
				return $(this);
			}
		});
		btn.next().addClass(classname);
		var tr = btn.parent().find('.'+classname).find('tbody > tr').eq(x);
		var s_tr = tr.clone();		
		btn.find('a').eq(0).on('click', function(e){			
			//e.preventDefault();			
			if ( btn.next().find('tbody > tr').length > 9 ){
				return false;
			}else{				
				var tt = s_tr.clone().insertAfter( tr.parent().find('tr').last() );				
				tt.find('select').next().remove();
				tt.find('select').show();
				$(tt.find('select:visible')).sSelect();
			}			
		});
		btn.find('a').eq(1).on('click', function(e){
			//e.preventDefault();
			var tr = $(this).parent().parent().find('.'+classname).find('tbody > tr');
			if ( tr.length < dn ){
				return false;
			}else{				
				tr.last().remove();
			}
		});
	};
	parent.init = function(){	//실행
		parent.addtable('시공자','contractor',3);
		parent.addtable('배관','plumbing',9);
		parent.addtable('밸브','valve',9);
		parent.addline('정압기','governor',0,2);
		parent.addline('전기방식','electric',0,2);
		parent.addline('현장조직도','organization',3,5);
		parent.addline('기타서류 (공사공정표, 착공전 사진, 특정공사신고서, 단구간착공계, 기타서류 등)','etc',0,2);		
	};
	
	return parent;
}( report || {}, jQuery));


//////////////////////////
//	홍보센터 - 역사관	//
//////////////////////////
function sHistory(){
	var list = $('ul.tabType_his > li > a'),
		gallery = $('div.GalleryBlock');
	
	function galleryslide( data ){
		var arrow = gallery.find('div.Gallery_slide > a'),
			inbox = gallery.find('div.Gallery_slide > div.inbox > ul > li > a');
		var tit = gallery.find('div.Gallery_view > div.inbox > dl > dt'),
			day = gallery.find('div.Gallery_view > div.inbox > dl > dd.date > span'),
			txt = gallery.find('div.Gallery_view > div.inbox > dl > dd:last');
		
		inbox.off('click');
		inbox.on('click', function(e){
			e.preventDefault();
			inbox.parent().removeClass('sel');
			$(this).parent().addClass('sel');
			var gsrc = new String( $(this).find('img').attr('src') );
			gallery.find('div.Gallery_view > div.inbox > img').attr('src', gsrc );
			var idx = $(this).parent().index();
			tit.text( data.find('block>box').eq(idx).attr('title') );
			day.text( data.find('block>box').eq(idx).attr('date') );
			txt.text( data.find('block>box').eq(idx).attr('text') );			
		});
		var count = 0;
		arrow.off('click');
		arrow.on('click', function(e){
			e.preventDefault();
			if( $(this).hasClass('prev') ){
				count--;
				count < 0  ? count = 0 : count;
			}else{
				count++;				
				count > inbox.parent().length -5  ? count = inbox.parent().length -5 : count;
			}			
			gallerymove( count );			
		});
		function gallerymove(n){
			var thumb = gallery.find('div.Gallery_slide > div.inbox > ul > li:first').width() + 2; //margin			
			gallery.find('div.Gallery_slide > div.inbox > ul').stop().animate({
				'margin-left': -thumb*n +'px'
			},200);
		}
		
		//처음 로드
		gallery.find('div.Gallery_slide > div.inbox > ul > li:first > a').trigger('click');
		gallerymove(0);
	}
	
	function getdata(){
		var sciptlink = $('script').eq(0).attr('src'),
			links = sciptlink.substring(0, sciptlink.lastIndexOf('/'));
		
		$.when( $.ajax( links+'/history.xml' ) ).done(function ( data ) {		
	    	var item = $(data).find('item');
	    	start(item);
		}).fail(function( jqXHR, textStatus, error ) {
			//alert('xml파일확인해주세요');
		});
		
		function start( data ){
			list.on('click', function(e){
				e.preventDefault();
				var idx = $(this).parent().index();	
				list.parent().removeClass('sel');
				$(this).parent().addClass('sel');		
				$('div[id^=hisBlock]').hide();
				$('div[id=hisBlock_'+(idx+1)+']').show();
			
				data.each(function(i){
					if( i === (list.parent().length-1)-idx ){						
						slidehtml( $(this) );
						galleryslide( $(this) );						
					}
				});
				
			});
			function slidehtml( elem ){
				gallery.find('div.Gallery_slide > div.inbox > ul').empty();
				elem.find('thumb > i').each(function(k){					
					gallery.find('div.Gallery_slide > div.inbox > ul').append(
						'<li><a href="#">'+
						'<img src="'+ $(this).attr('src') +'" alt="">'+
						'</a><img src="/assets/img/history_img/img_dim_1.png" alt="" class="dim"></li>'
					);					
				});				
			}
			galleryslide( data.last() );
		}
		
	}
	if( $('ul.tabType_his').length > 0 ){
		getdata();
	}
	
};



/** popup load - layer, window
 * @param  event
 * @param {string} id
 */
function layerload( event, id ){
	var $btn = $((event.currentTarget) ? event.currentTarget : event.srcElement),	
		div = $('div.LayerPopup'+(id?'#'+id:''));
	if( div !== undefined ){		
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false; 
		div.show();
		
		$('body').prepend('<img src="/assets/img/common/bg_dim_1.png" alt="" class="dim">');
		div.css({
			top: '50%',
			marginTop : parseInt((div.height()/2)*-1)+'px'
		});
	}
	
	var close = div.find('div.pHeader > a');	//x버튼
	close.focus();
	
	div.find('div.btnBlock3 > a').on('click', function( e ){	
		if( $(this).hasClass('close') ){		//닫기, 취소
			e.preventDefault();
			div.hide();
			$('img.dim').remove();
			$btn.focus();
		}
	});
	close.on('click', function( e ){
		e.preventDefault();
		div.hide();
		$('img.dim').remove();
		$btn.focus();
	});
}

/** window popup open
 * @param {string} url
 * @param {number} width
 * @param {number} height
 * @param {string} scroll 'yes' or 'no'
 */
function popupView( url, width, height, scroll ){	
	var pop = window.open( url ,'','width='+width+',height='+height+',toolbar=0,resizable=0,scrollbars='+scroll );
	
	$(pop).load(function(){
		scroll === 'no'? $(pop.document).find('html').css('overflow-y','hidden') : $(pop.document).find('html').css('overflow-y','scroll');
		/*
		if( parseInt(window.screen.height) < 768 ){
			if( $(pop.document).find('html').css('overflow-y') !== 'scroll' ){
				$(pop.document).find('body').css('overflow-y','scroll');
			}			
			pop.resizeBy( 0, -50 );			
		}
		*/		
	});
}

/* 2019-03-12 추가 (앞에 000 제거 로직) */
$('input[name=caNumber]').blur(function() {
	$(this).val($(this).val().replace(/(^0+)/,''));
});

/** 납부자관리목록 - 행추가 
 * 
 */
function rowbtn(event, csFlag){
	var $btn = $((event.currentTarget) ? event.currentTarget : event.srcElement);
	var t = $btn.closest('table').clone().removeClass('noline').appendTo('td.intable');
	var txt = t.find('a:eq(0)').find('img').attr('src');
	var srctxt = new String( txt );
	var s = srctxt.replace('_add_3.', '_del_3.');
		
	//12-05 개발추가
	t.find('input[name=csFlag]').val(csFlag);
	t.find('input[name=isChecked]').val('N');
	t.find('input[name=caNumber]').val('');
	t.find('input[name=name]').val('');
	t.find('select[name=relation] option:eq(0)').attr('selected' , 'selected');
	
	t.find('input[name=isChecked]').removeAttr('readonly');
	/* 2019-03-12 수정 (앞에 000 제거 로직)
	t.find('input[name=caNumber]').removeAttr('readonly');
	*/
	t.find('input[name=caNumber]').removeAttr('readonly').blur(function() {
		$(this).val($(this).val().replace(/(^0+)/,''));
	});
	t.find('input[name=name]').removeAttr('readonly');
	t.find('.btn').show();
	
	t.find('a:eq(0)').remove();
	$('<a href="javascript:void(0)" onclick="rowbtnDelete(event)"><img src='+ s +' alt="행삭제"></a>').appendTo(t.find('td.c.line'));
	
	$('.formSelect').resetSS();
}
//납부자관리목록 - 행삭제
function rowbtnDelete(event){
	var $btn = $((event.currentTarget) ? event.currentTarget : event.srcElement);
	$btn.closest('table').remove();
}

/** 파일 - 행추가
 *  
 */
function addFileBtn(event){
	var $btn = $((event.currentTarget) ? event.currentTarget : event.srcElement);
	var div = $btn.closest('div');
	var txt = div.find('>a').find('img').attr('src');//1	
	var srctxt = new String( txt );
	var src = srctxt.replace('_add_3.', '_del_3.');	
	
	if( div.parent().is('td.input2') ){		
		var d = div.clone().insertAfter( div.parent().find('>div').last() );
		d.prepend('<div class="Vspace5"></div>');		
		d.find('a.btns').remove();
		if( div.find('select').length > 0 ){
			d.find('select').next().remove();
			d.find('select').show();
			$(d.find('select:visible')).sSelect();			
		}
		if( Browser.ie7 ){
			$('<a href="javascript:void(0)" class="btns" style="margin-left:2px;" onclick="deleteFileBtn(event)"><img src="/assets/img/common/btn_del_3.gif" alt="행삭제"></a>').appendTo( d );
		}else{
			$('<a href="javascript:void(0)" class="btns" onclick="deleteFileBtn(event)"><img src="/assets/img/common/btn_del_3.gif" alt="행삭제"></a>').appendTo( d );			
		}
	}
	
}
//행삭제
function deleteFileBtn(event){
	var $btn = $((event.currentTarget) ? event.currentTarget : event.srcElement);	
	$btn.closest('div').remove();	
}

/** 인증방식
 * 
 */
function inputSelect(event){
	var $btn = $((event.currentTarget) ? event.currentTarget : event.srcElement);
	$btn.closest('td.input').find('input').prop('checked', false );
	$btn.prop('checked', true );
	
	var text = $btn.next().text().substring(0,3);
	
	$btn.closest('tbody').find('>tr').filter(function(i){ return i >1; }).hide();	
	$btn.closest('tbody').find('>tr').filter(function(i){
		if( $(this).find('>th').text().substring(0,3) === text ){
			return $(this);
		}
	}).show();	
} 

/**
 * loader
 */
function loadingGif(){
	var link = $('link').eq(0).attr('href'),
		links = link.substring(0, link.lastIndexOf('/')-3);			//경로 
	$('body').append('<div class="dim"></div>');
	$('div.dim').css({ 'background' :'url("'+ links +'img/common/bg_dim_1.png")'});
	$('body').append('<div class="loader" style="position:absolute; left:50%; top:50%; width:35px; height:35px;"><img src="'+ links +'img/common/sam-loader.gif" alt="loading" /></div>');
}
//remove
function removeGif(){
	$('div.dim').remove();
	$('div.loader').remove();
}

/** 
 * 홍보센터 포커스 이동
 */
function movefocus() {	
	function pr(){			//홍보센터 포커스 이동 depth1:홍보센터 - depth2:홍보영상
		var list = $('div#gotoMainContents> ul[class^=thumListType] > li > a');
		//var div = $('div#gotoMainContents > div.videoBlock');
		var div = $('div#gotoMainContents > div#bigInfo');		
		list.on('click', function(e){
			//e.preventDefault();
			list.parent().removeClass('sel');
			$(this).parent().addClass('sel');
			div.attr('tabindex','0').focus();
		});
		div.on('blur', function(e){
			$(this).removeAttr('tabindex');
		});
	};
	
	if( $('div#gotoMainContents > div.videoBlock').length > 0){
		pr();
	}
}
/**
 * 사회공헌 갤러리 상세 포커스이동
 */
function socialmovefocus() {	
	function pr(){			
		var list = $('div#gotoMainContents> div.thumListType6 > ul> li > a');		
		list.on('click', function(e){			
			list.removeClass('sel');
			$(this).addClass('sel');			
		});		
	};	
	if( $('div#gotoMainContents > div.thumListType6').length > 0){
		pr();		
	}
}

/**
 * 가로롤링
 */
function BlockSlide( elem, filename ){
	this.div = elem;
	//this.btn = btn;
	var parent = this;
	function makedot( p , filename ){
		if( p.next().hasClass('btns') ){
			p.next().remove();			
		}else if( p.hasClass('inbox') ){//메인상단배너
			if( p.find('ul').next().hasClass('btns') ){
				p.find('ul').next().remove();				
			}			
		}		
		var src;
		if( $('.header').next().find('img:first').length > 0 ){
			src = $('.header').next().find('img:first').attr('src');
		}else{
			src = $('.header').next().next().find('img:first').attr('src');
		}
		var srctxt = new String( src );
		var localsrc = srctxt.substring( 0,srctxt.lastIndexOf('/') );
		
		if( p.hasClass('inbox') ){	//메인상단배너
			parent.btn = $('<div class="btns"></div>').insertAfter( p.find('.check').prev() );
		}else{
			parent.btn = $('<div class="btns"></div>').insertAfter( p );
		}
		var len = p.find('ul>li').length;
		var alts = p.find('ul>li');		
		if( len > 1 ){
			for ( var i = 0 ; i < len ; i++){
				if( parent.btn ){
					if( i === 0 ){
						if( alts.eq(i).find('a').text().match(/\S/) !== null ){
							$('<a href="#" style="margin-left:3px;"><img src="'+ localsrc +'/btn_on'+ filename + '" alt="'+alts.eq(i).find('a').text()+' 선택"></a>').appendTo( parent.btn );	
						}else{
							$('<a href="#" style="margin-left:3px;"><img src="'+ localsrc +'/btn_on'+ filename + '" alt="'+alts.eq(i).find('img').attr('alt')+' 선택"></a>').appendTo( parent.btn );	
						}											
					}else{
						if( alts.eq(i).find('a').text().match(/\S/) !== null ){
							$('<a href="#" style="margin-left:3px;"><img src="'+ localsrc +'/btn_off'+ filename + '" alt="'+alts.eq(i).find('a').text()+' 선택"></a>').appendTo( parent.btn );
						}else{
							$('<a href="#" style="margin-left:3px;"><img src="'+ localsrc +'/btn_off'+ filename + '" alt="'+alts.eq(i).find('img').attr('alt')+' 선택"></a>').appendTo( parent.btn );
						}
					}
				}
			}
			if( p.parent().hasClass('business') ){
				$('<a href="#" style="margin-left:3px;"><img src="'+ localsrc +'/btn_stop_1'+ filename + '" alt="자동롤링 멈춤"></a>').appendTo( parent.btn );
			}else{
				$('<a href="#" style="margin-left:3px;"><img src="'+ localsrc +'/btn_stop'+ filename + '" alt="자동롤링 멈춤"></a>').appendTo( parent.btn );
			}
			
		}	
	}	
	makedot( this.div , filename );
	
	if( this.btn.find('a').length > 1 ){
		this.roll();
	}	
}
BlockSlide.prototype.roll = function(){
	var parent = this,
		ul = parent.div.find('ul'),
		lilen = ul.find('li').length,
		dot = parent.btn.find('a').filter(function(i){ return i < lilen; }),
		stop = parent.btn.find('a:last'),
		liwid = ul.find('li').outerWidth(true);
		
		ul.find('li').each(function(i){
			$(this).data('li',i);
		});
	
	var li2st = ul.find('li').not(":first").find('>a'), keyCheck = false;
	
	function move(n){
		li2st.show();
		if( ul.find('li').eq(0).data('li') !== n ){
			ul.find('li').filter(function(i){return $(this).data('li') === n ;}).insertAfter(ul.find('li').eq(0));
			ul.find('li').eq(0).stop().animate({
				marginLeft: -liwid+'px'
			},500,function(){
				ul.find('li').eq(0).appendTo(ul);
				ul.find('li').filter(function(i){return $(this).css('margin-left') === -liwid+'px'; }).css('margin-left','');	
				//focus				
				li2st = ul.find('li').not(":first").find('>a');
				li2st.show();				
				if( keyCheck ){
					ul.find('li').eq(0).find('>a').focus();
					li2st.hide();									
					keyCheck = false;
				}				
			});					
		}else{
			if( keyCheck ){
				ul.find('li').eq(0).find('>a').focus();				
				li2st = ul.find('li').not(":first").find('>a');
				li2st.hide();				
				keyCheck = false;									
			}
			return false;
		}
	}	
	var imgtoggle = {		
		on: function( img ){
			var srctxt = img.attr('src');
			var src = new String( srctxt );			
			src.substring(src.lastIndexOf('/'), src.lastIndexOf('.')).match(/(\d)/) ? img.attr('src', src.replace('_off_','_on_')) : img.attr('src', src.replace('_off.','_on.'));
		},
		off:function( img ){
			var srctxt = img.attr('src');
			var src = new String( srctxt );			
			src.substring(src.lastIndexOf('/'), src.lastIndexOf('.')).match(/(\d)/) ? img.attr('src', src.replace('_on_','_off_')) : img.attr('src', src.replace('_on.','_off.'));
		},
		play:function( img ){
			var srctxt = img.attr('src');
			var src = new String( srctxt );			
			src.substring(src.lastIndexOf('/'), src.lastIndexOf('.')).match(/(\d)/) ? img.attr('src', src.replace('_play_','_stop_')) : img.attr('src', src.replace('_play.','_stop.'));
		},
		stop:function( img ){
			var srctxt = img.attr('src');
			var src = new String( srctxt );			
			src.substring(src.lastIndexOf('/'), src.lastIndexOf('.')).match(/(\d)/) ? img.attr('src', src.replace('_stop_','_play_')) : img.attr('src', src.replace('_stop.','_play.'));
		}
	};	
	var cont = 0;
	dot.on('click', function(e){
		e.preventDefault();		
		var idx = $(this).index();
		if( ul.find('li').eq(0).is(':animated') ){
			return false;
		}else{
			move(idx);
			cont = idx;		
			imgtoggle.off(dot.find('img'));
			imgtoggle.on($(this).find('img'));	
		}
	});		
	
	ul.find('li>a').on('focusin', function(){
		var idx = $(this).parent().data('li');
		if( $(this).parent().filter(':animated').length > 0 ){
			$(this).parent().next().find('>a').focus();
			idx = $(this).parent().next().data('li');			
		}		
		imgtoggle.off(dot.find('img'));
		imgtoggle.on(dot.eq(idx).find('img'));
		ul.find('li>a').filter(':hidden').show();
		rollingstop();
	});	
	dot.on('keydown', function(e){		
		if( e.keyCode === 13 ){
			keyCheck = true;
		}		
	});		
	function rollingstop(){
		stop.find('img').attr('alt','자동롤링 시작');
		imgtoggle.stop(stop.find('img'));
		rollStop();		
	}
	//timeset
	var rollTime; 	
	stop.on('click', function(e){
		e.preventDefault();		
		if($(this).find('img').attr('alt') === '자동롤링 멈춤'){
			rollingstop();
		}else{
			$(this).find('img').attr('alt','자동롤링 멈춤');
			imgtoggle.play(stop.find('img'));
			rollset();
		}		
	});
	function rollset(){		
		rollTime = setInterval( rollmove, 5000);
	}
	rollset();
	function rollStop(){
		clearInterval(rollTime);
	}
	function rollmove(){
		dot.eq(cont).trigger('click');
		cont++;
		cont > lilen-1 ? cont = 0 : cont;		
	}	
	parent.stoproll = function(){
		rollingstop();		
	};
};

/**
 * 가로 페이드인아웃 롤링
 */
function SelectSlide( elem, filename ){
	this.div = elem;
	//this.btn = btn;
	var parent = this;
	function makedot( p , filename ){
		if( p.find('ul').next().hasClass('btns') ){
			p.find('ul').next().remove();
		}		
		var src;
		if( $('.header').next().find('img:first').length > 0 ){
			src = $('.header').next().find('img:first').attr('src');
		}else{
			src = $('.header').next().next().find('img:first').attr('src');
		}
		var srctxt = new String( src );
		var localsrc = srctxt.substring( 0,srctxt.lastIndexOf('/') );
		
		parent.btn = $('<div class="btns"></div>').insertAfter( p.find('ul') );
		var len = p.find('ul>li').length;
		var alts = p.find('ul>li');
		if( len > 1 ){
			for ( var i = 0 ; i < len ; i++){
				if( parent.btn ){
					if( i === 0 ){
						$('<a href="#" style="margin-left:4px;"><img src="'+ localsrc +'/btn_on'+ filename + '" alt="'+alts.eq(i).find('a > .subject').text()+' 선택"></a>').appendTo( parent.btn );
					}else{
						$('<a href="#" style="margin-left:4px;"><img src="'+ localsrc +'/btn_off'+ filename + '" alt="'+alts.eq(i).find('a > .subject').text()+' 선택"></a>').appendTo( parent.btn );
					}
				}
			}			
		}		
	}	
	makedot( this.div , filename );	
	if( this.btn.find('a').length > 1 ){
		this.roll();
	}	
}
SelectSlide.prototype.roll = function(){
	var parent = this,
		ul = parent.div.find('ul'),
		lilen = ul.find('li').length,
		dot = parent.btn.find('a').filter(function(i){ return i < lilen; });		
		ul.find('li').each(function(i){
			$(this).data('li',i);
		});	
	ul.find('li').css('position','absolute');
	var keyCheck = false;	
	function move(n){		
		ul.find('li').each(function(i){
			if( i === n ){
				$(this).fadeIn(300);
				if( keyCheck ){
					$(this).find('>a').focus();	
					keyCheck = false;
				}				
			}else{
				$(this).fadeOut(300);
			}
		});
	}	
	var imgtoggle = {		
		on: function( img ){
			var srctxt = img.attr('src');
			var src = new String( srctxt );			
			img.attr('src', src.replace('_off_','_on_'));
		},
		off:function( img ){
			var srctxt = img.attr('src');
			var src = new String( srctxt );			
			img.attr('src', src.replace('_on_','_off_'));
		}
	};		
	dot.on('click', function(e){
		e.preventDefault();		
		var idx = $(this).index();		
		move(idx);		
		imgtoggle.off(dot.find('img'));
		imgtoggle.on($(this).find('img'));		
	});
	ul.find('li>a').on('focusin', function(){
		var idx = $(this).parent().data('li');			
		imgtoggle.off(dot.find('img'));
		imgtoggle.on(dot.eq(idx).find('img'));
		ul.find('li>a').filter(':hidden').show();		
	});	
	dot.on('keydown', function(e){
		if( e.keyCode === 13 ){
			keyCheck = true;
		}
	});
	
};

//글자수 초기화
$('#counterCheck').html('0 / 4000Byte');

//글자수 입력 카운터
function chkMsgLength(intMax,objMsg,st) {
	 var length = lengthMsg(objMsg.value);
	 
	 $('#counterCheck').html(length+' / '+intMax+'Byte'); //현재 byte수를 넣는다
	 
	 if (length > intMax) {
	    alert("최대 " + intMax + "Byte이므로 초과된 글자수는 자동으로 삭제됩니다.\n");
	    objMsg.value = objMsg.value.replace(/\r\n$/, "");
	    objMsg.value = assertMsg(intMax,objMsg.value,st );
	   }
	}
	//charAt(i)함수
	//-> 해당함수의 인자로 보낸 숫자의 위치에 있는 문자를 반환한다.
	//-->ex)objMsg.charAt(i); //objMsg라는 문자열 중에서 i의 숫자 위치에 있는 문자 하나를 반환한다.

	//escape(ch)함수
	//-> 해당함수의 인자로 보낸 문자가 어떤 형식인지를 알아낼수있다.
	//
	// A   A
	// a   a
	// ?   %3F
	// ㄱ  %u3131
	// 음  %uC74C
	//
	// 위와 같이 바꿔주기때문에 .lenth가 4보다 크면 한글로 간주된다.
	function lengthMsg(objMsg) {
	 var nbytes = 0;
	 for (i=0; i<objMsg.length; i++) {
		  var ch = objMsg.charAt(i);
		  if(escape(ch).length > 4) { // 한글일경우
		     nbytes += 2;
		  } else if (ch == '\n') { // 줄바꿈일경우
		    if (objMsg.charAt(i-1) != '\r') { // 하지만 밀려서 줄이 바뀐경우가 아닐때
		       nbytes += 1;
		      }
		  } else if (ch == '<' || ch == '>') { // 특수문자는 4byte
		    nbytes += 4;
		  } else { //나머지는 모두 1byte
		    nbytes += 1;
		  }
	 }
	 return nbytes;
	}

	function assertMsg(intMax,objMsg,st ) {
	 var inc = 0;
	 var nbytes = 0;
	 var msg = "";

	 var msglen = objMsg.length;
	 for (i=0; i<msglen; i++) {
		  var ch = objMsg.charAt(i);
		  if (escape(ch).length > 4) {
		     inc = 2;
		  } else if (ch == '\n') {
		    if (objMsg.charAt(i-1) != '\r') {
		       inc = 1;
		    }
		  } else if (ch == '<' || ch == '>') {
		    inc = 4;
		  } else {
		    inc = 1;
		  }
		  if ((nbytes + inc) > intMax) {
		     break;
		  }
		  nbytes += inc;
		  msg += ch;
	 }
	 $('#counterCheck').html(nbytes+' / '+intMax+'Byte'); //현재 byte수를 넣는다
	 return msg;
	}
	
//팝업 게시기간 로직
/**
* Time 스트링을 Date 객체로 변환
* parameter time: Time 형식의 String
* return : Date object
*/
function toTimeObject(time) { //parseTime(time)
    var year  = time.substr(0,4);
    var month = time.substr(4,2) - 1; // 1월=0,12월=11
    var day   = time.substr(6,2);
    var hour  = time.substr(8,2);
    var min   = time.substr(10,2);
 
    return new Date(year,month,day,hour,min);
}
 
/**
* Time이 현재시각 이후인지 체크
* parameter time: Time 형식의 String
* return : true/false
*/
function isFutureTime(time) {
    return (toTimeObject(time) > new Date());
}
 
/**
* Time이 현재시각 이전인지 체크
* parameter time: Time 형식의 String
* return : true/false
*/
function isPastTime(time) {
    return (toTimeObject(time) < new Date());
}

//사옥이전 팝업
function compPopupTimeChk(stime, etime){
	 stime = '202006260000';
	 etime = '999907210000';
	 if(isPastTime(stime) && isFutureTime(etime)){
	  popupView("/popup/popup_building.html", 617, 822, "no");
	 }
}
//인입배관 공사주체 변경안내팝업
function compPopupTimeChk2(stime, etime){
	 stime = '202006260000';
	 etime = '202106010000';
	 if(isPastTime(stime) && isFutureTime(etime)){
	  popupView("/popup/popup_building2.html", 680, 450, "no");
	 }
}
//분기입회 팝업
function safetyPopupTimeChk(stime, etime){
	 stime = '202006260000';
	 etime = '999907210000';
	 if(isPastTime(stime) && isFutureTime(etime)){
	  popupView("/popup/popup_safety.html", 600, 200, "no");
	 }
}
//메인화면 팝업
function popupTimeChk(stime, etime){
	 stime = '202212120000';
	 etime = '202402010000';
	 if(isPastTime(stime) && isFutureTime(etime)){
	  popupView("/popup/popup_main.html", 775, 400, "no");
	 }
}

function popupTimeChk2(stime, etime){
	 stime = '202004030000';
	 etime = '202304010000';
	 if(isPastTime(stime) && isFutureTime(etime)){
	  popupView("/popup/popup_main2.html", 650, 720, "no");
	 }
}
function popupTimeChk3(stime, etime){
	 stime = '202303071700';
	 etime = '202303072140';
	 if(isPastTime(stime) && isFutureTime(etime)){
	  popupView("/popup/popup_noti2.html", 300, 300, "no");
	 }
}