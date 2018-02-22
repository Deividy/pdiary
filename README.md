pdiary
===

Welcome to Project.diary! :)

This is just a simple example and it's under development in [youtube video series by Deividy ligeirinho](https://www.youtube.com/c/DeividyMethelerZachetti).
You can see a demo of this project in [https://pdiary.deividy.com](https://pdiary.deividy.com)

Since we are developing the client side and server side we are using [monorepo](https://danluu.com/monorepo/) philosophy to simplify stuffs.

---

### UI

UI is powered by [`reactjs`](https://reactjs.org) and [`materializecss`](https://materializecss.com) framework, we also have [`socket.io-client`](https://github.com/socketio/socket.io-client) powering the live diaries.
For data flow we're using [`reduxjs`](https://redux.js.org/), for forms we have [`react-form`](https://react-form.js.org/#/), [`react-router-dom`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) for simple routing.
We also use `scss` for our `css` files, don't have too much there, materializecss already gives us too much! But, we have the structure ready to use.

We created the `webui/` with `npx create-react-app webui`, and used the defaults of reactjs.

We have some 'peculiar' stuffs in `webui/src/`, as you open it you can see that we have a `manifest.js` and a `projectDiary.js`,
these two files are the 'main' files of our UI app, the main idea here is: we *centralize* all our objects in a `projectDiary` object,
so when we create a new component, instead of export it we use `projectDiary.addComponent('ComponentName', ComponentName)`, this have some upsides:

- We don't need to remember all path structure when using our objects, we just need to `import projectDiary from './projectDiary'` than `const { MyComponent } = projectDiary.components`.
- Initialization is easy, since the first thing we require is the `projectDiary.js` and `manifest.js` we can control exactly what is initialized
- With `manifest.js` we know exactly all of objects of our app without the need to look inside directories or search this.
- redux is simple to use and store is centralized by default

As everything in life, this is a treadeoff, also have some downsides:

- Unit tests becomes a little more tricky
- (.. not sure what more downsides :p, please enter what you find ...)

Redux is also a little different from most tutorials, we have in `webui/src/redux` all our reducers and actions in same files, instead of having a directory called `reducers` and another called `actions`.
I think they are too tight and, for me, makes no sense to separe it in a `reducers/` and `actions/` directory.

Differences between `pages`, `containers` and `components`.
- A `component` is a 'dumb' component, it has no access to redux and is just a simple part of our 'html'.
- A `container` is a component that is 'connected' to redux.
- A `page` is a full view, it's like a combination of components+containers.


### Server side

In server side we use the hipster philosophy of microservices :)
We use for config `dotenv` files.

We have a `server/api/` that serves our requests and a `server/live-diary` that basically just receive new entries from `zmq` and publish it using `socket.io` to the clients.
API is powered by [`expressjs`](https://expressjs.com) and we're using simple functional programming to control routes.

We also have a `server/core` that is were lives our core functions, at the moment we only have the DAO objects, we're using bookshelfjs to access pg.
And very-very few test cases (we'll work in more).

In `server/sql` we just have the schema updates for our postgresql db, we will implement an app there to run the schema updates automatically in future


### Simple?

This is just a simple project to show a directory structure to start off, this may have bugs, but it's just a starter.

![aec28f0b31f6f5bbf6c6b4321eed2186](https://user-images.githubusercontent.com/1174445/36538538-ab028c76-17b2-11e8-9e1d-0c5b778a02ab.jpg)
