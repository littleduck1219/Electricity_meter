/**
 * 쿠키 저장
 */
function setCookie(name, value, expiredays){ //쿠키 저장함수
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";" ;
}

/**
 * 쿠키 가져오기
 */
function getCookie(Name) {
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

/**
 * 텍스트 길이 체크
 * param : sId - 체크할 값의 아이디
 * 			iLen - 길이값
 * return  : boolen
 */
function chkTextLength(sId, iLen){
	var sTxt = document.getElementById(sId).value;
  	if(sTxt.length > iLen){
  		alert(iLen+"자 이상 입력할 수 없습니다.");
  		return false;
  	}
}

/*
 * 필수값 체크
 * param : sId - 체크할 값의 아이디
 * 		   sNm - 체크값명
 * return  : boolen
 */

function chkEssentialVal(sId, sNm){
	var sTxt = document.getElementById(sId).value;
	
	if(sTxt == ""){
		alert(sNm+"은(는) 필수 입력항목입니다.");
		return false;
	}
}
  
/**
 * 숫자값 체크
 * param : sId - 체크할 값의 아이디
 * return  : boolen
 * 
 */
function chkNumberVal(sTxt){
	var num_check = /^[0-9.]*$/;
	
	if(sTxt == ""){
		return false;
	}else{
		if(!num_check.test(sTxt)){
   			return false;
   		}
	}
	
	return true;
}

/**
 * zerofill
 * @param number
 * @param width
 * @returns
 */
function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

/*
 * 영문자 체크
 * param : sVal - 체크할 값
 * return  : boolen
 * 
 */
function chkEnglishVal(sVal){
	var eng_check = /^[A-za-z]/g;
	
	if(sVal){
		return false;
	}else{
		if(!eng_check.test(sTxt)){
			alert("영문자만 입력가능합니다.");
			return false;
		}
	}
	return true;
}

/**
 * 한글 체크
 * param : sVal - 체크할 값
 * return  : boolen
 * 
 */
function chkKoreanVal(sVal){
	var kor_check = /([^가-힣ㄱ-ㅎㅏ-ㅣ\x20])/i;
	
	if(sVal){
		return false;
	}else{
		if(kor_check.test(sVal)){
			alert("한글만 입력가능합니다.");
			return false;
		}
	}
	
	return true;
}

/*
 * 이메일형식체크
 * param : sVal - 채크할 메일값 (완전한 메일 주소, ex> aaaa@naver.com)
 * return  : boolen
 * 
 */
function chkEmailVal(sVal){
	//var main_check =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 
	var main_check =/^[a-zA-Z0-9+-\_.]+@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 
	if(!main_check.test(sVal)){
		return false;
	}
	return true;
}


/**
 * 회원가입시 아이디 체크
 * 영소문자, 숫자만 허용
 * 4~12자 허용
 * param : sTxt - 체크할 값의 아이디
 * return  : boolen
 * 
 */
function chkMemberId(sTxt)
{
	var id_check = /[^a-z|^0-9]/gi;
	
	if(sTxt == ""){
		return false;
	}
	if(sTxt.length < 4){
		return false;
	}
	if(sTxt.length > 12){
		return false;
	}
	if(id_check.test(sTxt)){
		return false;
	}
	
	return true;
}

/**
 * 회원가입시 비밀번호 체크
 * 영대소문자, 숫자, 특수문자(@,!#)만 허용
 * 8자리 이상 허용
 * param : sId - 체크할 값의 아이디
 * return  : boolen
 */
function chkMemberpw(sTxt){
	
	var pattern1 = /[0-9]/; // 숫자 
    var pattern2 = /[a-zA-Z]/; // 문자 
    var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자 
    
    if(!pattern1.test(sTxt) || !pattern2.test(sTxt) || !pattern3.test(sTxt) || sTxt.length < 8 || sTxt == "") { 
         return false; 
    } else { 
        return true; 
    } 
}

/**
 * 입력된 숫자를 ,를 넣어서 돌려준다.
 * param : iNum - 바꿀 숫자값
 * return : 11,111 형태
 * 사용 예시 : numberFormat(11111);
 */
function numberFormat(iNum){
    var sNum = String(iNum);
    var reg = /(\-?\d+)(\d{3})($|\.\d+)/;
    if(reg.test(sNum)){
        return sNum.replace(reg, function(str, p1,p2,p3){
                return numberFormat(p1) + "," + p2 + "" + p3;
            }    
        );
    }else{
        return sNum;
    }
}

function removeComma(val)
{
	return val.replace(/,/g , '');
}

/**
 * 본래는 정수에 대해서만 목적으로 하였으나 chkNumberVal이 소수점을 허용하므로 float으로 계산
 * @param val
 * @returns
 */
function toInt(val)
{
	if( val == undefined 
			|| val == '')
		return 0;
	
	return parseFloat(removeComma(val));
}

/**
 * 커서 포커스 이동
 * maxlength만큼 작성시 자동으로 다음 인풋박스로
 * param : sID - 현재 위치, sNextID - 다음 이동할 곳
 * 사용 예시 : onkeypress="fncKeyNext('현재 인풋박스 아이디','다음 이동할 인풋박스 아이디');" 
 */  
function fncKeyNext(sID, sNextID) {
	var maxlen = document.getElementById(sID).getAttribute("maxlength");
	var len = document.getElementById(sID).value.length;
	if ( len != null && len != 'undefined' && len >0) {
		if ( len >= maxlen) {
			document.getElementById(sNextID).focus();
		}
	}
}  

/** 
 * sns 공유하기
 * param : sTarget - 공유할 소셜, sUri - 공유할 페이지 주소, sDsc - 트윗에 넣을 메시지 
 */
function sendToSns(sTarget) {
	var sUri = location.href;
	var site_nm = "samchully";
	
	switch (sTarget) {
	case 'twitter':
		window.open('http://twitter.com/share?url=' + encodeURIComponent(sUri), site_nm, 'width=600 height=380');
		break;
	case 'facebook':
		$( 'meta[name="url"]' ).attr( 'content' , sUri);
		$( 'meta[name="title"]' ).attr( 'content' , $("#gotoMainContents > h1").text());
		$( 'meta[name="desc"]' ).attr( 'content'  , $("#gotoMainContents .desPage").text());
		
		window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(sUri), site_nm,'resizable=no width=600 height=300');
		break;
	case 'google':
		window.open('https://plus.google.com/share?url=' + encodeURIComponent(sUri), site_nm,'resizable=no width=600 height=600');
		break;
	}
} 

