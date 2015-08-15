(function () {
	'use strict';

	var canvas = document.querySelector('#game');
	var gameWidth = canvas.width;
	var gameHeight = canvas.height;
	var ctx = canvas.getContext('2d');
	var keyman = jw.keyman;
	var speed = 5;
	var floatVariant = 20;
	var floatSpeed = 5;
	var x = 10;
	var y = gameHeight / 2;

	var spriteSize = 64;
	var bodySprite = new Image();
	var headSprite = new Image();
	var interval;

	bodySprite.src = 'img/body.svg';
	headSprite.src = 'img/head.svg';

	var chunks = [
		{ sprite: bodySprite, yOffset: 0 },
		{ sprite: bodySprite, yOffset: 10 },
		{ sprite: headSprite, yOffset: 20 }
	];

	var width = spriteSize * chunks.length;

	console.log(width);

	ctx.imageSmoothingEnabled = true;

	function nextFrame() {
		ctx.clearRect(x, y - floatVariant, width, spriteSize + floatVariant + 5);

		chunks.forEach(function (chunk, i) {
			ctx.drawImage(chunk.sprite, x + spriteSize * i, y - chunk.yOffset, spriteSize, spriteSize);
		});


		// ctx.beginPath();
		// ctx.moveTo(x, y);
		// ctx.lineTo(x + width, y + height);
		// ctx.lineTo(x, y + height);
		// ctx.closePath();
		// ctx.fillStyle = 'red';
		// ctx.fill();

		requestAnimationFrame(nextFrame);
	}

	window.onload = function () {
		requestAnimationFrame(nextFrame);
	};

	keyman.up.onDown = function () {
		interval = setInterval(function () {
			y -= speed;
		}, 20);
	};

	keyman.down.onDown = function () {
		interval = setInterval(function () {
			y += speed;
		}, 20);
	};

	keyman.up.onUp = keyman.down.onUp = function () {
		clearInterval(interval);
	};
}());