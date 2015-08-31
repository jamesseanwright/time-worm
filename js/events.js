(function () {
	'use strict';

	var trackingThreshold = 5000;
	var events = [];

	function invalidate() {
		events = events.filter(function (evt) {
			return Date.now() - evt.time <= trackingThreshold;
		});
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

	function get() {
		invalidate();
		return events;
	}

	jw.events = {
		add: add,
		get: get
	};
}());