(function () {
	'use strict';

	var canvas = document.querySelector('#game');
	var width = canvas.width;
	var height = canvas.height;
	var ctx = canvas.getContext('2d');

	window.keyman.up.onDown = function () {
		console.log('move up');
	};

	window.keyman.up.onUp = function () {
		console.log('stop');
	};
}());