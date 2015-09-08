(function () {
	'use strict';

	var beams = [];
	var width = 50;
	var height = 5;
	var ctx = document.querySelector('#laser').getContext('2d');

	var laser = {
		addBeam: addBeam
	};

	window.addEventListener('restartgame', function () {
		requestAnimationFrame(function () {
			ctx.clearRect(0, 0, jw.gameWidth, jw.gameHeight);
		});

		beams = [];
	});

	function addBeam(beam) {
		beams.push(beam);
	}

	function nextFrame() {
		beams = beams.filter(function (beam) {
			return (beam.x + width > 0) && beam.x <= jw.gameWidth && !beam.hasHit;
		});

		beams.forEach(function (beam) {
			var target;

			ctx.clearRect(beam.x, beam.y, width, height);

			target = jw[beam.target].getByPosition(beam.x, beam.y, width, height);

			if (target) {
				target.onHit();
				beam.hasHit = true;
			} else {
				beam.x += beam.speed;

				ctx.fillStyle = 'yellow';
				ctx.fillRect(beam.x, beam.y, width, height);
			}
		});

		requestAnimationFrame(nextFrame);
	}

	requestAnimationFrame(nextFrame);

	jw.laser = laser;
}());