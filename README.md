# supernova
A disseminator for COFA computers

## What?

This is a bunch of scripts that was used to more easily run [PULSAR](http://pulsar.dermah.org) on computers at COFA (UNSW Art & Design). Basically, client scripts wait for a signal from the master script, upon which they run a Terminal command. Upon a second signal, the client script kills the terminal command and waits for more signals. 

These scripts are very much tailored to run on COFA computers. I don't recommend using them without severe modifications.
