Twitchext-Starter
=================

Twitchext Starter is a project that lets you get to the core of writing a new twitch extension without having to setup folder structure, creating default files and other tidious tasks. The idea is to get you up and running fast to start creating a new extension.


What's Included?
-----------------

- Frontend
    * Folder structure
    * Necessary JS files (viewer.js, config.js, jquery, bootstrap, etc.)
    * Necessary CSS files (viewer.css, config.css, etc.)
    * Necessary HTML files (viewer.html, config.html, etc.)
<br>

- Backend
    * Folder structure
    * HTTPS Express node server
    * Test routes with working examples in Twitchext-Starter/backend/api/routes/main.js
    * Test SSL Certs for HTTPS (required by Twitch) -> Twitchext-Starter/backend/certs
    * Script to generate your own SSL certs -> Twitchext-Starter/backend/certs/generate-test-certs.sh

Setup
------------

1. git clone https://github.com/ndangles/Twitchext-Starter.git



2. cd Twitchext-Starter/backend/



3. npm install



4. Create a Twitch extension and retrieve your extension's client_id, client_secret and jwt_secret. Then fill those values into the appropriate variables.

  - client_id & client_secret -> Twitchext-Starter/backend/api/routes/main.js
  - jwt_secret -> Twitchext-Starter/backend/config/variables.js

  Note: client_secret is only needed if you want to use the Oauth scopes. There is a route for this built into the project but this route path (https://localhost:8080/oauth) must also be configured in Twitch's console.



5. 'node app.js' in Twitchext-Starter/backend/ directory
