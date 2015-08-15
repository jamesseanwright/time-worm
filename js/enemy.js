(function () {
	'use strict';

	var lastUpdate = Date.now();
	var updateInterval = 10000;
	var enemies = [];
	var width = 50;
	var height = 50;
	var speed = 5;

	var enemy = {
		getByPosition: getByPosition
	};

	function getByPosition(x, y, sourceHeight) {
		return enemies.filter(function (enemy) {
			return x >= enemy.x
				&& y >= enemy.y
				&& y + sourceHeight <= enemy.y + height;
		})[0];
	}

	function nextFrame() {
		if (Date.now() - lastUpdate > Math.ceil(Math.random() * updateInterval)) {
			enemies.push({
				x: jw.gameWidth + width,
				y: Math.ceil(Math.random() * jw.gameHeight)
			});

			lastUpdate = Date.now();
		}

		enemies = enemies.filter(function (enemy) {
			if (enemy.dead) {
				jw.ctx.clearRect(enemy.x, enemy.y, width, height);
			}

			return !enemy.dead && enemy.x + width > 0;
		});

		enemies.forEach(function (enemy) {
			jw.ctx.clearRect(enemy.x, enemy.y, width, height);
			enemy.x -= speed;
			jw.ctx.fillStyle = 'red';
			jw.ctx.fillRect(enemy.x, enemy.y, width, height);
		});

		requestAnimationFrame(nextFrame);
	}

	requestAnimationFrame(nextFrame);

	jw.enemy = enemy;
}());