# Basiclly From
https://github.com/NAT2K15/database-backup

# SQL Backup manager
A simple script that was made in JS. Using public npm modules to help servers save all their player's databases just in case anything gets deleted within the server. Such as a modder or loss of credentials.

# Features
* Sends to discord via webhook
* Easy to setup
* Saves locally (aka files)
* Time can be changed within config (default is 30min)

# Photo
![Photo](https://forum.cfx.re/uploads/default/original/4X/2/8/e/28e27390ffcfc971a207dc044edd6a77ef691a01.png)

# Edited
* No spamming of SQL files (only the last SQL backup in the SQL folder on the server is retained, and the old ones are automatically deleted).
* The console is not integrated into the FiveM resource, it remains separate.

# How To Install
* Install : npm install
* Settings : Config.json
* Run : node index.js
* Note : Dont delete sql folder