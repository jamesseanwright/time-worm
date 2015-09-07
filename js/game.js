(function () {
	'use strict';

	var maxRewinds = 2;

	jw.game = {
		points: 0,
		timeElapsed: 0,
		rewinds: 0,
		incrementPoints: function incrementPoints(points) {
			this.points += points;
			jw.hud.renderPoints(this.points);
		},

		incrementRewinds: function incrementRewinds() {
			if (this.rewinds < maxRewinds)
				this.rewinds++;

			this.canRewind = true;

			jw.hud.renderRewinds(this.rewinds);
		},

		decrementRewinds: function decrementRewinds() {
			if (this.canRewind)
				this.rewinds--;

			this.canRewind = this.rewinds > 0;

			jw.hud.renderRewinds(this.rewinds);
		},

		gameOver: function gameOver() {
			this.canRewind = false;
			jw.hud.renderGameOver();
		}
	};
}());