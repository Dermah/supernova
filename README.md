# supernova
A broadcaster and receiver for COFA computers

![A grid of screens observing a supernova](http://pulsar.dermah.org/supernova.jpg)

## What?

This is a bunch of scripts that was used to more easily run [PULSAR](http://pulsar.dermah.org) on computers at COFA (UNSW Art & Design). Basically, client scripts wait for a signal from the master script, upon which they run a Terminal command. Upon a second signal, the client script kills the terminal command and waits for more signals. 

These scripts are very much tailored to run on COFA computers. I don't recommend using them without severe modifications.

In more detail here's what happens:

- A bootstrap script asks for the client computer's position in a screen array (Column and Row)
- The bootstrap sctipt downloads and extracts [node](http://nodejs.org)
- The bootstrap script runs the `observer.js` node script
- `observer.js` waits for a UDP packet from the master `supernova.js` script
- When it recieves a packet, the observer launches chrome. The next time it recieves a packet, it kills chrome. 

## How?

Steps to get this up and running at COFA:

- Put `supernova.app` on your Desktop for easy access when logging in to a computer.
  - It also helps to make this app a startup item so that it runs as soon as you log in
- Copy `node-bootstrap.sh` to your home directory (i.e. the `~` directory)
  - Comment out lines 9 to 14 if you don't need to provide arguments to the observer script
- Copy `observer.js` to your home directory (i.e. the `~` directory)
  - You can change line 47 to be whatever terminal command or script that you want. 
- Log in to all your client computers and run `supernova.app`
- Run the app on your master computer but kill the process after it starts observing. 
- On the master computer, run `./node supernova.js {url}` where `{url}` is the URL of where you want all the computers to look when a supernova occurs.
- Press any key to open chrome on all computers. Press any key to kill chrome everywhere. Press Control-C to kill `supernova.js` everywhere