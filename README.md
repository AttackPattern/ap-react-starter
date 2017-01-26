Attack Pattern React baseline
===
#### **yarbr**  
Pronounced /yharbur/  
*noun*  
*Definition* -  yet another react bootstrap repo
____

Core Technologies
---
* react
* react-router
* redux
* SASS
* Express w/ server side rendering
* webpack
  * webpack hot reloading
* babel w/ es6/es7 features

How to use
---
First clone the repo - if you copy it elsewhere make SURE the **.babelrc** file comes along, it's critical.  From there you have 2 path's.  If you want to run it locally, from the root of the repo in a command prompt run the following
* Development (hot reloading) `npm run-script dev`
* Production `npm start`

If you want to run it in docker (like I usually do) you'll need a few more things i haven't checked in yet.  I'll update when I do but the core of it all is in the docker file (it's setup for dev right now).

How to Edit
---
### Index file
The index file is sitting in `app/server.jsx`.  if you need to edit meta data this is the place to do it.  The core of the app is in
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

##TODO
* Add redux @connect example and update readme
* Way more documentation explaining what the heck is going on
* update to react-hot-middleware when version 3.0 comes out
