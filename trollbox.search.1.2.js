var postUrl = 'https://hooks.slack.com/services/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';
var keyword = / ignis| jelurida| nxt| ardor| ardr/; //Use | pipe to separate your keywords.

function postMSG() {
    var msg = document.getElementById('xxx').value;
    var chan = '#poloniex';
    var sdata = formatForSlack(msg, chan);
    $.ajax({
        url: postUrl, type: 'POST', processData: true, data: sdata,
        success: function (data) {
            console.log(data);
            $('#result').html(data);
        },
        error: function (data) {
            console.log(data);
            $('#result').html("error:" + JSON.stringify(data));
        }
    });
}

function formatForSlack(msg, chan) {
    var payload = {"channel": chan, "username": 'incoming-webhook', "text": msg, "icon_emoji": ':ghost:'};
    return JSON.stringify(payload)
}

var x = "";
jQuery('body').prepend('<input id= "xxx" style="background:pink; width:100%; position:absolute; z-index:9; height: 50px; font-size: 9px;">');
jQuery('#chatdiv').bind("DOMSubtreeModified", function () {
    var $chatDiv = '#chatdiv tr:last-child';
    var y = jQuery($chatDiv).text();
    if (y !== x) {
        if (jQuery($chatDiv).text().toLowerCase().search(keyword) > 0) {
            var txt = jQuery($chatDiv).text();
            txt = txt.substring(1);
            jQuery('#xxx').val(">\n" + txt + " http://www.thetrollbox.net");
            console.log(txt);
            postMSG();
        }
        x = y;
    }
});