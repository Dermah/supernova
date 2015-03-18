dest=/path/to/local/folder

cd $dest

curl -O http://nodejs.org/dist/v0.12.0/node-v0.12.0-darwin-x64.tar.gz
tar -xvf node-v0.12.0-darwin-x64.tar.gz 
cd node-v0.12.0-darwin-x64

PATH=$PATH:$(pwd)