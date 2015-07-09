Welcome to Proximity-core!
===================
This repository contains the server layer of the 'Proximity' project 

----------

#### <i class="icon-file"></i> Run the project
-------------

> - Clone the project: 
	> git clone https://github.com/jgabriellima/proximity.git
> - Install dependencies: 
	> npm install
> - Run: 
	> sails lift	

#### <i class="icon-hdd"></i> Resources
-------------
> **Url**: localhost:1337/ 

beacon/createbeacon
> **Parameters**: 
> **id**: It is the beacon code
> **Return**: 
> return the user created
> **example**: localhost:1337/beacon/createbeacon?id=5591981921303

beacon/createuser
> **Parameters**: 
> **number**: It is the user cel number 
 > **Return**: 
> return the beacon created
> **example**: localhost:1337/beacon/createuser?number=5591981921303


beacon/receivebeacon
> **Parameters**: 
> **iduser**: It is the user cel number 
> **idbeacon**: It is the beacon code
 > **Return**: 
> returns the record containing the beacon and the user

beacon/userstatus
 > **Return**: 
> returns the user list with the history of all notifications (healthy or sick)

beacon/usersbeacons
 > **Return**: 
> returns the user list with all beacons that this user found

beacon/users
 > **Return**: 
> list all users of the system

beacon/beacons
 > **Return**: 
> list all beacons of the system
