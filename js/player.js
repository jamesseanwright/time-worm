(function () {
	'use strict';

	var keyman = jw.keyman;
	var speed = 5;
	var bounceVariant = 10;
	var bounceSpeed = 1;
	var x = 10;
	var y = jw.gameHeight / 2;

	var spriteSize = 48;
	var bodySprite = new Image();
	var headSprite = new Image();
	var interval;
	var ctx = document.querySelector('#player').getContext('2d');

	bodySprite.src = 'img/body.png';
	headSprite.src = 'img/head.png';

	var chunks = [
		{ sprite: bodySprite, yOffset: -bounceVariant, direction: 'up' },
		{ sprite: bodySprite, yOffset: 0, direction:' up' },
		{ sprite: headSprite, yOffset: bounceVariant, direction: 'down' }
	];

	var width = spriteSize * chunks.length;

	function nextFrame() {
		for (var i = 1; i <= chunks.length; i++) {
			var chunk = chunks[i - 1];

			ctx.clearRect(x + spriteSize * i, y - chunk.yOffset, spriteSize, y + chunk.yOffset);

			updateChunkBounce(chunk);
			ctx.drawImage(chunk.sprite, x + spriteSize * i, y - chunk.yOffset, spriteSize, spriteSize);
		}

		requestAnimationFrame(nextFrame);
	}

	function updateChunkBounce(chunk) {
		if (chunk.yOffset === bounceVariant)
			chunk.direction = 'up';
		else if (chunk.yOffset === -bounceVariant)
			chunk.direction = 'down';

		if (chunk.direction === 'down')
			chunk.yOffset += bounceSpeed;
		else
			chunk.yOffset -= bounceSpeed;
	}

	window.addEventListener('load', function () {
		requestAnimationFrame(nextFrame);
	});

	keyman.up.onDown = function () {
		console.log(y);

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

	keyman.space.onDown = function () {
		jw.laser.addBeam({
			x: width + 10,
			y: y + 10,
			speed: 20
		});
	}
}());