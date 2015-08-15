(function () {
	'use strict';

	var keyman = {
		up: { active: false, onDown: null, onUp: null },
		down: { active: false, onDown: null, onUp: null },
		left: { active: false, onDown: null, onUp: null },
		right: { active: false, onDown: null, onUp: null }
	};

	window.addEventListener('keydown', handleKeyDown);
	window.addEventListener('keyup', handleKeyUp);

	function handleKeyDown(e) {
		var key = keyman[e.keyIdentifier.toLowerCase()];
		if (!key || key.active) return;

		key.active = true;
		key.onDown && key.onDown();
	}

	function handleKeyUp(e) {
		var key = keyman[e.keyIdentifier.toLowerCase()];
		if (!key || !key.active) return;

		key.active = false;
		key.onUp && key.onUp();
	}

	window.keyman = keyman;
}());