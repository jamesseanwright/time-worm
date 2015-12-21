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

	sprite.src = 'clock.png';

	function nextFrame() {
		var shouldCreateClock = Date.now() - lastClock > clockInterval 
			&& !TIME_WORM.game.isRewinding 
			&& !isClockPresent 
			&& TIME_WORM.game.rewinds < TIME_WORM.game.maxRewinds;

		var player;
		var hasBeenCollected;

		if (shouldCreateClock) {
			x = TIME_WORM.gameWidth + spriteSize;
			y = Math.ceil(Math.random() * TIME_WORM.gameHeight);
			isClockPresent = true;
		}

		if (isClockPresent) {
			ctx.clearRect(x, y, spriteSize, spriteSize);
			player = TIME_WORM.player.getByPosition(x, y, spriteSize, spriteSize);
			x -= speed;
			ctx.drawImage(sprite, x, y, spriteSize, spriteSize);

			if (player) {
				TIME_WORM.game.incrementRewinds();
				ctx.clearRect(x, y, spriteSize, spriteSize);
				hasBeenCollected = true;
				TIME_WORM.sounds.play('collect');
			}
		}

		if (hasBeenCollected || x + spriteSize < 0) {
			isClockPresent = hasBeenCollected = false;
			x = 0;
			y = Math.ceil(Math.random() * TIME_WORM.gameHeight);
			lastClock = Date.now();
		}

		requestAnimationFrame(nextFrame);
	}

	window.addEventListener('begingame', function () {
		requestAnimationFrame(nextFrame);
	});

	TIME_WORM.clock = {
		sprite: sprite, // image resource shared with HUD
		spriteSize: spriteSize
	};
}());