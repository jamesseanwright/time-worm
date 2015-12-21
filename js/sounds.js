(function () {
	'use strict';

	TIME_WORM.sounds = {
		play: function play(type) {
			var audio = new Audio(type + '.mp3');
			audio.play();
		}
	}
}());