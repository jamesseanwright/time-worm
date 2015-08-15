(function () {
	'use strict';

	var canvas = document.querySelector('#game');

	// namespacing
	window.jw = {
		// commonly-used globals
		canvas: canvas,
		gameWidth: canvas.width,
		gameHeight: canvas.height,
		ctx: canvas.getContext('2d')
	};
}());