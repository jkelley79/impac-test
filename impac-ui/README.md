### Prerequisites
You must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Install Dependencies
This has preconfigured `npm` to automatically run `bower` so we can simply do:
```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `assets/libs/bower_components` - contains the angular framework files

### Run the Application

```
npm start
```
Now browse to the app at `http://localhost:8000/index.html`.

## Testing
The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```


### End to end testing

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.
