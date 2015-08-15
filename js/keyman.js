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

		deactivateKeys();

		key.active = true;
		key.onDown && key.onDown();
	}

	function handleKeyUp(e) {
		var key = keyman[e.keyIdentifier.toLowerCase()];
		if (!key || !key.active) return;

		key.active = false;
		key.onUp && key.onUp();
	}

	function deactivateKeys() {
		for (var keyProp in keyman) {
			var key = keyman[keyProp];
			key.active = false;
			key.onUp && key.onUp();
		}
	}

	window.jw.keyman = keyman;
}());