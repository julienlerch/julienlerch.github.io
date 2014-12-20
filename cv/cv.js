// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-6113935-2', 'free.fr');
ga('send', 'pageview');

(function() {
	var s = document.getElementsByTagName('script')[0];
	var bs = document.createElement('script'); bs.type = 'text/javascript'; bs.async = true;
	bs.src = 'cv/bootstrap/js/bootstrap.min.js';
	s.parentNode.insertBefore(bs, s);
})();

$("#aside form").submit(function (e) {
	e.preventDefault();
	var btn = $("#send-msg-btn");
	btn.popover({
		placement	: 'left',
		content		: 'Votre message est en train de partir...',
		title		: 'Envoi du message'
	});
	btn.popover('show');
	//_gaq.push(['_trackEvent',	'Message',	'msg-sent',	'Envoi de message',	null,		'true']);
	//					category,	action, 	opt_label,			opt_value,	opt_noninteraction);
	ga('send', 'event', 'Message', 'msg-sent', 'Envoi de message', null); // "send, "event", category, action, label, value
	$.ajax({
		url	: "mail.php",
		type	: 'POST',
		data	: { 'name': $('#name').val(), 'email': $('#email').val(), 'message': $('#message').val() },
		success :	function (r) {
			$(".popover-content").html("<p class='alert alert-success'><span class='glyphicon glyphicon-ok-circle'></span>&nbsp;" + r + ". Merci !</p>" );
		},
		error : function (r) {
			$(".popover-content").html("<p class='alert alert-danger'><span class='glyphicon glyphicon-exclamation-sign'></span>&nbsp;" + r.responseText  + "</p>");
		},
		complete : function () {
			setTimeout(function() {
				btn.popover('hide');
			}, 3500);
		}
	});
});

$("#aside a").click(function (e) {
	//_gaq.push(['_trackEvent', 'Telechargement', 'dl-aside', 'PDF file dowloaded (aside)', null, 'true']); // category, action, opt_label, opt_value, opt_noninteraction);
	ga('send', 'event', 'Telechargement', 'dl-aside', 'PDF file dowloaded (aside)', null); // "send, "event", category, action, label, value
});
$("#content > p > a").click(function (e) {
	//_gaq.push(['_trackEvent', 'Telechargement', 'dl-timeline', 'PDF file dowloaded (content)', null, 'true']); // category, action, opt_label, opt_value, opt_noninteraction);
	ga('send', 'event', 'Telechargement', 'dl-content', 'PDF file dowloaded (content)', null); // "send, "event", category, action, label, value
});

$(document).click( function (e) {
	// push all cliks into GAnalytics, round to 20px
	var x = (Math.ceil(e.pageX / 20) * 20) -15;
	var y = Math.ceil(e.pageY / 20) * 20;
//	$('body').prepend('<div style="position: absolute;z-index:5000;background:red; width:5px; height:5px; top:'+y+'px; left:'+x+'px;">&nbsp;</div>');
	var clic = '{"x":'+x+',"y":'+y+'}';
	ga('send', 'event', 'Click', window.innerWidth + "px", clic); // "send, "event", category, action, label, value
});

$(document).ready (function () {
	$("#send-msg-btn").attr("data-container", "body");
	$("#send-msg-btn").attr("data-toggle", "popover");
	$("#send-msg-btn").attr("rel", "popover");
});
