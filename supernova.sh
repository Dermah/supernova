dest=/path/to/local/folder
remote=/path/to/remote/folder

if [ -d "$dest" ]; then
  rm -r "$dest"
fi

cd "$remote"

mkdir $dest
cp PULSAR.jar "$dest"
cp Pulsar.json "$dest/Pulsar-temp.json"
cd "$dest"
echo "Row?"
read row
echo "Column?"
read col
echo "TotalRows?"
read tRows
cat Pulsar-temp.json | sed "s/_1/$row/g" | sed "s/_2/$col/g" | sed "s/_3/$tRows/g" > Pulsar.json
java -jar PULSAR.jar
