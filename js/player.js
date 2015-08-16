(function () {
	'use strict';

	var keyman = jw.keyman;
	var speed = 5;
	var bounceVariant = 15;
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

	var chunks = generateChunks();
	var width = spriteSize * chunks.length;

	function generateChunks() {
		var chunks = [];
		var sprite;
		var yOffset;

		for (var i = 1; i <= jw.game.health; i++) {
			yOffset = Math.round(bounceVariant * 2 / jw.game.health * i);
			sprite = i === jw.game.health ? headSprite : bodySprite;
			chunks.push({ sprite: sprite, yOffset: yOffset, direction: yOffset > 0 ? 'up': 'down' });
		}

		return chunks;
	}

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