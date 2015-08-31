(function () {
	'use strict';
	var ctx = document.querySelector('#background').getContext('2d');
	var background = generateBackground();
	var decelerationRate = 0;
	var isRewinding = false;

	jw.events.register('bg', background);

	function onRewindStart() {
		isRewinding = true;
	}

	function onPlay() {
		isRewinding = false;
		decelerationRate = 0;
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
		if (isRewinding && decelerationRate < 8)
			decelerationRate += 0.5;

		ctx.fillStyle = background.starFill;

		background.stars.forEach(function (star) {
			ctx.clearRect(star.x, star.y, star.size, star.size);
			
			star.x -= star.speed - decelerationRate;

			if (star.x + star.size < 0)
				star.x = jw.gameWidth + star.size;

			if (star.x > jw.gameWidth + star.size)
				star.x = 0 - star.size;
			
			ctx.fillRect(star.x, star.y, star.size, star.size);
		});
	}

	requestAnimationFrame(nextFrame);
}());