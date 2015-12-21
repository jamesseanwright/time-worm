(function () {
	'use strict';

	var beginEvent = new Event('begingame');
	var gameOverEvent = new Event('gameover');
	var restartEvent = new Event('restartgame');

	TIME_WORM.game = {
		points: 0,
		rewinds: 0,
		initialPoints: 0,
		initialRewinds: 1,
		maxRewinds: 2,
		isRewinding: false,
		incrementPoints: function incrementPoints(points) {
			this.points += points;
			TIME_WORM.hud.renderPoints(this.points);
		},

		resetPoints: function incrementPoints(points) {
			this.points = this.initialPoints;
			TIME_WORM.hud.renderPoints(this.points);
		},

		resetRewinds: function setRewinds() {
			this.rewinds = this.initialRewinds;
			this.canRewind = true;
			TIME_WORM.hud.renderRewinds(this.rewinds);
		},

		incrementRewinds: function incrementRewinds() {
			if (this.rewinds < this.maxRewinds)
				this.rewinds++;

			this.canRewind = true;
			TIME_WORM.hud.renderRewinds(this.rewinds);
		},

		decrementRewinds: function decrementRewinds() {
			if (this.canRewind)
				this.rewinds--;

			this.canRewind = this.rewinds > 0;
			TIME_WORM.hud.renderRewinds(this.rewinds);
		},

		gameOver: function gameOver() {
			this.canRewind = false;

			if (this.isRewinding)
				TIME_WORM.events.play();

			window.dispatchEvent(gameOverEvent);
			TIME_WORM.hud.renderGameOver();
		},

		begin: function begin() {
			var gameCanvases = document.querySelectorAll('.game-canvas');

			for (var i = 0; i < gameCanvases.length; i++)
				gameCanvases[i].style.display = 'block';

			window.dispatchEvent(beginEvent);
		},

		restart: function restart() {
			this.resetPoints();
			this.resetRewinds();
			window.dispatchEvent(restartEvent);
		}
	};
}());