/** 
 * sns 공유하기(팝업창)
 * param : sTarget - 공유할 소셜, sUri - 공유할 페이지 주소, sDsc - 트윗에 넣을 메시지 
 */
function sendToSnsPop(sTarget) {
	var sUri = location.href;
	var site_nm = "samchully";
	
	switch (sTarget) {
	case 'twitter':
		window.open('http://twitter.com/share?url=' + encodeURIComponent(sUri), site_nm, 'width=600 height=380');
		break;
	case 'facebook':
		$( 'meta[name="url"]' ).attr( 'content' , sUri);
		$( 'meta[name="title"]' ).attr( 'content' , $("h1").text());
		$( 'meta[name="desc"]' ).attr( 'content'  , $(".map_con .tableType2>caption").text());
		
		window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(sUri), site_nm,'resizable=no width=600 height=300');
		break;
	case 'google':
		window.open('https://plus.google.com/share?url=' + encodeURIComponent(sUri), site_nm,'resizable=no width=600 height=600');
		break;
	}
}

/** 
 * 경고창
 * param : str - 알려줄 문구, fos - 해당 아이디 , frm - 해당 form name
 */
function doError(str , fos , frm)
{
	alert(str);
	eval('document.forms.' + frm + '.' + fos + '.focus();');
	return;
}

function doError2(str , fos , idx , frm)
{
	alert(str);
	eval('document.forms.' + frm + '.' + fos + '[' + idx + '].focus();');
	return;
}

/** 
 * 목록 돌아가기
 * param : pg 
 */
function goList(pg)
{	
	var f = document.forms.listForm;
	
	if( pg != undefined && !isNaN(pg) )
		f.pg.value = pg;
	
	f.submit();
}

/** 
 * 검색
 */
function goSearch()
{
	var f = document.forms.sform;
	
	if( f.findStr.value != '' && f.findStr.value.length < 2 ) return doError('검색어는 2자 이상 입력해주십시오.' , 'findStr' , 'sform');
	
	f.submit();
}
 
/**
 * 글자 바이트 수 체크
 * param : sVal - 체크할 텍스트, iLen - 허용하는 문자길이(Maxlength)
 * maxlength 속성값이 없을 경우
 */
function chkTxtByte2(sID, iLen){
	var sTxt = document.getElementById(sID).value;
	//var iLen = sTxt.length;
	var totLen = 0;
	
	for (var i = 0; i < sTxt.length; i++) {
        if (escape(sTxt.charAt(i)).length == 6) {
        	totLen++;
        }
        totLen++;
    }
//	alert(totLen);
	if(totLen > iLen){
		alert("입력할 수 있는 문자 수를 초과했습니다.");
		return false;
	}
	
	return true;
}

/**
 * 입력값에 대한 바이트수 CHECK (단수 True/False 결과 Return) 
 * @param  sTxt 		체크할  텍스트
 * @param  iLen			입력가능 최대 바이트수
 * @return True/False	결과값
 **/
function chkTxtByteForValue(sTxt, iLen){
	var totLen = 0;
	
	for (var i = 0; i < sTxt.length; i++) {
        if (escape(sTxt.charAt(i)).length == 6) {
        	totLen++;
        }
        totLen++;
    }

	if(totLen > iLen){
		return false;
	}
	
	return true;
}

