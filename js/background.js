(function () {
	'use strict';
	var ctx = document.querySelector('#background').getContext('2d');
	var background = generateBackground();

	TIME_WORM.events.register('bg', background);

	function onRewindStart() {
	}

	function onPlay() {
	}

	function nextFrame(timestamp) {
		animateBackground();
		requestAnimationFrame(nextFrame);
	}

	function generateBackground() {
		var count = 150;
		var stars = [];

		for (var i = 0; i < count; i++) {
			var size = Math.ceil(Math.random() * 3);
			var speed = 2 * size;
			stars.push({ 
				size: size,
				speed: speed,
				decelerationRate: 0,
				x: Math.ceil(Math.random() * TIME_WORM.gameWidth),
				y: Math.ceil(Math.random() * TIME_WORM.gameHeight)
			});
		}

		return {
			starFill: 'white',
			stars: stars,
			onRewindStart: onRewindStart,
			onPlay: onPlay
		};
	}

	function animateBackground() {
		ctx.fillStyle = background.starFill;

		background.stars.forEach(function (star) {
			if (!TIME_WORM.game.isRewinding)
				star.decelerationRate = 0;

			else if (TIME_WORM.game.isRewinding && star.decelerationRate < star.speed * 2)
				star.decelerationRate += 0.5;

			ctx.clearRect(star.x - star.speed - star.decelerationRate, star.y - star.decelerationRate, star.size + star.decelerationRate + star.speed, star.size + star.decelerationRate);

			star.x -= star.speed - star.decelerationRate;

			if (star.x + star.size < 0)
				star.x = TIME_WORM.gameWidth + star.size;

			if (star.x > TIME_WORM.gameWidth + star.size)
				star.x = 0 - star.size;
			
			ctx.fillRect(star.x, star.y, star.size, star.size);
		});
	}

	requestAnimationFrame(nextFrame);
}());