#!/bin/bash

SIZE_LIMIT=13312
COMPRESSION_REPORT=COMPRESSION.md

if [ -e dist ]
then
	rm -R dist/
fi

if [ -e time-worm.zip ]
then
	rm time-worm.zip
fi

if [ -e $COMPRESSION_REPORT ]
then
	rm $COMPRESSION_REPORT
fi


mkdir dist

# due to declarative nature of code, scripts
# must be compiled in this order :( :(
uglifyjs --screw-ie8 --mangle --reserved jw js/{init,title,instructions,game,clock,hud,keyman,events,background,sounds,laser,enemy,player}.js > dist/time-worm.min.js
cp index.html dist/
cp -R img/* dist
cp -R sounds/* dist

echo "Distributable output to dist dir. Creating archive..."
zip -9 -j -D -X -r time-worm dist/*
SIZE=$(stat -c%s time-worm.zip)
echo "Created time-worm.zip. Compressed size is $SIZE. The max allowed by the rules is $SIZE_LIMIT."
echo "Writing compression report..."
touch $COMPRESSION_REPORT
echo "# Compression Report" >> $COMPRESSION_REPORT
echo "" >> $COMPRESSION_REPORT
date >> $COMPRESSION_REPORT
echo "<br />Zipped size: $SIZE" >> $COMPRESSION_REPORT
echo "<br />Maximum allowed size: $SIZE_LIMIT" >> $COMPRESSION_REPORT
echo "Done! Written to $COMPRESSION_REPORT"