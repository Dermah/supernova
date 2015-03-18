var dgram = require("dgram");

var server = dgram.createSocket("udp4");

server.on("listening", function () {
  var address = server.address();
  //console.log("server listening " +
  //  address.address + ":" + address.port);
});

server.on("error", function (err) {
  //console.log("server error:\n" + err.stack);
  server.close();
  cb("dgram socket failure: " + err.stack);
  expect().fail("dgram socket failure");
});

server.on("message", function (msg, rinfo) {  
  server.recievedPulse = JSON.parse(msg);

  if () {

  }

});

server.bind(6661);
