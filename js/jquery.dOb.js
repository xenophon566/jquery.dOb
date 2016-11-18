/**
 * My dOb Plugin
 *
 * @Date    20131119
 * @Author  ShawnWu
 * @Version     release v1.5.20161118
 * @License     under the MIT License
 **/
jQuery.fn.dOb = function(opts) {

    opts = jQuery.extend({
        dOb_Y: '#dOb_Y', // element year
        dOb_M: '#dOb_M', // element month
        dOb_D: '#dOb_D', // element day
        from_Y: 1911, // from year
        to_Y: 2013, // to year
        isPadding: true // is padding zero
    }, opts);

    var myBirthDate = function() {

        // initiate parameter
        var _T = new Date(),
            _Y = $(opts.dOb_Y),
            _M = $(opts.dOb_M),
            _D = $(opts.dOb_D),
            _YMD = $(opts.dOb_Y, opts.dOb_M, opts.dOb_D),
            def_Y = _Y.val(),
            def_M = _M.val(),
            def_D = _D.val(),
            option = "<option></option>";

        _YMD.children().remove();

        _year();
        _month();
        _day(1);
        _YMD.change(_day);

        function _year() { // Years - from_Y to to_Y
            if (!$.isNumeric(def_Y)) _Y.append($(option).attr({ "value": def_Y, "selected": true }).text(def_Y));
            for (var i = opts.to_Y; i >= opts.from_Y; i--) {
                if (i == def_Y) _Y.append($(option).attr({ "value": i, "selected": true }).text(i));
                else _Y.append($(option).attr("value", i).text(i));
            }
        }

        function _month() { // Months - 1 to 12 months
            if (!$.isNumeric(def_M)) _M.append($(option).attr({ "value": def_M, "selected": true }).text(def_M));
            for (var i = 1; i <= 12; i++) {
                var MM = opts.isPadding ? ('0' + i).slice(-2) : ('' + i);
                if (i == def_M) _M.append($(option).attr({ "value": i, "selected": true }).text(MM));
                else _M.append($(option).attr("value", i).text(MM));
            }
        }

        function _day(dd) { // Days - days of the year and month
            var def_YD = !$.isNumeric(_Y.val()) ? 1982 : _Y.val(),
                def_MD = !$.isNumeric(_M.val()) ? 3 : _M.val(),
                dateTime = new Date(def_YD, def_MD, 0),
                D = dd == 1 ? 1 : 0;

            if (D && !$.isNumeric(def_D))
                _D.append($(option).attr({ "value": def_D, "selected": true }).text(def_D));

            // remove days of the month
            _D.children().each(function() {
                if ($(this).val() > dateTime.getDate()) $(this).remove();
            });

            // insert days of the month
            for (var i = 1; i <= dateTime.getDate(); i++) {
                if (!_D.children("option[value='" + i + "']").length) {
                    var DD = opts.isPadding ? ('0' + i).slice(-2) : ('' + i);
                    if (i == def_D) _D.append($(option).attr({ "value": i, "selected": true }).text(DD));
                    else _D.append($(option).attr("value", i).text(DD));
                }
            }
        }
    };

    myBirthDate();
};
