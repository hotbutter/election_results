## What... is... this?

A clone of Politico's [primary results chart](http://www.politico.com/2016-election/results/map/president).

Theirs:

![](https://monosnap.com/file/QWQg1jLtRE59D1KqRb5xnmJFpmWZGt.png)

Ours:

![](http://recordit.co/uRXlkxOewK.gif)

The updates are very #subtle.

### The setup

We gave ourselves **one hour** to complete. This is mostly because @acco has the same bedtime as your grandfather and @djbouche didn't want to pay for another hour at his co-working space.

@djbouche prepared `data.json` in advance. It is doubtful that he prepared it by hand. He mumbled something about a nim web scraper.

@acco had a React/Node.js/Webpack/SemanticUI project boilerplate already prepared. He sometimes shows off this boilerplate at parties.

They didn't really have a plan or strategy, other than wanting to display `data.json` in a live-updating React-driven chart and then talk about the experience afterwards in third-person.

### The implementation

The highlights:

* @acco boots an ngrok server
* Almost immediately, @acco has to mitigate @djbouche's DDoS attacks
* Eventually, after complaining about the responsive web for 10 min, they finish the initial build of their table
* About 20 min were spent mis-remembering the function signature of various Node/JS standard library functions. They were feeling particularly stubborn and particularly unwilling to hop over to MDN
  * But like I just want to read from a file!!!
  * But like I just want to make a GET request!!!
    * "`fetch()` is in theory really good."
* It works!

### Why

Your guess === ours

### The code

Not pretty. But it works ™.

### Running the app

1. Ensure you have `npm` installed.

Follow the instructions for your platform [here](https://github.com/npm/npm).

2. Install all dependencies:

````
npm install
````

3. Boot the HTTP server

````
npm run server
````

The server is now running at [localhost:3000](localhost:3000)
