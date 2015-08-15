(function () {
	'use strict';

	var beams = [];
	var width = 50;
	var height = 5;

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

			jw.ctx.clearRect(beam.x, beam.y, width, height);
			beam.x += beam.speed;

			jw.ctx.fillStyle = 'yellow';
			jw.ctx.fillRect(beam.x, beam.y, width, height);

			enemy = jw.enemy.getByPosition(beam.x + width, beam.y, height);

			if (enemy) {
				enemy.dead = beam.hasHit = true;
				jw.ctx.clearRect(beam.x, beam.y, width, height);
			}
		});

		requestAnimationFrame(nextFrame);
	}

	requestAnimationFrame(nextFrame);

	jw.laser = laser;
}());