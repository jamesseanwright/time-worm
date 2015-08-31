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
		events.push({
			type: type,
			data: data,
			time: Date.now()
		});

		console.log('new event tracked!', {
			type: type,
			data: data,
			time: Date.now()
		});
	}

	function rewind(type) {
		var startTime;

		invalidate();

		Object.keys(registrations).forEach(function (type) {
			registrations[type].onRewindStart();
		});

		events.forEach(function (evt) { 

		});
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