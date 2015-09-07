(function () {
	'use strict';

	var lastUpdate = Date.now();
	var updateInterval = 10000;
	var laserInterval = 3000;
	var enemies = [];
	var width = 60;
	var height = 32;
	var speed = 7;
	var killedScore = 100;
	var sprite = new Image();
	var ctx = document.querySelector('#enemy').getContext('2d');
	var decelerationRate = 0;

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

	function addEnemy(x, y) {
		var newEnemy = {
			x: jw.gameWidth + width,
			y: Math.ceil(Math.random() * jw.gameHeight),

			onHit: function onHit() {
				this.dead = true;
				jw.game.incrementPoints(killedScore);
				jw.events.add('enemyDestroyed', {
					x: enemy.x,
					y: enemy.y
				});
			},

			onRewindStart: function onRewindStart() {
			},

			onRewindFrame: function onRewindFrame(data) {
				addEnemy(data.x, data.y);
			},

			onPlay: function onPlay() {
				decelerationRate = 0;
			}
		};

		enemies.push(newEnemy);
		jw.events.register('enemyDestroyed', newEnemy);
	}

	function nextFrame() {
		if (jw.game.isRewinding && decelerationRate < speed * 2)
			decelerationRate += 0.2

		if (!jw.game.isRewinding && Date.now() - lastUpdate > Math.ceil(Math.random() * updateInterval)) {
			addEnemy();
			lastUpdate = Date.now();
		}

		enemies = enemies.filter(function (enemy) {
			if (enemy.dead) {
				ctx.clearRect(enemy.x, enemy.y, width, height);
			}

			/* so enemies that have left the screen can
			 * subsequently be restored */
			if (enemy.x + width < -64) {
				jw.events.add('enemyDestroyed', {
					x: -64,
					y: enemy.y
				});
			}

			return !enemy.dead && enemy.x + width > 0;
		});

		enemies.forEach(function (enemy) {
			var isLaserInitial = (!enemy.lastLaser && enemy.x + width <= jw.gameWidth);

			ctx.clearRect(enemy.x, enemy.y, width, height);

			enemy.x -= speed - decelerationRate;

			if (!jw.game.isRewinding && (isLaserInitial || Date.now() - enemy.lastLaser > laserInterval)) {
				jw.laser.addBeam({
					x: enemy.x,
					y: enemy.y + 15,
					speed: -15,
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