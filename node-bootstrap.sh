if test "$#" -ne 1; then
	echo "Usage: ./node-bootstrap.sh /path/to/local/folder/for/node"
	exit
fi

cd /Volumes/Data/
mkdir PULSAR
cd PULSAR

cp /Volumes/Transit/PULSAR/listener.js ./

dir=$(pwd)

mkdir $1
cd $1

# curl -O http://nodejs.org/dist/v0.12.0/node-v0.12.0-darwin-x64.tar.gz
tar -xf node-v0.12.0-darwin-x64.tar.gz 
cd node-v0.12.0-darwin-x64/bin

# does not persist outside of this script
PATH=$PATH:$(pwd)

cd $dir

node $dir/listener.js
