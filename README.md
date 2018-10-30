# Smart Door
This applicaion enables you to run the Smart Door server.

## Prerequisites 
Python2 and node-js(v8). Also requires `cmake` to be installed on the system.

## Steps to run the server
1. Follow the instaructions of [RaspAP](https://github.com/billz/raspap-webgui) and install. Restart the raspberry pi. <br>
This starts the hotspot named `raspi-webgui` with default password `ChangeMe`.
1. Clone the git repository <br>
`git clone https://github.com/mukkachaitanya/smartdoor-server SmartDoor`
git 
2. `cd SmartDoor` to move to the cloned directory.

2. Use `npm install` to install the nodejs dependencies
3. `npm run python-deps` to install the python dependencies.
4. `npm start` to start the server. 

Edit `config.json` to change the location of the python script, or the port of the server. (Default is set to work).

## Steps to run the app

1. Install the app given below.
1. Connect to the `rapap-webgui` network.
1. Change the ip and port of the server/Raspberry Pi in the settings menu<br>
Default ip is `10.3.141.1` and port `3002`
1. Use the app to open the door or do other admin activities (default admin username is `admin` and  password is `admin123`)


## Recgonition script

For information regarding adding or modifying the face recognition script have a look at the [README](./model/README.md) 

## Mobile App

Get the app here: [smartdoor.apk](https://drive.google.com/file/d/1WuvrzCNf8iuExqPViZNmu9k9DELu-W94/view?usp=sharing)

Run the server and make sure to take a note of the server's IP. Connect the mobile device to the same network as the server. Configure the IP and PORT of the server on the mobile app.