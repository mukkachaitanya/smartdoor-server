# Smart Door FaceRecognition
This app is used in the working of Smart Door application. Scanning your facial image through this app which will be connected to the house network will help you unlock the door.

## System Requirements
- cmake

Install cmake by running `sudo apt-get -y install cmake` or whatever command that works for you. Just make sure that cmake is installed in your system.

## Python Requirements
- face_recognition
- numpy

## How to Run?
- To run the code through terminal, run the `fac_reg.py` file using python2 with the image file location as the command line argument. Ex - `python2 fac_reg.py unknown_images/img4.jpg`
- To add a new image in the database, add the image in the folder named `known_images` and run the `add.py` file using `python2 add.py` command.
