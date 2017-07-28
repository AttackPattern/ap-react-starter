![react 15.6](https://img.shields.io/badge/react-15.6-blue.svg?style=flat)
![webpack 2](https://img.shields.io/badge/webpack-2-blue.svg?style=flat)
![react-router 4](https://img.shields.io/badge/react--router-4-blue.svg?style=flat)
![Node 8](https://img.shields.io/badge/node-8-blue.svg?style=flat)
![Universal Javascript](https://img.shields.io/badge/universal--javascript-yes-brightgreen.svg?style=flat)

![Open Source](https://img.shields.io/badge/open_source-yes-brightgreen.svg?style=flat)

Attack Pattern React baseline
===
This is the attack pattern baseline repo for our web apps.  There was some difficulty in finding solid start repos using latest react with React 15.6, Webpack2, React Router 4 and server side rendering. this repo is setup to run on docker or azure.
____

Core Technologies
---
* react 15.6
* react-router 4
* redux
* SASS
* Express w/ server side rendering (or if you're cool, universal javascript app)
* webpack 2
  * webpack hot reloading
* babel w/ es6/es7 features
* docker
* node 8 (should work fine on 6 LTS though)

How to run
---
First clone the repo - if you copy it elsewhere make SURE the **.babelrc** file comes along, it's critical. From there you have 2 paths. If you want to run it locally, from the root of the repo in a command prompt run the following:
* Development (hot reloading)
  * For docker run `docker-compose build` followed by `docker-compose up`
  * To run locally first run `npm install` followed by `npm run-script dev` upon successful npm install - *note this assumes you have node 8 installed, if it's not I'd highly reccomend installing [nvm](https://github.com/creationix/nvm)
* Production
  * The docker file is setup to run on port 3000 so simply build and start the docker container
  * For Azure see below as it's a bit more involved.
  * To run from any old vm (that has node 8 installed) run from the root directory
    * `npm install`
    * `npm install -g webpack`
    * `webpack`
    * `npm run prod`

Please note that if you try to test your production config locally in docker by say changing the docker-compose run command from `npm run dev` to `npm start` the server will fail to start if you haven't run webpack to generate the asset files.  This is the purpose of the `npm run prod` over `npm start`.  Now why not just have the prod config in npm start?  well Azure by default just runs your `npm start` script and it doesn't like && in a command (as of this writing).  So we leave `npm start` for azure since we can easily edit our Dockerfile to finalize with a `npm run prod`

How to Edit
---
### Index file
The index file is sitting in `app/server.jsx`.  if you need to edit meta data this is the place to do it.  The core of the app is in:
```
<div id="main" >
  <div dangerouslySetInnerHTML={{ __html: markup.app }} />
</div>
```
All of this is server side rendered, including your data that will be pre-populated in your stores.  There is a crappy example of an unused path that shows how the data is dumped to bootstrap your stores in `server/routes/app.js`
### Views
views are in `app/components`.  common components should be placed in the common folder, and the `index.js` file updated to bucketize them (see example Footer).  

The root view is in `app/components/AppRoot.jsx`.  From there all of the components render, so this is your 'root template' file persay.  You might think server.jsx is, but your wrong.  Sorry not sorry.  If you want global navigation/footer this is the place to put it - above or below the `{this.props.chidlren}`. Everything else is determined by the path fed into react-router (see below).
### Styles
Add whatever style files/folder structure you want under `app/styles`.  Any file added needs to be appended (or however you want it to cascade) to `app/styles/main.scss`.  the main.scss file is required in `app/client.jsx` as that's what tells webpack to pick it up, but client.jsx is rendered client side as server side rendered content doesn't need css.
### Data/redux
More on this soon.  see `app/actions`, `app/reducers`, and `app/sources` for more examples.  I need to add in an example of the ES7 decorator include to a component, expect that soon(ish)
### Routing
Express handles `/` and alias `/public` to the root so static files like `/images/*` `/fonts/*` and `/*.css/js` work from said root.  The rest is handled by react-router once it's bootstrapped on the client.  These routes sit in `app/routes.js`;  It's pretty well explained in the code, or in react-router documenation so check it out there if you are totes lost.

AZURE
---
Since deploying to azure took a lot of work to figure out I'm going to document it here.  The core pieces of a repo for deploying to an azure App Service are as follows:
  * a `.deployment` file in the root.  This tells azure the deployment file to use.  
  * a `deployment.cmd` file in the root.  This tells azure what to do after a deployment request happens (like say a checkin to github).  This file is generated using the `azure-cli` npm package but I just stole mine from a different example repo.  The only line that's added is the one that runs webpack after the npm install.
  * for Debuging ONLY the `IISNode.yml` file.  you will either want to delete this on your production branch or set both values to false for prod.  Having this enabled sends your console output (for the server side calls) to the Log Stream in the azure portal.

The only other thing worth mentioning that caused a ton of headaches is pathing in azure. For import/require statements webpack bundles all of the js together so there is no issues, but for things like file pathing in express you need to remember that windows and linux consoles use different slashes. Take a look at `server/app.js` line 30-32. You need to use path.join to ensure the paths that come out are properly formatted for the platform node is running on or risk file not found problems (use the IISNode.yml to debug).  Since I have the root jsx file in the `app` folder, and process.cwd() returns different paths on dev/linux versus windows I am checking the environment and setting the view path differently.

To deploy to azure login to portal.azure.com and first create an app service:
* Click `App Services`
* Click `+ Add` in the top nav bar
* Select `Web App`
* Click `Create` in the right Pane.
* Create the stack as you want it.

After that's created, click into the created app service from the dashboard or under `App Services`.
  * Select `Deployment Options` under App Deploy in the long list of options.
  * Select `Github` from your choose Source, authorize and select the source.  You should likely be setting to whatever your repo is, or the fork of this one.  Then hit `Ok` at the bottom.

That should be it!  if you haven't broken the deployment, or azure hasn't changed too much this should all work.  you can find the url of your container from the overview page of the App Service container.

To configure
##TODO
* Document how Redux works
* Way more documentation explaining what the heck is going on
* Update to react-hot-middleware when version 3.0 comes out
