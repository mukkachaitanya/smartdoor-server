# Smart Door
This applicaion enables you to run the Smart Door server.

## Prerequisites 
Python2 and node-js(v8). Also requires `cmake` to be installed on the system.

## Steps
1. Clone the git repository <br>
`git clone https://github.com/mukkachaitanya/smartdoor-server SmartDoor`
git 
2. `cd SmartDoor` to move to the cloned directory.

2. Use `npm install` to install the nodejs dependencies
3. `npm install python-deps` to install the python dependencies.
4. `npm start` to start the server


Edit `config.json` to change the location of the python script. (Default is set to work).

## Recgonition script

For information regarding adding or modifying the face recognition script have a look at the [README](./model/README.md) 

## Mobile App

Get the app here: [smartdoor.apk](https://drive.google.com/file/d/1WuvrzCNf8iuExqPViZNmu9k9DELu-W94/view?usp=sharing)

Run the server and make sure to take a note of the server's IP. Connect the mobile device to the same network as the server. Configure the IP and PORT of the server on the mobile app.