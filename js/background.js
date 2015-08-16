(function () {
	'use strict';
	var canvas = document.querySelector('#background');
	var width = canvas.width;
	var height = canvas.height;
	var ctx = canvas.getContext('2d');
	var background = generateBackground();

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
				x: Math.ceil(Math.random() * width),
				y: Math.ceil(Math.random() * height)
			});
		}

		return {
			starFill: 'white',
			stars: stars
		};
	}

	function animateBackground() {
		ctx.fillStyle = background.starFill;

		background.stars.forEach(function (star) {
			ctx.clearRect(star.x, star.y, star.size, star.size);
			
			star.x -= star.speed;
			if (star.x + star.size < 0)
				star.x = width + star.size;
			
			ctx.fillRect(star.x, star.y, star.size, star.size);
		});
	}

	requestAnimationFrame(nextFrame);
}());