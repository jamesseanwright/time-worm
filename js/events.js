(function () {
	'use strict';

	var trackingThreshold = 5000;
	var events = [];
	var registrations = {};

	window.addEventListener('restartgame', function () {
		events = [];
	});

	function invalidate() {
		events = events.filter(function (evt) {
			return Date.now() - evt.time <= trackingThreshold;
		});
	}

	function register(type, ref) {
		registrations[type] = ref;
	}

	function registerMultiple(type, ref) {
		registrations[type] = registrations[type] && registrations[type].length ? registrations[type].concat(ref) : [ref];
	}

	function add(type, data) {
		invalidate();

		events.push({
			type: type,
			data: data,
			time: Date.now()
		});
	}

	function rewind(type) {
		var startTime = Date.now();
		jw.game.isRewinding = true;
		jw.game.decrementRewinds();

		Object.keys(registrations).forEach(function (type) {
			registrations[type].onRewindStart && registrations[type].onRewindStart();
		});

		events.forEach(function (evt) {
			var ref = registrations[evt.type];

			if (ref.onRewindFrame)
				setTimeout(registrations[evt.type].onRewindFrame.bind(registrations[type], evt), startTime - evt.time);
		});

		setTimeout(play, trackingThreshold);
	}

	function play() {
		jw.game.isRewinding = false;

		Object.keys(registrations).forEach(function (type) {
			registrations[type].onPlay && registrations[type].onPlay();
		});
	}

	jw.events = {
		add: add,
		register: register,
		registerMultiple: registerMultiple,
		rewind: rewind,
		play: play,
		trackingThreshold: trackingThreshold
	};
}());