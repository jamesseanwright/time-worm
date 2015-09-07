(function () {
	'use strict';

	var ctx = document.querySelector('#hud').getContext('2d');
	var topMargin = 25;
	var leftMargin = 50;
	var primaryFontSize = 32;
	var subtitleFontSize = 28;
	var fontFamily = 'Courier New';

	window.addEventListener('load', function () {
		requestAnimationFrame(function () {
			ctx.drawImage(jw.clock.sprite, (leftMargin + jw.gameWidth / 3) + 25, topMargin - 3, jw.clock.spriteSize, jw.clock.spriteSize);
		});
	});
	
	function renderPoints(points) {
		requestAnimationFrame(function () {
			ctx.clearRect(leftMargin, topMargin, jw.gameWidth / 3, primaryFontSize);
			ctx.fillStyle = 'white';
			ctx.font = primaryFontSize + 'px ' + fontFamily;
			ctx.fillText(points + ' points', leftMargin, topMargin + 20);
		});
	}

	function renderRewinds(rewinds) {
		requestAnimationFrame(function () {
			ctx.clearRect(leftMargin + jw.gameWidth / 3, topMargin, 20, primaryFontSize);
			ctx.fillStyle = 'white';
			ctx.font = primaryFontSize + 'px ' + fontFamily;
			ctx.fillText(rewinds, leftMargin + jw.gameWidth / 3, topMargin + 20);
		});
	}

	function renderGameOver() {
		requestAnimationFrame(function () {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
			ctx.fillRect(0, 0, jw.gameWidth, jw.gameHeight);

			ctx.fillStyle = 'white';
			ctx.font = primaryFontSize + 'px ' + fontFamily;
			ctx.fillText('Game Over!', jw.gameWidth / 3, jw.gameHeight / 2);
		});
	}

	jw.hud = {
		renderPoints: renderPoints,
		renderGameOver: renderGameOver,
		renderRewinds: renderRewinds
	};
}());