/**
 * 사업자등록번호 체크
 * @param bizID
 * @returns {Boolean}
 */
function chkBizID(bizID) 
{ 
    // bizID는 숫자만 10자리로 해서 문자열로 넘긴다. 
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1); 
    var tmpBizID, i, chkSum=0, c2, remander; 
     bizID = bizID.replace(/-/gi,'');

     for (i=0; i<=7; i++) chkSum += checkID[i] * bizID.charAt(i); 
     c2 = "0" + (checkID[8] * bizID.charAt(8)); 
     c2 = c2.substring(c2.length - 2, c2.length); 
     chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1)); 
     remander = (10 - (chkSum % 10)) % 10 ; 

    if (Math.floor(bizID.charAt(9)) == remander) return true ; // OK! 
      return false; 
} 

/**
 * 입력된 데이타에 대해서 자리수마다 ,를 찍어준다.
 * @param x
 * @returns
 */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 본인인증 모듈
 */
function checkPlusAuth(){
	window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
	document.checkPlusForm.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
	document.checkPlusForm.target = 'popupChk';
	document.checkPlusForm.submit();
}

/**
 * 아이핀 인증 모듈
 */
function ipinAuth(){
	window.open('', 'popupIPIN2', 'width=450, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
	document.ipinForm.action = "https://cert.vno.co.kr/ipin.cb";
	document.ipinForm.target = 'popupIPIN2';
	document.ipinForm.submit();
}

/**
 * 이메일을 셋팅한다.
 * @param obj
 */
function setEmail(obj , target)
{
	if( target == undefined 
			|| target == '' )
		target = 'email2';
	
	var val = $('option:selected' , obj).val();
	
	( val != '' ) ?
		$('input[name=' + target + ']').val(val) : $('input[name=' + target + ']').val('');
}

/**
 * 지역본부 새창
 */
function openLocalHeader()
{
	popupView('/popup/common/localHeader.do',850,350,'yes');
}

/**
 * 고객센터 새창
 */
function openCenterList()
{
	popupView('/popup/customer/center.do',700,550,'yes');
}

/**
 * 팝뱅크 팝업
 * @param caNumber
 */
function openPopBank(caNumber)
{
	popupView('/customer/bill/popBank.do?caNumber=' + caNumber,480,600,'yes');
}

/**
 * 카드 팝업
 * @param caNumber
 */
function openCard(caNumber)
{
	//popupView('/customer/bill/card.do?caNumber=' + caNumber,480,600,'yes');
	var pop = window.open( '/customer/bill/card.do?caNumber=' + caNumber ,'cardPopup','width=480,height=600,toolbar=0,resizable=0,scrollbars=yes' );
	$(pop).load(function(){
		$(pop.document).find('html').css('overflow-y','scroll');
	});
}

/**
 * 납부자 번호를 가지고 이동
 * @param obj
 */
function goWithCaNumber()
{
	var findCaNumber = $('select[name=findCaNumber] option:selected').val();
	location.href = '?findCaNumber=' + findCaNumber;
}

function goCommonSearch()
{
	var f = document.forms.commonSearchForm;
	
	if( f.findStr.value == '' || f.findStr.value.length < 2 ) return doError('검색어는 2자 이상 입력해주세요.' , 'findStr' , 'sform');
	
	f.submit();
}

/**
 * 윤리경영 문의유형선택.
 * @param obj
 */
function setType(obj)
{
	if( obj == undefined 
			|| obj == '' )
		return;
	
	var val = $('option:selected' , obj).val();
	
	if(val == "typeA" || val == "typeB"){
		$('input').prop("disabled", false);
		$('textarea').prop("disabled", false);
		$("select[name=tel1]").prop("disabled",false);
		$("select[name=mail3]").prop("disabled",false);
		$('.selected-headline[title="전화번호 첫번째자리"]').css("background-color", "#ffffff");
		$('.selected-headline[title="이메일 공급자 직접선택"]').css("background-color", "#ffffff");
		
		
		$('#typeC_Link').css("display", "none");
		$('#typeD_Link').css("display", "none");
		
	} else {
		//입력창 비활성화
		$('input').val('');
		$('input').prop("disabled", true);
		$('textarea').val('');
		$('textarea').prop("disabled", true);
		$("select[name=tel1]").prop("disabled",true);
		$("select[name=mail3]").prop("disabled",true);
		$('.selected-headline[title="전화번호 첫번째자리"]').css("background-color", "#fafafa");
		$('.selected-headline[title="이메일 공급자 직접선택"]').css("background-color", "#fafafa");
		
		if(val == "typeC"){
			$('#typeD_Link').css("display", "none");
			$('#typeC_Link').css("display", "");
		} else {
			$('#typeC_Link').css("display", "none");
			$('#typeD_Link').css("display", "");
		}
		
	}

	
}
