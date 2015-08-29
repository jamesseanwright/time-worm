(function () {
	'use strict';

	var keyman = jw.keyman;
	var speed = 5;
	var bounceVariant = 15;
	var bounceSpeed = 1;
	var x = 10;
	//var y = jw.gameHeight / 2;
	var y = 50;
	var health = 4;

	var spriteSize = 48;
	var bodySprite = new Image();
	var headSprite = new Image();
	var interval;
	var ctx = document.querySelector('#player').getContext('2d');

	bodySprite.src = 'img/body.png';
	headSprite.src = 'img/head.png';

	var chunks = generateChunks();
	var width = spriteSize * chunks.length;

	function onHit() {
		if (--health === 0) {
			// game over
		}
	}

	function getByPosition(sourceX, sourceY, sourceWidth, sourceHeight) {
		var isHit = sourceX + sourceWidth >= x
				&& sourceX <= x + width
				&& sourceY >= y
				&& sourceY + sourceHeight <= y + spriteSize;

		return this;
	}

	function generateChunks() {
		var chunks = [];
		var sprite;
		var yOffset;

		for (var i = 1; i <= health; i++) {
			yOffset = Math.round(bounceVariant * 2 / health * i);
			sprite = i === health ? headSprite : bodySprite;
			chunks.push({ sprite: sprite, yOffset: yOffset, direction: yOffset > 0 ? 'up': 'down' });
		}

		return chunks;
	}

	function nextFrame() {
		for (var i = 1; i <= chunks.length; i++) {
			var chunk = chunks[i - 1];

			updateChunkBounce(chunk, i);
			ctx.drawImage(chunk.sprite, x + spriteSize * i, y - chunk.yOffset, spriteSize, spriteSize);
		}

		requestAnimationFrame(nextFrame);
	}

	function updateChunkBounce(chunk, i) {
		ctx.clearRect(x + spriteSize * i, y - chunk.yOffset - bounceVariant, spriteSize, spriteSize + bounceVariant * 2);

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
			speed: 20,
			target: 'enemy'
		});
	};

	jw.player = {
		getByPosition: getByPosition,
		onHit: onHit
	};
}());