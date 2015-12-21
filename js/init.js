(function () {
	'use strict';

	// namespacing
	window.TIME_WORM = {
		// commonly-used globals
		gameWidth: 800,
		gameHeight: 480
	};

	window.addEventListener('load', function () {
		var canvasElements = document.querySelectorAll('canvas');

		for (var i = 0; i < canvasElements.length; i++) {
			canvasElements[i].width = TIME_WORM.gameWidth;
			canvasElements[i].height = TIME_WORM.gameHeight;
		}

		TIME_WORM.game.resetPoints();
		TIME_WORM.game.resetRewinds();
	});
}());