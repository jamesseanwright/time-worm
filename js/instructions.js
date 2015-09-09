(function () {
	'use strict';

	var canvas = document.querySelector('#instructions');
	var player = document.querySelector('#player');
	var ctx = canvas.getContext('2d');
	var fontFamily = 'Courier New';
	var titleFontSize = 26;
	var mainFontSize = 20;
	var rightMargin = 50;
	var separator = 50;
	var textStart = 160;
	var controlsStart;

	canvas.addEventListener('click', function () {	
		jw.game.begin();
		canvas.style.display = 'none';
	});

	function render() {
		player.style.display = 'block';

		requestAnimationFrame(function () {
			ctx.font = mainFontSize + 'px ' + fontFamily;
			ctx.fillStyle = 'white';
			ctx.fillText('You are the Time Worm! Your job is to destroy', rightMargin, textStart);
			ctx.fillText('as many little grey men as possible. Your health', rightMargin, textStart + mainFontSize);
			ctx.fillText('is represented by the number of your body\'s,', rightMargin, textStart + mainFontSize * 2);
			ctx.fillText('segments plus your head. The only way to restore', rightMargin, textStart + mainFontSize * 3 );
			ctx.fillText('health is to rewind time. You can do so for up to', rightMargin, textStart + mainFontSize * 4);
			ctx.fillText('5 seconds. You can gain "rewinds" by collecting', rightMargin, textStart + mainFontSize * 5);
			ctx.fillText('the clocks.', rightMargin, textStart + mainFontSize * 6);

			controlsStart = textStart + mainFontSize * 6 + separator;

			ctx.font = titleFontSize + 'px ' + fontFamily;
			ctx.fillText('Controls', rightMargin, controlsStart);

			ctx.font = mainFontSize + 'px ' + fontFamily;
			ctx.fillText('Up - Move up', rightMargin, controlsStart + titleFontSize);
			ctx.fillText('Down - Move down', rightMargin, controlsStart + titleFontSize * 2);
			ctx.fillText('Space - Fire', rightMargin, controlsStart + titleFontSize * 3);
			ctx.fillText('Left - Rewind time for 5 seconds', rightMargin, controlsStart + titleFontSize * 4);
		
			ctx.font = titleFontSize + 'px ' + fontFamily;
			ctx.fillText('Click to begin!', jw.gameWidth - rightMargin - 300, controlsStart);

		});
	}

	jw.instructions = {
		render: render
	};
}());