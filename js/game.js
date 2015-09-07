(function () {
	'use strict';

	jw.game = {
		points: 0,
		timeElapsed: 0,
		rewinds: 0,
		maxRewinds: 2,
		isRewinding: false,
		incrementPoints: function incrementPoints(points) {
			this.points += points;
			jw.hud.renderPoints(this.points);
		},

		incrementRewinds: function incrementRewinds() {
			if (this.rewinds < this.maxRewinds)
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

			if (this.isRewinding)
				jw.events.play();

			jw.hud.renderGameOver();
		}
	};
}());