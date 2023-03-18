
/*****************************************
	selectBox : select box plugin

	Stylish Select 0.4.1 - $ plugin to replace a select drop down box with a stylable unordered list
	http://github.com/sko77sun/Stylish-Select

	Requires: jQuery 1.3 or newer
	Contributions from Justin Beasley: http://www.harvest.org/ & Anatoly Ressin: http://www.artazor.lv/
	Dual licensed under the MIT and GPL licenses.

*****************************************/

/**
 * custom, add : wddo (Jo Yun Ki), ddoeng@naver.com
 * comment : Thankyou to sko77sun
 * 
 * $(obj).sSelect({options});
 * 
 * public
 * 	options
 * 		defaultText		: default text
 * 		listMaxHeight	: ul max height
 * 		listWidth		: ul width
 * 		isTop			: ul top align
 * 		
 * 		obj.setDisable(boolean)	: disable selectbox
 * 		obj.resetSS()			: change select apply
 * 		obj.getSetSSValue(value): get value, return index
 **/

(function($){
	//add class to html tag
	$('html').addClass('stylish-select');

	//create cross-browser indexOf
	Array.prototype.indexOf = function (obj, start) {
		for (var i = (start || 0); i < this.length; i++) {
			if (this[i] == obj) {
				return i;
			}
		}
	}

	//utility methods
	$.fn.extend({
		getSetSSValue: function(value){
			if (value){
				//set value and trigger change event
				$(this).val(value).change();
				return this;
			} else {
				return $(this).find(':selected').val();
			}
		},
		//added by Justin Beasley
		resetSS: function(){
			var oldOpts = $(this).data('ssOpts');
			$this = $(this);
			$this.css('display', '').next().remove();
			
			//unbind all events and redraw
			$this.unbind('.sSelect').sSelect(oldOpts);
		},
		//added by wddo
		setDisable: function(value) {
			if (typeof value === 'boolean') {
				var $input = $(this),
					$containerDiv = $input.next(),
					$containerDivText = $containerDiv.children().eq(0),
					$newUl = $containerDiv.children().eq(1);
					$newLi = $newUl.children();
				
				if (value) {
					if ($input.attr('disabled') === undefined) $input.attr('disabled', 'disabled');
					$containerDivText.addClass('disable');
					$containerDiv[0].tabIndex = -1;
				} else {
					if ($input.attr('disabled') !== undefined) $input.removeAttr('disabled');
					$containerDivText.removeClass('disable');
					$containerDiv[0].tabIndex = 0;
				}
			}
		}
	});

	$.fn.sSelect = function(options) {

		return this.each(function(){

		var defaults = {
			defaultText: '', //custom 2013-06-13 @wddo : default text change
			animationSpeed: 0, //set speed of dropdown
			listMaxHeight: '140px', //set css max-height value of dropdown //fix 140px custom 2012-10-10 @wddo
			containerClass: '', //additional classes for container div
			containerStyle: '', //add 2012-09-27 @wddo : copy style
			isTop: false //add 2013-06-13 @wddo : public set UL list align top
		};

		//initial variables

		var opts = $.extend(defaults, options),
		$input = $(this);
		if($input.attr('style') != undefined){opts.containerStyle = $input.attr('style');} //custom 2012-09-27 @wddo : copy style 
		var $containerDivText = $('<div title="' + $input.attr('title') + '" class="selected-headline" style="' + opts.containerStyle + '"></div>'), //custom 2012-09-27 @wddo : copy style
		$containerDiv = $('<div style="' + opts.containerStyle + '" class="select-list-box ' + opts.containerClass + '"></div>'), //custom 2012-09-27 @wddo : copy style
		$newUl = $('<ul class="select-list" style="visibility:hidden;' + opts.containerStyle + '"></ul>'),
		itemIndex = -1,
		currentIndex = -1,
		keys = [],
		prevKey = false,
		prevented = false,
		$newLi;

		//added by Justin Beasley
		$(this).data('ssOpts',options);

		//build new list
		$containerDiv.insertAfter($input);
		$containerDiv.attr("tabindex", $input.attr("tabindex") || "0");
		//$containerDiv.css("width",opts.listWidth+"px");
		$containerDivText.prependTo($containerDiv);
		$newUl.appendTo($containerDiv);
		$input.hide();
		
		//@wddo write layout :	select($input)
		//						div($containerDiv)	- div($containerDivText)
		//											- ul($newUl) - li($newLi)

		//added by Justin Beasley (used for lists initialized while hidden)
		$containerDivText.data('ssReRender',!$containerDivText.is(':visible'));

			//test for optgroup
			if ($input.children('optgroup').length == 0){
				$input.children().each(function(i){
					var option = $(this).html();
					var key = $(this).val();

					//add first letter of each word to array
					keys.push(option.charAt(0).toLowerCase());
					if ($(this).attr('selected') == true){
						opts.defaultText = option;
						currentIndex = i;
					}
					$newUl.append($('<li><a href="JavaScript:void(0);">'+option+'</a></li>').data('key', key));

				});
				//cache list items object
				$newLi = $newUl.children().children();

			} else { //optgroup
				$input.children('optgroup').each(function(){

					var optionTitle = $(this).attr('label'),
					$optGroup = $('<li class="select-list-option-title">'+optionTitle+'</li>');

					$optGroup.appendTo($newUl);

					var $optGroupList = $('<ul></ul>');

					$optGroupList.appendTo($optGroup);

					$(this).children().each(function(){
						++itemIndex;
						var option = $(this).html();
						var key = $(this).val();
						//add first letter of each word to array
						keys.push(option.charAt(0).toLowerCase());
						if ($(this).attr('selected') == true){
							opts.defaultText = option;
							currentIndex = itemIndex;did
						}
						$optGroupList.append($('<li><a href="JavaScript:void(0);">'+option+'</a></li>').data('key',key));
					})
				});
				//cache list items object
				$newLi = $newUl.find('ul li a');
			}

			//get heights of new elements for use later
			var newUlHeight = $newUl.height(),
			containerHeight = $containerDiv.height(),
			newLiLength = $newLi.length;

			//custom 2012-10-25 @wddo : default index 0 LI selected
			if (newLiLength != 0 && opts.defaultText === ''){
				//option tag, if selected attribute
				itemIndex = $input.find('> option').filter(':selected').index();
								
				currentIndex = itemIndex;
			}

			//check if a value is selected
			if (currentIndex != -1){
				navigateList(currentIndex, true);
			} else {
				//set placeholder text
				$containerDivText.html('<span style="margin:0 0 0 10px;">' + opts.defaultText + '</span>');
			}

			//decide if to place the new list above or below the drop-down
			function newUlPos(){
				var containerPosY = $containerDiv.offset().top,
				docHeight = jQuery(window).height(),
				scrollTop = jQuery(window).scrollTop();

				//if height of list is greater then max height, set list height to max height value
				if (newUlHeight > parseInt(opts.listMaxHeight)) {
					newUlHeight = parseInt(opts.listMaxHeight);
				}

				containerPosY = containerPosY-scrollTop;
				if (containerPosY+newUlHeight >= docHeight || opts.isTop){
					$newUl.css({
						top: '-'+newUlHeight-1+'px',
						width : opts.listWidth-2+'px',
						height: newUlHeight
					});
					$input.onTop = true;
				} else {
					$newUl.css({
						top: containerHeight-1+'px',
						width : opts.listWidth-2+'px',
						height: newUlHeight
					});
					$input.onTop = false;
				}
			}

			//add 2012-11-13 @wddo : if !ie outline none 
			if(typeof document.attachEvent === 'undefined'){
				$containerDiv.css('outline-style', 'none');
				$newLi.css('outline-style', 'none');
			}

			//run function on page load
			newUlPos();

			//run function on browser window resize
			$(window).bind('resize.sSelect scroll.sSelect', newUlPos);

			//positioning
			function positionFix(){
				$containerDiv.css('position','relative');
			}

			function positionHideFix(){
				$containerDiv.css('position','static');
			}

			$containerDivText.bind('click.sSelect',function(event){
				if(getDisabled())return;

				event.stopPropagation();

				//added by Justin Beasley
				if($(this).data('ssReRender')) {
					newUlHeight = $newUl.height('').height();
					containerHeight = $containerDiv.height();
					$(this).data('ssReRender',false);
					newUlPos();
				}

				//hide all menus apart from this one
				$('.select-list').not($(this).next()).hide()
					.parent()
						.css('position', 'static');
						//.removeClass('select-list-selfocus'); //custom 2012-10-18 @wddo : ie7 list scrolling error

				//show/hide this menu
				$newUl.toggle();
				positionFix();
				//scroll list to selected item
				$newLi.eq(currentIndex).focus();

			});

			$newLi.bind('click.sSelect',function(e){
				if(getDisabled())return;

				var $clickedLi = $(e.target);

				//update counter
				currentIndex = $newLi.index($clickedLi);

				//remove all hilites, then add hilite to selected item
				prevented = true;
				navigateList(currentIndex);
				$newUl.hide();
				$containerDiv.css('position','static');//ie
			});

			$newLi.bind('mouseenter.sSelect',
				function(e) {
					var $hoveredLi = $(e.target);
					$newLi.removeClass('select-list-selected'); //custom 2013-05-28 @wddo : reset selected effect
					$hoveredLi.addClass('select-list-hover');
				}
			).bind('mouseleave.sSelect',
				function(e) {
					var $hoveredLi = $(e.target);
					$hoveredLi.removeClass('select-list-hover');
				}
			);

			function navigateList(currentIndex, init){
				$newLi.removeClass('select-list-hover'); //custom 2013-05-28 @wddo : reset hover effect
				
				$newLi.removeClass('select-list-selected')
				.eq(currentIndex)
				.addClass('select-list-selected');

				if ($newUl.is(':visible')){
					//$newLi.eq(currentIndex).focus(); //custom 2013-05-28 @wddo : IE bug
				}

				var text = $newLi.eq(currentIndex).html();
				var val = $newLi.eq(currentIndex).parent().data('key');

				//add @wddo 2013-03-25 // option if value 'http://' -> siblings A tag attribute href change
				if ($input.find('> option').eq(currentIndex).attr('value').slice(0, 7) === 'http://') {
					$input.siblings('a').attr('href', $input.find('> option').eq(currentIndex).attr('value'));
				}

				//page load
				if (init == true){
					$input.val(val);
					$containerDivText.html('<span style="margin:0 0 0 10px;">' + text + '</span>');
					return false;
				}

				try {
					$input.val(val)
				} catch(ex) {
					// handle ie6 exception
					$input[0].selectedIndex = currentIndex;
				}
								
				$input.change();
				$containerDivText.html('<span style="margin:0 0 0 10px;">' + text + '</span>');
			}

			$input.bind('change.sSelect',function(event){
				if(getDisabled())return;

				$targetInput = $(event.target);
				//stop change function from firing
				if (prevented == true){
					prevented = false;
					return false;
				}
				$currentOpt = $targetInput.find(':selected');

				currentIndex = $targetInput.find('option').index($currentOpt);

				navigateList(currentIndex, true);
			});

			//handle up and down keys
			function keyPress(element) {
				//when keys are pressed
				$(element).unbind('keydown.sSelect').bind('keydown.sSelect',function(e){
					var keycode = e.which;

					//prevent change function from firing
					prevented = true;

					switch(keycode) {
						case 9: //tab
							//add 2013-05-28 @wddo : list close
							$('.select-list').not($(this).next()).hide()
								.parent()
									.css('position', 'static');
							break;
						case 40: //down
							//add 2013-05-28 @wddo : keyborad open
							if (e.altKey) {
								$containerDivText.trigger('click');
								break;
							} 
						case 39: //right
							incrementList();
							return false;
							break;
						case 38: //up
							//add 2013-05-28 @wddo : keyborad open							
							if (e.altKey) {
								$containerDivText.trigger('click');
								break;
							}
						case 37: //left
							decrementList();
							return false;
							break;
						case 33: //page up
						case 36: //home
							gotoFirst();
							return false;
							break;
						case 34: //page down
						case 35: //end
							gotoLast();
							return false;
							break;
						case 13:
						case 27:
							$newUl.hide();
							positionHideFix();
							return false;
							break;
					}

					//check for keyboard shortcuts
					keyPressed = String.fromCharCode(keycode).toLowerCase();

					var currentKeyIndex = keys.indexOf(keyPressed);

					if (typeof currentKeyIndex != 'undefined') { //if key code found in array
						++currentIndex;
						currentIndex = keys.indexOf(keyPressed, currentIndex); //search array from current index
						if (currentIndex == -1 || currentIndex == null || prevKey != keyPressed) currentIndex = keys.indexOf(keyPressed); //if no entry was found or new key pressed search from start of array

						navigateList(currentIndex);
						//store last key pressed
						prevKey = keyPressed;
						return false;
					}
				});
			}

			function incrementList(){
				if (currentIndex < (newLiLength-1)) {
					++currentIndex;
					navigateList(currentIndex);
					$newLi.eq(currentIndex).focus(); //add 2013-06-13 @wddo : up&down keyboard to list scrollbar
				}
			}

			function decrementList(){
				if (currentIndex > 0) {
					--currentIndex;
					navigateList(currentIndex);
					$newLi.eq(currentIndex).focus(); //add 2013-06-13 @wddo : up&down keyboard to list scrollbar
				}
			}

			function gotoFirst(){
				currentIndex = 0;
				navigateList(currentIndex);
			}

			function gotoLast(){
				currentIndex = newLiLength-1;
				navigateList(currentIndex);
			}

			//add 2012-11-13 @wddo
			function getDisabled(){
				var value = ($input.attr('disabled') !== undefined) ? true : false;

				return value;
			}
			
			$containerDiv.bind('click.sSelect',function(e){
				if(getDisabled())return;
				e.stopPropagation();
				keyPress(this);
			});

			$containerDiv.bind('focus.sSelect mouseover.sSelect',function(){ //custom 2013-03-12 @wddo : xhtml by add mouseover
				if(getDisabled())return;
				if(typeof document.attachEvent === 'undefined')$containerDivText.addClass('select-list-selfocus'); //custom 2012-10-18 @wddo : ie7 list scrolling error
				keyPress(this);
			});

			$containerDiv.bind('blur.sSelect mouseout.sSelect',function(){ //custom 2013-03-12 @wddo : xhtml by add mouseout
				if(getDisabled())return;
				if(typeof document.attachEvent === 'undefined')$containerDivText.removeClass('select-list-selfocus'); //custom 2012-10-18 @wddo : ie7 list scrolling error
			});

			//hide list on blur
			$(document).bind('click.sSelect',function(){
				if(typeof document.attachEvent === 'undefined')$containerDivText.removeClass('select-list-selfocus'); //custom 2012-10-18 @wddo : ie7 list scrolling error
				$newUl.hide();
				positionHideFix();
			});

			//add classes on hover
			$containerDivText.bind('mouseenter.sSelect',
				function(e) {
					var $hoveredTxt = $(e.target);
					//$hoveredTxt.parent().addClass('select-list-selhover');
				}
			).bind('mouseleave.sSelect',
				function(e) {
					var $hoveredTxt = $(e.target);
					//$hoveredTxt.parent().removeClass('select-list-selhover');
				}
			);

			//reset left property and hide
			$newUl.css({
				left: '0',
				display: 'none',
				visibility: 'visible'
			});

			//add 2012-11-13 @wddo : add disabled attribute 
			if (getDisabled()) {
				$input.setDisable(true);
			}
		});
	};

})(jQuery);