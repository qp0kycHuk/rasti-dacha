jQuery.fancybox.defaults.backFocus = false;
jQuery.fancybox.defaults.ajaxTpl = '<section class="fancybox-custom-modal container-block fancybox-container" role="dialog" tabindex="-1">' +
	'<div class="fancybox-bg"></div>' +
	'<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
	'<div class="fancybox-toolbar">{{buttons}}</div>' +
	'<div class="fancybox-navigation">{{arrows}}</div>' +
	'<div class="fancybox-custom-inner"><div class="fancybox-stage"></div></div>' +
	'<div class="fancybox-caption"><div class=""fancybox-caption__body"></div></div>' +
	'</section>';
// jQuery.fancybox.defaults.spinnerTpl = '<div class="ui-progress">'+
// 		'<svg class="icon">'+
// 			'<use xlink:href="img/utils.svg#CircularProgress" />'+
// 		'</svg>'+
// 	'</div>';
jQuery.fancybox.defaults.initModal = setFancybox;
jQuery.fancybox.openModal = openModal;

function openModal(src, ...options) {
	$.fancybox.open({
		src: src,
		type: 'ajax',
		touch: false,
		baseTpl: jQuery.fancybox.defaults.ajaxTpl,
		afterLoad: (opt, obj) => {
			// maskedInputInit();
			window.Tab.init()
			jQuery.fancybox.defaults.initModal();
		},
		...options
	});
}

function setFancybox() {
	$('[data-fancybox-modal]').fancybox({
		type: 'ajax',
		touch: false,
		baseTpl: jQuery.fancybox.defaults.ajaxTpl,
		afterLoad: (opt, obj) => {
			// maskedInputInit();
			window.Tab.init()
			jQuery.fancybox.defaults.initModal();
		}
	});
}


jQuery(document).ready(function () {
	jQuery.fancybox.defaults.initModal();

});


(() => {

	let support = {
		pointer: !!("PointerEvent" in window || ("msPointerEnabled" in window.navigator)),
		touch: !!(typeof window.orientation !== "undefined" || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "ontouchstart" in window || navigator.msMaxTouchPoints || "maxTouchPoints" in window.navigator > 1 || "msMaxTouchPoints" in window.navigator > 1)
	}
	var getSupportedEvents = function () {
		let events;
		switch (true) {

			case support.touch:
				events = {
					type: "touch",
					start: "touchstart",
					move: "touchmove",
					end: "touchend",
					cancel: "touchcancel"
				};
				break;
			default:
				events = {
					type: "mouse",
					start: "mousedown",
					move: "mousemove",
					end: "mouseup",
					leave: "mouseleave"
				};
				break;
		}
		return events;
	};


	const touchStartHandler = () => {
		if (!$.fancybox.getInstance() || !$.fancybox.getInstance().SlideShow || !$.fancybox.getInstance().SlideShow.isActive) return
		$.fancybox.getInstance().SlideShow.stop();
		document.addEventListener(getSupportedEvents().end, touchEndHandler);
	}
	const touchEndHandler = () => {
		document.removeEventListener(getSupportedEvents().end, touchEndHandler);
		if (!$.fancybox.getInstance()) return
		$.fancybox.getInstance().SlideShow.start();


	}
	document.addEventListener(getSupportedEvents().start, touchStartHandler);

})();