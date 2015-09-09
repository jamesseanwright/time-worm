(function () {
	'use strict';

	var keyman = jw.keyman;
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

	bodySprite.src = 'img/body.png';
	headSprite.src = 'img/head.png';

	var chunks = generateChunks();
	var width = spriteSize * chunks.length;

	// gnarly rendering glitch hack :()
	window.addEventListener('gameover', function () {
		ctx.clearRect(0, 0, jw.gameWidth, jw.gameHeight);
	});

	window.addEventListener('restartgame', function () {
		x = initialX;
		y = initialY;
		health = maxHealth;
		chunks = generateChunks();
		width = spriteSize * chunks.length;
	});

	function onHit() {
		if (--health === 0) {
			jw.game.gameOver();
		}

		ctx.clearRect(x + spriteSize, y - bounceVariant, width, spriteSize + bounceVariant * 2);

		chunks = generateChunks();
		width = spriteSize * chunks.length;
		jw.events.add('playerHit', {
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

		if (isAutoPilot && y !== targetY)
			y = y > targetY ? y - speed : y + speed

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
		if (isAutoPilot)
			return;

		interval = setInterval(function () {
			y -= speed;
		}, 20);
	};

	keyman.down.onDown = function () {
		if (isAutoPilot)
			return;

		interval = setInterval(function () {
			y += speed;
		}, 20);
	};

	keyman.up.onUp = keyman.down.onUp = function () {
		jw.events.add('playerMove', {
			y: y
		});

		clearInterval(interval);
	};

	keyman.left.onDown = function () {
		if (jw.game.canRewind)
			jw.events.rewind();
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
		onHit: onHit,
		onRewindStart: onRewindStart,
		onRewindFrame: onRewindFrame,
		onPlay: onPlay
	};

	jw.events.register('playerHit', jw.player);
	jw.events.register('playerMove', jw.player);
}());