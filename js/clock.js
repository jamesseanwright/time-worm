(function () {
	'use strict';

	var ctx = document.querySelector('#clocks').getContext('2d');
	var spriteSize = 28;
	var sprite = new Image();
	var clockInterval = 7000;
	var lastClock = Date.now();
	var isClockPresent = false;
	var speed = 6;
	var x;
	var y;

	sprite.src = 'img/clock.png';

	function nextFrame() {
		var shouldCreateClock = Date.now() - lastClock > clockInterval && !isClockPresent && jw.game.canRewind;
		var player;
		var hasBeenCollected;

		if (shouldCreateClock) {
			x = jw.gameWidth + spriteSize;
			y = Math.ceil(Math.random() * jw.gameHeight);
			isClockPresent = true;
		}

		if (isClockPresent) {
			ctx.clearRect(x, y, spriteSize, spriteSize);
			player = jw.player.getByPosition(x, y, spriteSize, spriteSize);

			if (player) {
				jw.game.incrementRewinds();
				hasBeenCollected = true;
			}

			x -= speed;
			ctx.drawImage(sprite, x, y, spriteSize, spriteSize);
		}

		if (hasBeenCollected || x + spriteSize < 0) {
			isClockPresent = hasBeenCollected = false;
			ctx.clearRect(x, y, spriteSize, spriteSize);
			lastClock = Date.now();
		}

		requestAnimationFrame(nextFrame);
	}

	requestAnimationFrame(nextFrame);

	jw.clock = {
		sprite: sprite, // image resource shared with HUD
		spriteSize: spriteSize
	};
}());