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
			var player;

			if (beam.target === 'enemy') {
				enemy = jw.enemy.getByPosition(beam.x, beam.y, width, height);

				if (enemy) {
					enemy.dead = beam.hasHit = true;
					jw.game.points += 100;
				}
			} else if (beam.target === 'player') {
				player = jw.player.getByPosition(beam.x, beam.y, width, height);

				if (player) {
					jw.player.decrementHealth();
					beam.hasHit = true;
				}
			}

			ctx.clearRect(beam.x, beam.y, width, height);
			beam.x += beam.speed;

			ctx.fillStyle = 'yellow';
			ctx.fillRect(beam.x, beam.y, width, height);
		});

		requestAnimationFrame(nextFrame);
	}

	requestAnimationFrame(nextFrame);

	jw.laser = laser;
}());