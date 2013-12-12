;function LongPoll(window, $) {
    var xhr;
    this.watch = function(callback) {
        (function poll() {
            xhr = $.ajax({
                url: '/longPoll',
                success: function(data) {
                    callback(data);

                    poll();
                },
                error: function(jqxhr, textstatus, err) {
                    if (err === 'timeout' || err === 'Proxy Error') {
                        poll();
                    } else {
                        console.error('Autoreload unrecoverable error:', err);
                    }
                    xhr = null;
                },
                timeout: 1000*60*10,
                dataType: 'json'
            });
        })();
    }
    this.stop = function() {
        if (xhr) xhr.abort();
    }
}
window.LongPoll = new LongPoll(window, jQuery);