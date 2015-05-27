var dgram = require("dgram");
var fs = require('fs');
var child = require('child_process');

console.log("= SUPERNOVA OBSERVER ACTIVATED");

var pulsar;
var server = dgram.createSocket("udp4");

server.on("listening", function () {
  var address = server.address();
  console.log("= OBSERVER LOOKING AT " +
    address.address + ":" + address.port);
});

server.on("error", function (err) {
  console.log("= OBSERVER CRASHED:\n" + err.stack);
  server.close();
  console.log("= dgram socket failure: " + err.stack);
});

server.on("message", function (msg, rinfo) {  
  server.recievedPulse = JSON.parse(msg);

  if (server.recievedPulse.supernova) {
    if (server.recievedPulse.action &&
        server.recievedPulse.action === "die") {
      
      console.log("= DIE RECIEVED");
      if (pulsar) {
        pulsar.kill('SIGTERM');
        pulsar = undefined;
      }
      process.exit();
    }

    if (!pulsar) {
      console.log("= SUPERNOVA DETECTED, starting Chrome containing PULSAR");
      
      var url = server.recievedPulse.baseURL;
      if (process.argv[2] && process.argv[3]) {
	      console.log("= SPAWNING AT GRID (" + process.argv[2] + ", " + process.argv[3] + ")");
	      url = url + "?col=" + process.argv[2] + "&row=" + process.argv[3];
      }
      
      pulsar = child.spawn("/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome", ['--start-fullscreen', '--noerrdialogs', '--disable-infobars', url]);

      pulsar.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
      });

      pulsar.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });

      pulsar.on('close', function (code) {
        console.log('= CHROME DIED, ERROR CODE: ' + code);
      });
    } else {
      console.log("= SUPERNOVA DETECTED, killing Chrome");
      pulsar.kill('SIGTERM');
      pulsar = undefined;
    }
  }
});

// stolen from http://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js
function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

server.bind(6661);