if test "$#" -ne 2; then
	echo "Usage: ./node-bootstrap.sh /path/to/working/folder /path/to/listener.js "
	echo "For example:"
	echo "./node-bootstrap.sh /Volumes/Data/ /Volumes/Transit/PULSAR/listener.js "
	exit
fi

mkdir $1
cd $1

cp $2 ./

mkdir $1/node
cd $1/node

curl -O http://nodejs.org/dist/v0.12.0/node-v0.12.0-darwin-x64.tar.gz
tar -xf node-v0.12.0-darwin-x64.tar.gz 
cd node-v0.12.0-darwin-x64/bin

# does not persist outside of this script
PATH=$PATH:$(pwd)

cd $1

node $1/listener.js
