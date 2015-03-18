if test "$#" -ne 1; then
	echo "Usage: ./node-bootstrap.sh /path/to/local/folder/for/node"
	exit
fi

mkdir $1
cd $1

curl -O http://nodejs.org/dist/v0.12.0/node-v0.12.0-darwin-x64.tar.gz
tar -xvf node-v0.12.0-darwin-x64.tar.gz 
cd node-v0.12.0-darwin-x64

# does not persist outside of this script
PATH=$PATH:$(pwd)

npm