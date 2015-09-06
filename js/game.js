(function () {
	'use strict';

	jw.game = {
		points: 0,
		timeElapsed: 0,
		rewinds: 2,
		incrementPoints: function incrementPoints(points) {
			this.points += points;
			jw.hud.renderPoints(this.points);
		},

		gameOver: function gameOver() {
			jw.hud.renderGameOver();
		}
	};
}());