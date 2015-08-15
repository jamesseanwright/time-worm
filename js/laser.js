(function () {
	'use strict';

	var beams = [];
	var canvas = document.querySelector('#game');
	var gameWidth = canvas.width;
	var ctx = canvas.getContext('2d');
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
			return beam.x <= gameWidth;
		});

		beams.forEach(function (beam) {
			console.log(beam);
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