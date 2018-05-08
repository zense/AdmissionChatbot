$(document).on('click', '.panel-heading span.icon_minim', function(e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function(e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }


});
$(document).on('click', '#new_chat', function(e) {
    var size = $(".chat-window:last-child").css("margin-left");
    size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $("#chat_window_1").clone().appendTo(".container");
    clone.css("margin-left", size_total);
});

$(document).on('click', '#btn-chat', sendMessage);
$(document).on('keyup', '#inp', function(e) {
	if (e.keyCode == 13) {
		sendMessage();
	}
});

$(document).on('click', '.icon_close', function(e) {
    //$(this).parent().parent().parent().parent().remove();
    $("#chat_window_1").remove();
});

function sendMessage(){
	if(!$('#inp')[0].value)return;
	insertSentMessage($('#inp')[0].value);
	getResponse($('#inp')[0].value)
	$('#inp')[0].value = ""

}


function insertSentMessage(msg) {
    $(".panel-body").append('<div class="row msg_container base_sent"><div class="col-md-10 col-xs-10"><div class="messages msg_sent"><p>' + escapeHtml(msg) + ' </p></div></div></div>');
    var div = document.getElementById("panel-body-id");
    div.scrollTop = div.scrollHeight - div.clientHeight;
}
function insertReceiveMessage(msg) {
    $(".panel-body").append('<div class="row msg_container base_receive"><div class="col-md-10 col-xs-10"><div class="messages msg_receive"><p>' + escapeHtml(msg) + ' </p></div></div></div>');
    var div = document.getElementById("panel-body-id");
    div.scrollTop = div.scrollHeight - div.clientHeight;
}


function getResponse(message) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://chatbotapi.zense.co.in",
        "method": "POST",
        "processData": false,
        "data": JSON.stringify({
            "input": {
                "text": message
            }
        })
    }
    $.ajax(settings).done(function(response) {
        insertReceiveMessage(response.output.text[0]);
        console.log(response.output.text);
    });

}


function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
