(function () {
	'use strict';

	var canvas = document.querySelector('#title');
	var ctx = canvas.getContext('2d');
	var primaryFontSize = 48;
	var subtitleFontSize = 32;
	var fontFamily = 'Courier New';

	window.addEventListener('load', function () {
		requestAnimationFrame(function () {
			ctx.font = primaryFontSize + 'px ' + fontFamily;
			ctx.fillStyle = 'white';
			ctx.fillText('Time Worm!', TIME_WORM.gameWidth / 3, (TIME_WORM.gameHeight / 3) - primaryFontSize);
		
			ctx.font = subtitleFontSize + 'px ' + fontFamily;
			ctx.fillText('(c) James Wright 2015', (TIME_WORM.gameWidth / 3) -70, (TIME_WORM.gameHeight / 2) - subtitleFontSize + primaryFontSize);
			ctx.fillText('jamesswright.co.uk', (TIME_WORM.gameWidth / 3) -35, (TIME_WORM.gameHeight / 2) + 30 + primaryFontSize);
			ctx.fillText('Click to play!', (TIME_WORM.gameWidth / 3) + 10, (TIME_WORM.gameHeight / 2) + 30 + primaryFontSize + subtitleFontSize * 2);
		});

		canvas.addEventListener('click', function () {
			var instructionsCanvas = document.querySelector('#instructions');
			instructionsCanvas.style.display = 'block';
			canvas.style.display = 'none';
			TIME_WORM.instructions.render();
		});
	});
}());