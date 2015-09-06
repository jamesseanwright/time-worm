(function () {
	'use strict';
	var ctx = document.querySelector('#background').getContext('2d');
	var background = generateBackground();
	var isRewinding = false;

	jw.events.register('bg', background);

	function onRewindStart() {
		isRewinding = true;
	}

	function onPlay() {
		isRewinding = false;
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
				x: Math.ceil(Math.random() * jw.gameWidth),
				y: Math.ceil(Math.random() * jw.gameHeight)
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
			if (!isRewinding)
				star.decelerationRate = 0;

			else if (isRewinding && star.decelerationRate < star.speed * 2)
				star.decelerationRate += 0.5;

			ctx.clearRect(star.x - star.decelerationRate, star.y - star.decelerationRate, star.size + star.decelerationRate, star.size + star.decelerationRate);

			star.x -= star.speed - star.decelerationRate;

			if (star.x + star.size < 0)
				star.x = jw.gameWidth + star.size;

			if (star.x > jw.gameWidth + star.size)
				star.x = 0 - star.size;
			
			ctx.fillRect(star.x, star.y, star.size, star.size);
		});
	}

	requestAnimationFrame(nextFrame);
}());