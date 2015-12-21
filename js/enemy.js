(function () {
	'use strict';

	var lastUpdate = Date.now();
	var updateInterval = 10000;
	var laserInterval = 3000;
	var amnesty = 0;
	var enemies = [];
	var width = 60;
	var height = 32;
	var speed = 7;
	var killedScore = 100;
	var sprite = new Image();
	var ctx = document.querySelector('#enemy').getContext('2d');
	var decelerationRate = 0;

	sprite.src = 'enemy.png';

	var enemy = {
		getByPosition: getByPosition,
		onRewindFrame: onRewindFrame,
		onPlay: onPlay
	};

	window.addEventListener('restartgame', function () {
		enemies = [];

		requestAnimationFrame(function () {
			ctx.clearRect(0, 0, TIME_WORM.gameWidth, TIME_WORM.gameHeight);
		});
	});

	function onRewindFrame(evt) {
		if (evt.type === 'enemyLeftScreen') {
			addEnemy(evt.data.x, evt.data.y);
		}
	}

	function onPlay() {
		amnesty = TIME_WORM.events.trackingThreshold; // so no more enemies are added until caught up with the present
		decelerationRate = 0;

		setTimeout(function () {
			amnesty = 0;
		}, amnesty);
	}

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
			x: x || TIME_WORM.gameWidth + width,
			y: y || Math.ceil(Math.random() * TIME_WORM.gameHeight),

			onHit: function onHit() {
				this.dead = true;
				TIME_WORM.game.incrementPoints(killedScore);
				TIME_WORM.events.add('enemyDestroyed', {
					x: enemy.x,
					y: enemy.y
				});
			}
		};

		enemies.push(newEnemy);
	}

	function nextFrame() {
		if (TIME_WORM.game.isRewinding && decelerationRate < speed * 2)
			decelerationRate += 0.4

		if (!TIME_WORM.game.isRewinding && Date.now() - lastUpdate > Math.ceil(Math.random() * updateInterval) + amnesty) {
			addEnemy();
			lastUpdate = Date.now();
		}

		enemies = enemies.filter(function (enemy) {
			if (enemy.dead) {
				ctx.clearRect(enemy.x, enemy.y, width, height);
			}

			/* so enemies that have left the screen can
			 * subsequently be restored */

			if (enemy.x + width < -(width)) {
				TIME_WORM.events.add('enemyLeftScreen', {
					x: -(width),
					y: enemy.y
				});
			}

			return !enemy.dead && enemy.x + width > -1 - width;
		});

		enemies.forEach(function (enemy) {
			var isLaserInitial = (!enemy.lastLaser && enemy.x + width <= TIME_WORM.gameWidth);
			ctx.clearRect(enemy.x - speed - decelerationRate, enemy.y, width + speed + decelerationRate, height);
			enemy.x -= speed - decelerationRate;

			if (!TIME_WORM.game.isRewinding && (isLaserInitial || Date.now() - enemy.lastLaser > laserInterval)) {
				TIME_WORM.laser.addBeam({
					x: enemy.x,
					y: enemy.y + 15,
					speed: -15,
					target: 'player',
					isRewindable: true
				});

				enemy.lastLaser = Date.now();
			}

			ctx.drawImage(sprite, enemy.x, enemy.y, width, height);
		});

		requestAnimationFrame(nextFrame);
	}

	window.addEventListener('begingame', function () {
		requestAnimationFrame(nextFrame);
	});

	TIME_WORM.events.register('enemyAmnesty', enemy);
	TIME_WORM.events.register('enemyDestroyed', enemy);
	TIME_WORM.events.register('enemyLeftScreen', enemy);

	TIME_WORM.enemy = enemy;
}());