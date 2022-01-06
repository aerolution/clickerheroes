jQuery(function ($) {

    var r = 1.8;

    $(window).load(function () {

        var g = $("#game");

        var render = function (normal) {
            var swf = "flash/clickerheroes_v14255.swf", // Clicker Heroes
                gap = 100,
                width = g.width(),
                current = $(window).height(),
                height = Math.round(width / (normal ? r : 3) ),
                need_height = height;

            if (current < need_height && window.screen && window.screen.availHeight &&
                window.screen.availHeight >= current) {
                need_height = Math.min(need_height + gap, window.screen.availHeight - gap);
                chrome.windows.getCurrent(null, function (w) {
                    if (w.height < need_height)
                        chrome.windows.update(w.id, {height: need_height})
                })
            }

            g.html('<object type="application/x-shockwave-flash"' + ' height="' +
                height + '" width="' + width + '" data="' + swf + '" title="Clicker Heroes">' +
                '<param name="wmode" value="direct"><param name="scale" value="exactfit">' +
                '<param name="quality" value="high"><embed src="' + swf + '"' +
                ' quality="high" bgcolor="#ffffff" height="' + height + '" width="' +
                width + '"' + ' name="Clicker Heroes" align="middle"' +
                ' type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" />' +
                '</object>');

        }, shockwave_flash_enabled = function () {
            return typeof navigator.mimeTypes['application/x-shockwave-flash'] !== 'undefined'
        };

        if (shockwave_flash_enabled()) {
            render(true);

            $(window).resize(function () {
                var width = g.width(),
                    height = Math.round(width / r),
                    emb = g.find(':first');
                emb.css({
                    width: width + 'px',
                    height: height + 'px'
                });
                emb.attr('width', width);
                emb.attr('height', height);
            });

        } else {
            $("#adobe-help").show();
            render(false);
        }
    });

});