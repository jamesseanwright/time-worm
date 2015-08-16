(function () {
	'use strict';

	// namespacing
	window.jw = {
		// commonly-used globals
		gameWidth: 1024,
		gameHeight: 720
	};

	window.addEventListener('load', function () {
		var canvasElements = document.querySelectorAll('canvas');

		for (var i = 0; i < canvasElements.length; i++) {
			canvasElements[i].width = jw.gameWidth;
			canvasElements[i].height = jw.gameHeight;
		}
	});
}());