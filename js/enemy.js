(function () {
	'use strict';

	var lastUpdate = Date.now();
	var updateInterval = 10000;
	var laserInterval = 2000;
	var enemies = [];
	var width = 60;
	var height = 32;
	var speed = 7;
	var sprite = new Image();
	var ctx = document.querySelector('#enemy').getContext('2d');

	sprite.src = 'img/enemy.png';

	var enemy = {
		getByPosition: getByPosition
	};

	function getByPosition(x, y, sourceWidth, sourceHeight) {
		return enemies.filter(function (enemy) {
			return x + sourceWidth >= enemy.x
				&& x <= enemy.x + width
				&& y >= enemy.y
				&& y + sourceHeight <= enemy.y + height;
		})[0];
	}

	function nextFrame() {
		if (Date.now() - lastUpdate > Math.ceil(Math.random() * updateInterval)) {
			enemies.push({
				x: jw.gameWidth + width,
				y: Math.ceil(Math.random() * jw.gameHeight),
				onHit: function () {
					this.dead = true;
				}
			});

			lastUpdate = Date.now();
		}

		enemies = enemies.filter(function (enemy) {
			if (enemy.dead) {
				ctx.clearRect(enemy.x, enemy.y, width, height);
			}

			return !enemy.dead && enemy.x + width > 0;
		});

		enemies.forEach(function (enemy) {
			ctx.clearRect(enemy.x, enemy.y, width, height);
			enemy.x -= speed;

			if (!enemy.lastLaser || Date.now() - enemy.lastLaser > laserInterval) {
				jw.laser.addBeam({
					x: enemy.x,
					y: enemy.y + 15,
					speed: -20,
					target: 'player'
				});

				enemy.lastLaser = Date.now();
			}

			ctx.drawImage(sprite, enemy.x, enemy.y, width, height);
		});

		requestAnimationFrame(nextFrame);
	}

	window.addEventListener('load', function () {
		requestAnimationFrame(nextFrame);
	});

	jw.enemy = enemy;
}());