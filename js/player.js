(function () {
	'use strict';

	var canvas = document.querySelector('#game');
	var gameWidth = canvas.width;
	var gameHeight = canvas.height;
	var ctx = canvas.getContext('2d');
	var keyman = jw.keyman;
	var speed = 5;
	var x = 20;
	var y = gameHeight / 2;
	var width = 72;
	var height = 48;
	var interval;

	function nextFrame() {
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + width, y + height);
		ctx.lineTo(x, y + height);
		ctx.closePath();
		ctx.fillStyle = 'red';
		ctx.fill();

		requestAnimationFrame(nextFrame);
	}

	requestAnimationFrame(nextFrame);

	keyman.up.onDown = function () {
		interval = setInterval(function () {
			ctx.clearRect(x, y, width, height);
			y -= speed;
		}, 20);
	};

	keyman.down.onDown = function () {
		interval = setInterval(function () {
			ctx.clearRect(x, y, width, height);
			y += speed;
		}, 20);
	};

	keyman.up.onUp = keyman.down.onUp = function () {
		clearInterval(interval);
	};
}());