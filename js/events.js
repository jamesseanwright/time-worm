(function () {
	'use strict';

	var trackingThreshold = 5000;
	var events = [];
	var registrations = {};

	function invalidate() {
		events = events.filter(function (evt) {
			return Date.now() - evt.time <= trackingThreshold;
		});
	}

	function register(type, ref) {
		registrations[type] = ref;
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

		Object.keys(registrations).forEach(function (type) {
			registrations[type].onRewindStart();
		});

		events.forEach(function (evt) {
			setTimeout(registrations[evt.type].onRewindFrame.bind(registrations[type], evt.data), startTime - evt.time);
		});

		setTimeout(play, trackingThreshold);
	}

	function play() {
		Object.keys(registrations).forEach(function (type) {
			registrations[type].onPlay();
		});
	}

	jw.events = {
		add: add,
		register: register,
		rewind: rewind,
		play: play
	};
}());