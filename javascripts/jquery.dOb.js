/**
* My dOb Plugin
* 
* @Date 	20131119
* @Author 	ShawnWu
* @Version 	release v1.4.20131130
* @License 	under the MIT License
**/
jQuery.fn.dOb = function(opts) {
	
	opts = jQuery.extend({
		from_Y: 1911,	//from year
		to_Y: 10,		//to year
		digi: 2			//display digits
	}, opts);
	
	var myBirthDate = function() {
		
		//initiate parameter
		var _T = new Date(), _Y = $("#dOb_Y"), _M = $("#dOb_M"), _D = $("#dOb_D"), _YMD = $("#dOb_Y, #dOb_M, #dOb_D"),
			def_Y = _Y.val(), def_M = _M.val(), def_D = _D.val(), option = "<option></option>";
		
		_YMD.children().remove();
		
		_year(); _month(); _day(1); _YMD.change(_day);
		
		function _year() {		//Years - from_Y to to_Y
			if( !$.isNumeric(def_Y) ) _Y.append( $(option).attr({"value": def_Y, "selected": true}).text(def_Y) );
			for(var i=_T.getFullYear()-opts.to_Y; i>=opts.from_Y; i--) {
				if( i == def_Y ) _Y.append( $(option).attr({"value": i, "selected": true}).text(_0ize(i, opts.digi)) );
				else _Y.append( $(option).attr("value", i).text(_0ize(i, opts.digi)) );
			}
		}
		
		function _month() {		//Months - 1 to 12 months
			if( !$.isNumeric(def_M) ) _M.append( $(option).attr({"value": def_M, "selected": true}).text(def_M) );
			for(var i=1; i<=12; i++) {
				if( i == def_M ) _M.append( $(option).attr({"value": i, "selected": true}).text(_0ize(i, opts.digi)) );
				else _M.append( $(option).attr("value", i).text(_0ize(i, opts.digi)) );
			}
		}
		
		function _day(dd) {		//Days - days of the year and month
			var def_YD = !$.isNumeric(_Y.val()) ? 1982 : _Y.val(), def_MD = !$.isNumeric(_M.val()) ? 3 : _M.val(),
				dateTime = new Date(def_YD, def_MD, 0), dd = dd == 1 ? 1 : 0;
			
			if(dd) if( !$.isNumeric(def_D) ) _D.append( $(option).attr({"value": def_D, "selected": true}).text(def_D) );
			
			//remove days of the month
			_D.children().each(function(){ if($(this).val() > dateTime.getDate()) $(this).remove(); });
			
			//insert days of the month
			for(var i=1; i<=dateTime.getDate(); i++) {
				if(!_D.children("option[value='"+i+"']").length) {
					if( i == def_D ) _D.append( $(option).attr({"value": i, "selected": true}).text(_0ize(i, opts.digi)) );
					else _D.append( $(option).attr("value", i).text(_0ize(i, opts.digi)) );
				}
			}
		}
	}
	
	//pad zero
	function _0ize(str, length) {
		var strLen = str.toString().length;
		return length > strLen ? new Array(length - strLen + 1).join("0") + str : str;
	}
	
	myBirthDate();
}
