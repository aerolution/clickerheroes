(function () {

    function each(elements, callback) {
        if (!elements.length)
            return;
        for (var i = 0; i < elements.length; i++)
            callback(elements[i])
    }

    function open_share_window(url_mask) {
        var app_name_encoded = encodeURIComponent(chrome.runtime.getManifest().name);
        var url_encoded = encodeURIComponent('https://chrome.google.com/webstore/detail/' + chrome.runtime.id);
        var url = url_mask.replace('$URL', url_encoded).replace('$NAME', app_name_encoded);
        if (url_mask.indexOf("mailto:") > -1) {
            return document.location = url
        } else {
            var height = Math.min(700, innerHeight);
            var width = Math.min(900, 0.9 * innerWidth);
            return window.open(url, "", [
                "height=" + height,
                "left=" + (innerWidth - width) / 2,
                "top=" + (innerHeight - height) / 2,
                "width=" + width,
                "status=1",
                "toolbar=0"
            ].join(","))
        }
    }

    var services = {
        facebook: 'https://www.facebook.com/sharer.php?t=&u=$URL',
        twitter: 'https://twitter.com/intent/tweet?text=&url=$URL',
        pinterest: 'https://pinterest.com/pin/create/link/?url=$URL',
        email: 'mailto:?subject=$NAME&body=$URL',
        blogger: 'https://www.blogger.com/blog-this.g?n=&t=&u=$URL',
        delicious: 'https://del.icio.us/save?provider=sharethis&title=$NAME&url=$URL&v=5',
        diaspora: 'https://share.diasporafoundation.org/?title=$NAME&url=$URL',
        evernote: 'https://www.evernote.com/clip.action?title=$NAME&url=$URL',
        flipboard: 'https://share.flipboard.com/bookmarklet/popout?ext=sharethis&title=$NAME&url=$URL&utm_campaign=widgets&utm_content=&utm_source=sharethis&v=2',
        getpocket: 'https://getpocket.com/edit?url=$URL',
        gmail: 'https://mail.google.com/mail/?view=cm&to=&su=$NAME&body=$URL&bcc=&cc=',
        instapaper: 'https://www.instapaper.com/edit?url=$URL&title=$NAME&description=',
        line: 'https://lineit.line.me/share/ui?url=$URL&text=',
        messenger: 'https://www.facebook.com/dialog/send?link=$URL&app_id=521270401588372&redirect_uri=$URL',
        reddit: 'https://www.reddit.com/submit?title=&url=$URL',
        refind: 'https://refind.com/?url=$URL',
        skype: 'https://web.skype.com/share?url=$URL&text=',
        telegram: 'https://t.me/share/url?url=$URL&text=&to=',
        tumblr: 'https://www.tumblr.com/share?t=&u=$URL&v=3',
        whatsapp: 'https://web.whatsapp.com/send?text=$URL',
        yahoomail: 'https://compose.mail.yahoo.com/?to=&subject=$NAME&body=$URL'
    };

    each(document.getElementsByClassName('st-toggle'), function (st) {
        st.addEventListener('click', function () {
            if (this.parentElement && this.parentElement.classList.contains('st-toggleable')) {
                if (this.parentElement.classList.contains('st-hidden')) {
                    this.parentElement.classList.remove('st-hidden')
                } else {
                    this.parentElement.classList.add('st-hidden')
                }
            }
        }, false)
    });

    each(['st-btns', 'st-close'], function (cls) {
        each(document.getElementsByClassName(cls), function (st) {
            st.addEventListener('click', function () {
                if (this.parentElement && !this.parentElement.classList.contains('st-hidden')) {
                    this.parentElement.classList.add('st-hidden')
                }
            }, false)
        })
    });

    each(document.getElementsByClassName('st-btn'), function (btn) {
        btn.addEventListener('click', function () {
            var network = this.getAttribute('data-network');
            if (network) {
                console.log(network);
                if (typeof services[network] === 'string')
                    open_share_window(services[network]);
                else
                    document.getElementById('st-el-2').classList.remove('st-hidden');

            }
        }, false)
    });

})();
