#!/bin/bash

# due to declarative nature of code, scripts
# must be compiled in this order :( :(

SIZE_LIMIT=13312

if [! -e dist]
then
	mkdir dist
	mkdir dist/js
	mkdir dist/img
fi

uglifyjs js/{init,title,instructions,game,clock,hud,keyman,events,background,laser,enemy,player}.js > dist/js/time-worm.min.js
cp index.html dist/
cp -R img dist/img/

echo "Distributable output to dist dir. Creating archive..."
zip -r time-worm dist
SIZE=$(stat -c%s time-worm.zip)
echo "Created time-worm.zip. Compressed size is $SIZE"