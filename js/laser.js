(function () {
	'use strict';

	var beams = [];
	var width = 50;
	var height = 5;
	var ctx = document.querySelector('#laser').getContext('2d');

	var laser = {
		addBeam: addBeam
	};

	function addBeam(beam) {
		beams.push(beam);
	}

	function nextFrame() {
		beams = beams.filter(function (beam) {
			return beam.x <= jw.gameWidth && !beam.hasHit;
		});

		beams.forEach(function (beam) {
			var enemy;

			ctx.clearRect(beam.x, beam.y, width, height);
			beam.x += beam.speed;

			ctx.fillStyle = 'yellow';
			ctx.fillRect(beam.x, beam.y, width, height);

			enemy = jw.enemy.getByPosition(beam.x, beam.y, width, height);

			if (enemy) {
				enemy.dead = beam.hasHit = true;
				jw.game.points += 100;
				ctx.clearRect(beam.x, beam.y, width, height);
			}
		});

		requestAnimationFrame(nextFrame);
	}

	requestAnimationFrame(nextFrame);

	jw.laser = laser;
}());