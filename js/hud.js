(function () {
	'use strict';

	var canvas = document.querySelector('#hud');
	var ctx = canvas.getContext('2d');
	var topMargin = 25;
	var leftMargin = 50;
	var primaryFontSize = 32;
	var subtitleFontSize = 28;
	var fontFamily = 'Courier New';

	window.addEventListener('begingame', drawClock);
	window.addEventListener('restartgame', drawClock);

	function drawClock() {
		requestAnimationFrame(function () {
			ctx.drawImage(TIME_WORM.clock.sprite, (leftMargin + TIME_WORM.gameWidth / 3) + 25, topMargin - 3, TIME_WORM.clock.spriteSize, TIME_WORM.clock.spriteSize);
		});
	}
	
	function renderPoints(points) {
		requestAnimationFrame(function () {
			ctx.clearRect(leftMargin, topMargin, TIME_WORM.gameWidth / 3, primaryFontSize);
			ctx.fillStyle = 'white';
			ctx.font = primaryFontSize + 'px ' + fontFamily;
			ctx.fillText(points + ' points', leftMargin, topMargin + 20);
		});
	}

	function renderRewinds(rewinds) {
		requestAnimationFrame(function () {
			ctx.clearRect(leftMargin + TIME_WORM.gameWidth / 3, topMargin, 20, primaryFontSize);
			ctx.fillStyle = 'white';
			ctx.font = primaryFontSize + 'px ' + fontFamily;
			ctx.fillText(rewinds, leftMargin + TIME_WORM.gameWidth / 3, topMargin + 20);
		});
	}

	function renderGameOver() {
		requestAnimationFrame(function () {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
			ctx.fillRect(0, 0, TIME_WORM.gameWidth, TIME_WORM.gameHeight);

			ctx.fillStyle = 'white';
			ctx.font = primaryFontSize + 'px ' + fontFamily;
			ctx.fillText('Game Over!', TIME_WORM.gameWidth / 3 + 30, TIME_WORM.gameHeight / 2);

			ctx.font = subtitleFontSize + 'px ' + fontFamily;
			ctx.fillText('Click to replay!', TIME_WORM.gameWidth / 3 - 5, TIME_WORM.gameHeight / 2 + primaryFontSize);
		});

		canvas.addEventListener('click', restartGame);
	}

	function restartGame() {
		ctx.clearRect(0, 0, TIME_WORM.gameWidth, TIME_WORM.gameHeight);
		TIME_WORM.game.restart();
		canvas.removeEventListener('click', restartGame);
	}

	TIME_WORM.hud = {
		renderPoints: renderPoints,
		renderGameOver: renderGameOver,
		renderRewinds: renderRewinds
	};
}());