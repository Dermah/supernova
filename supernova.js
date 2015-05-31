tty = require('tty');
 
var dgram = require('dgram');

if (!process.argv[2]) {
	console.log("You didn't specify a baseURL on the command line :(");
 	console.log("e.g. node broadcaster.js http://149.171.249.236");
	process.exit();
}

console.log("= RUNNING SUPERNOVA");

var client = dgram.createSocket("udp4", function() { 
});

client.bind(function() {
  client.setBroadcast(true);
  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on( 'data', function( key ){
    
    process.stdout.write("= Pressed " + key + " : " );

    // ctrl-c ( end of text )
    if ( key === '\u0003' ) {

      var signal = new Buffer(JSON.stringify({
        supernova: "0.0.1",
        action: "die"
      }));

      client.send(signal, 0, signal.length, 6661, "255.255.255.255", function(err, bytes) {
        console.log("= SENT 'die'");
        client.close();
        process.exit();
      });
    } else {
      var signal = new Buffer(JSON.stringify({
        supernova: "0.0.1",
        action: "restart",
        baseURL: process.argv[2] 
      }));

      client.send(signal, 0, signal.length, 6661, "255.255.255.255", function(err, bytes) {
        console.log("Sent restart packet");
      });
    }
  });
});