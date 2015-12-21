(function () {
	'use strict';

	var keyman = TIME_WORM.keyman;
	var speed = 5;
	var bounceVariant = 15;
	var bounceSpeed = 1;
	var initialX = 10;
	var initialY = 50;
	var x = initialX;
	var y = initialY;
	var health = 4;
	var maxHealth = 4;

	var spriteSize = 48;
	var bodySprite = new Image();
	var headSprite = new Image();
	var interval;
	var isAutoPilot = false;
	var targetY;
	var ctx = document.querySelector('#player').getContext('2d');

	bodySprite.src = 'body.png';
	headSprite.src = 'head.png';

	var chunks = generateChunks();
	var width = spriteSize * chunks.length;

	window.addEventListener('restartgame', function () {
		x = initialX;
		y = initialY;
		health = maxHealth;
		chunks = generateChunks();
		width = spriteSize * chunks.length;
	});

	function onHit() {
		if (--health === 0) {
			TIME_WORM.game.gameOver();
		}

		// gnarly rendering bug hack :(
		ctx.clearRect(0, 0, TIME_WORM.gameWidth, TIME_WORM.gameHeight);

		chunks = generateChunks();
		width = spriteSize * chunks.length;
		TIME_WORM.events.add('playerHit', {
			x: x,
			y: y,
			health: health
		});
	}

	function getByPosition(sourceX, sourceY, sourceWidth, sourceHeight) {
		var isHit = sourceX + sourceWidth >= x
				&& sourceX <= x + width
				&& sourceY >= y - bounceVariant
				&& sourceY + sourceHeight <= y + spriteSize + bounceVariant;

		return isHit ? this : null;
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

	function onRewindStart() {
		isAutoPilot = true;
		ctx.clearRect(x, y, width, spriteSize);
	}

	function onRewindFrame(evt) {
		if (evt.type === 'playerHit') {
			if (health < maxHealth) {
				health++;
				chunks = generateChunks();
				width = spriteSize * chunks.length;
			}
		} else if (evt.type === 'playerMove') {
			isAutoPilot = true;
			targetY = evt.data.y;
		}
	}

	function onPlay() {
		isAutoPilot = false;
		targetY = null;
	}

	function nextFrame() {
		for (var i = 1; i <= chunks.length; i++) {
			var chunk = chunks[i - 1];

			updateChunkBounce(chunk, i);
			ctx.drawImage(chunk.sprite, x + spriteSize * i, y - chunk.yOffset - speed, spriteSize, spriteSize + speed);
		}

		if (isAutoPilot && y !== targetY) {
			ctx.clearRect(x + spriteSize * i, y - chunk.yOffset - bounceVariant, spriteSize, spriteSize + bounceVariant * 2);
			y = y > targetY ? y - speed : y + speed
		}

		else if (isAutoPilot && y === targetY) {
			isAutoPilot = false;
			targetY = null;
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
		if (TIME_WORM.game.isRewinding)
			return;

		interval = setInterval(function () {
			y -= speed;
		}, 20);
	};

	keyman.down.onDown = function () {
		if (TIME_WORM.game.isRewinding)
			return;

		interval = setInterval(function () {
			y += speed;
		}, 20);
	};

	keyman.up.onUp = keyman.down.onUp = function () {
		TIME_WORM.events.add('playerMove', {
			y: y
		});

		clearInterval(interval);
	};

	keyman.left.onDown = function () {
		if (TIME_WORM.game.canRewind)
			TIME_WORM.events.rewind();
	};

	keyman.space.onDown = function () {
		TIME_WORM.laser.addBeam({
			x: width + 10,
			y: y + 10,
			speed: 20,
			target: 'enemy'
		});
	};

	TIME_WORM.player = {
		getByPosition: getByPosition,
		onHit: onHit,
		onRewindStart: onRewindStart,
		onRewindFrame: onRewindFrame,
		onPlay: onPlay
	};

	TIME_WORM.events.register('playerHit', TIME_WORM.player);
	TIME_WORM.events.register('playerMove', TIME_WORM.player);
}());