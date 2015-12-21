(function () {
	'use strict';

	var beams = [];
	var width = 50;
	var height = 5;
	var ctx = document.querySelector('#laser').getContext('2d');

	var laser = {
		addBeam: addBeam,
		onPlay: onPlay
	};

	window.addEventListener('restartgame', function () {
		requestAnimationFrame(function () {
			ctx.clearRect(0, 0, TIME_WORM.gameWidth, TIME_WORM.gameHeight);
		});

		beams = [];
	});

	function onPlay() {
		beams.forEach(function (beam) {
			beam.decelerationRate = 0;
		});
	}

	function addBeam(beam) {
		if (TIME_WORM.game.isRewinding)
			return;

		TIME_WORM.events.add('beamAdded', {
			x: beam.x,
			y: beam.y
		});

		beam.decelerationRate = 0;
		beams.push(beam);
		TIME_WORM.sounds.play('fire');
	}

	function nextFrame() {
		beams = beams.filter(function (beam) {
			return (beam.x + width > 0) && beam.x <= TIME_WORM.gameWidth && !beam.hasHit;
		});

		beams.forEach(function (beam) {
			var target;

			ctx.clearRect(beam.x - beam.speed - beam.decelerationRate, beam.y, width + beam.speed + beam.decelerationRate, height);

			target = TIME_WORM[beam.target].getByPosition(beam.x, beam.y, width, height);

			if (target) {
				target.onHit();
				beam.hasHit = true;
				ctx.clearRect(beam.x, beam.y, width, height);
				TIME_WORM.sounds.play('explosion');
			} else {
				// this is on unidirectional :( applies to enemyLasers only
				if (TIME_WORM.game.isRewinding && beam.isRewindable && beam.decelerationRate < Math.abs(beam.speed * 2))
					beam.decelerationRate += 0.8;

				beam.x += beam.speed + beam.decelerationRate;

				ctx.fillStyle = 'yellow';
				ctx.fillRect(beam.x, beam.y, width, height);
			}
		});

		requestAnimationFrame(nextFrame);
	}

	requestAnimationFrame(nextFrame);

	TIME_WORM.events.register('beamAdded', laser);

	TIME_WORM.laser = laser;
}());