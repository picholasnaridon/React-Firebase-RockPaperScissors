# [Rock Paper Scissors](http://www.nickparidon.com/#/rps)

### Install

```
npm install && npm start
```

### About

Multiplayer (need two people connected to play) Rock Paper Scissors game built using Firebase and React. The idea behind this project was to leverage the push functionality that comes with using Firebase's database. The biggest technical challenege was managing what users see what. I wanted player one to be able to see input buttons for themselves, but not for player two, and I also wanted anyone who joined after the first two players to get special messaging. 

To do some of this I leveraged Firebase Auth to get a unique identifier for each user session, which I was able to save to state and ultimately compare against.

I ended up using an NPM package called [Re-base](https://www.npmjs.com/package/react-rebase) to help link React's state to the Firebase data which was hugely helpful. 

### Tech

* [React JS] - HTML enhanced for web apps!
* [Material UI] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Firebase] - Stores game state in NoSQL db, and manages auth


![RPS](http://www.nickparidon.com/static/media/rps.2939915b.png)
