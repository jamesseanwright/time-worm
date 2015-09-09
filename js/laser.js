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
			ctx.clearRect(0, 0, jw.gameWidth, jw.gameHeight);
		});

		beams = [];
	});

	function onPlay() {
		beams.forEach(function (beam) {
			beam.decelerationRate = 0;
		});
	}

	function addBeam(beam) {
		if (jw.game.isRewinding)
			return;

		jw.events.add('beamAdded', {
			x: beam.x,
			y: beam.y
		});

		beam.decelerationRate = 0;
		beams.push(beam);
		jw.sounds.play('fire');
	}

	function nextFrame() {
		beams = beams.filter(function (beam) {
			return (beam.x + width > 0) && beam.x <= jw.gameWidth && !beam.hasHit;
		});

		beams.forEach(function (beam) {
			var target;

			ctx.clearRect(beam.x - beam.speed - beam.decelerationRate, beam.y, width + beam.speed + beam.decelerationRate, height);

			target = jw[beam.target].getByPosition(beam.x, beam.y, width, height);

			if (target) {
				target.onHit();
				beam.hasHit = true;
				ctx.clearRect(beam.x, beam.y, width, height);
				jw.sounds.play('explosion');
			} else {
				// this is on unidirectional :( applies to enemyLasers only
				if (jw.game.isRewinding && beam.isRewindable && beam.decelerationRate < Math.abs(beam.speed * 2))
					beam.decelerationRate += 0.8;

				beam.x += beam.speed + beam.decelerationRate;

				ctx.fillStyle = 'yellow';
				ctx.fillRect(beam.x, beam.y, width, height);
			}
		});

		requestAnimationFrame(nextFrame);
	}

	requestAnimationFrame(nextFrame);

	jw.events.register('beamAdded', laser);

	jw.laser = laser;
}());