#!/bin/bash
if test "$#" -ne 2; then
	echo "Usage: ./node-bootstrap.sh /path/to/working/folder /path/to/listener.js "
	echo "For example:"
	echo "./node-bootstrap.sh /Volumes/Data/ /Volumes/Transit/PULSAR/listener.js "
	exit
fi

echo "- CREATING SUPERNOVA OBSERVER"

mkdir $1
cd $1

cp $2 ./

mkdir $1/nodeBin
cd $1/nodeBin

curl -O http://nodejs.org/dist/v0.12.0/node-v0.12.0-darwin-x64.tar.gz
tar -xf node-v0.12.0-darwin-x64.tar.gz 
cd node-v0.12.0-darwin-x64/bin

cd $1

ln -s ./nodeBin/node-v0.12.0-darwin-x64/bin/node ./node

echo "- SUCCESS, RUNNING SUPERNOVA OBSERVER"

./node $1/listener.js

echo "- SUPERNOVA OBSERVER DESTROYED"
