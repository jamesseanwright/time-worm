(function () {
	'use strict';

	var keyman = {
		up: { active: false, onDown: null, onUp: null },
		down: { active: false, onDown: null, onUp: null },
		left: { active: false, onDown: null, onUp: null },
		right: { active: false, onDown: null, onUp: null },
		space: { active: false, onDown: null, onUp: null, simultaneous: true }
	};

	var codeMapping = {
		38: 'up',
		40: 'down',
		37: 'left',
		39: 'right',
		32: 'space'
	};

	window.addEventListener('begingame', registerEvents);
	window.addEventListener('restartgame', registerEvents);
	window.addEventListener('gameover', onGameOver);

	function registerEvents() {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
	}

	function onGameOver() {
		window.removeEventListener('keydown', handleKeyDown);
		window.removeEventListener('keyup', handleKeyUp);

		Object.keys(keyman).forEach(function (keyProp) {
			var key = keyman[keyProp];
			key.active = false;
			key.onUp && key.onUp();
		});
	}

	function handleKeyDown(e) {
		var key = keyman[codeMapping[e.keyCode]];

		if (!key || key.active) return;

		!key.simultaneous && deactivateKeys();

		key.active = true;
		key.onDown && key.onDown();
	}

	function handleKeyUp(e) {
		var key = keyman[codeMapping[e.keyCode]];
		if (!key || !key.active) return;

		key.active = false;
		key.onUp && key.onUp();
	}

	function deactivateKeys() {
		for (var keyProp in keyman) {
			var key = keyman[keyProp];

			if (!key.simultaneous) {
				key.active = false;
				key.onUp && key.onUp();
			}
		}
	}

	window.jw.keyman = keyman;
}());