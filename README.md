<!-- @format -->

# md-workflow-mdreact-84

MD Workflow using the MD React Framework

Now handles automated promotions

How to run locally:
Prepare these files for local setup (search for Uncomment):

- startup.json
  PROD:
  "deploymentMode": "server",
  "apiPath": ""
  LOCAL:
  "deploymentMode": "local",
  "apiPath": "http://dev.mdcms.ch:2500/"

- webpack.config.js
  PROD:
  filename: "[name].bundle.js",
  LOCAL:
  filename: '[name].bundle.[contenthash].js', //Uncomment for LOCAL

- mdlicense-app.js
  PROD:
  if (
  serializedState != null &&
  JSON.parse(serializedState).topbarReducer &&
  JSON.parse(serializedState).topbarReducer.version != data.Build) {
  LOCAL:
  if (
  serializedState != null &&
  JSON.parse(serializedState).topbarReducer &&
  // Uncomment for LOCAL
  true){

- SessionInfoActions.js
  PROD:

  LOCAL:
  // Uncomment for LOCAL
  setCookie('SessionID',`1-${response.data.jobnumber}`,86400 _ 30);
  setCookie('UserID', `dummy`, 86400 _ 30);

- go to root directory mdlicense-v2
- run > npm install http-server -g
- run > npm install
- run > npm run build

- run either from terminal or from cmd prompt with admin rights > http-server
- run from cmd prompt with admin rights (depending where your Chrome browser is installed) >  
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
  or
  "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

- use one of the addresses where you run the http-server, copy it into the browser -> select the dist folder, the app should come up
  usual addresses:
- http://192.168.68.106:8080
- http://127.0.0.1:8080

Usual development of new screen:

- create RES\_ function xml with mdcmsFunctionLoad app
  https://gitlab.com/mdlicense/mdcmsFunctionLoad.git

- generate pageComponent and pageSchema with mdreact-utils app
  https://gitlab.com/mdreact/mdreact-utils.git
  therefore copy the appropriate RES\_ file to the xmlRes first

- copy the newly created pageComponent and pageSchema file for the screen
  to the baseTemplates, pageComponents folder in md-workflow-mdreact-84 app
  and add the screen also to the pageRenderer.js

- for special cases do some coding according to it

Building and deploying to the test instance:

The new build version can be seen in build.json file:
e.g. {"Version":"v2.0.0","Build":"4028e4","Build Date":"2021-11-10"}

Be sure before run build for the test instance to revert all the changes that were done for local development.
Revert the following files:

- startup.json
- webpack.config.js
- mdlicense-app.js
- SessionInfoActions.js

do run the build again > npm run build

Deploying to TEST system with command:

Change startup.json:
"environment": "T84",

> scp -P 2522 -r dist/\* <username>@dev.mdcms.ch:/www/<path>/app/

or (not tried)

> scp -r dist/\* <username>@192.168.3.100:/www/<path>/app/

The application will automatically because of the build.json loaded on the server

Deploying to PROD system with command:

Change startup.json:
"environment": "????",

> scp -P 2522 -r dist/\* <username>@dev.mdcms.ch:/www/<path>/app/
