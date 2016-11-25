/**
 * My dOb Plugin
 *
 * @Date    20131119
 * @Author  ShawnWu
 * @Version     release v1.6.20161125
 * @License     under the MIT License
 **/
jQuery.fn.dOb = function(opts) {
    opts = jQuery.extend({
        dOb_Y: '#dOb_Y', // element year
        dOb_M: '#dOb_M', // element month
        dOb_D: '#dOb_D', // element day
        from_Y: 2000, // from year
        to_Y: 2013, // to year
        isPadding: true // is padding zero
    }, opts);

    var myBirthDate = function() {
        var _Y = $(opts.dOb_Y),
            _M = $(opts.dOb_M),
            _D = $(opts.dOb_D),
            def_Y = _Y.val(),
            def_M = _M.val(),
            def_D = _D.val(),
            option = "<option></option>";

        _year();
        _month();
        _day(1);
        _Y.on('change', _day);
        _M.on('change', _day);

        function _year() {
            var i = null;
            if (opts.from_Y > opts.to_Y) {
                for (i = opts.from_Y; i >= opts.to_Y; i--) {
                    if (i == def_Y) {
                        _Y.append($(option).attr({ "value": i, "selected": true }).text(i));
                        _Y.find('option:first').remove();
                    } else _Y.append($(option).attr("value", i).text(i));
                }
            } else {
                for (i = opts.from_Y; i <= opts.to_Y; i++) {
                    if (i == def_Y) {
                        _Y.append($(option).attr({ "value": i, "selected": true }).text(i));
                        _Y.find('option:first').remove();
                    } else _Y.append($(option).attr("value", i).text(i));
                }
            }
        }

        function _month() {
            for (var i = 1; i <= 12; i++) {
                var MM = opts.isPadding ? ('0' + i).slice(-2) : ('' + i);
                if (i == def_M) {
                    _M.append($(option).attr({ "value": i, "selected": true }).text(MM));
                    _M.find('option:first').remove();
                } else _M.append($(option).attr("value", i).text(MM));
            }
        }

        function _day(dd) {
            var def_YD = $.isNumeric(_Y.val()) ? _Y.val() : 1911,
                def_MD = $.isNumeric(_M.val()) ? _M.val() : 1,
                dateTime = new Date(def_YD, def_MD, 0), // get last date of month
                D = dd == 1 ? 1 : 0;

            if (D && !$.isNumeric(def_D))
                _D.append($(option).attr({ "value": def_D, "selected": true }).text(def_D));

            _D.children().each(function() {
                // remove days of month
                if ($(this).val() > dateTime.getDate()) $(this).remove();
            });

            for (var i = 1; i <= dateTime.getDate(); i++) {
                // insert days of month
                if (!_D.children("option[value='" + i + "']").length) {
                    var DD = opts.isPadding ? ('0' + i).slice(-2) : ('' + i);
                    if (i == def_D) {
                        _D.append($(option).attr({ "value": i, "selected": true }).text(DD));
                        _D.find('option:first').remove();
                    } else _D.append($(option).attr("value", i).text(DD));
                }
            }
        }
    };

    myBirthDate();
};
