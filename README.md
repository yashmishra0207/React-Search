## What's this?

### This is an improved version of search suggestion in React which is has buggy implementation using HTML, CSS and JS on <a href="https://codesandbox.io/s/recursing-drake-wj28e1?file=/index.html">this</a> link.

<br/>

## How to run on your machine locally?

### Quite simple. Just download/clone the repo and in its root folder run below commands in terminal in given order.

<ol>
  <li><code>npm run install-modules</code> - This will install client and server dependencies.</li>
  <li><code>npm run dev</code> - This will start serving client and server on localhost.</li>
</ol>

### App will start running on <a href="http://localhost:8080">localhost:8080</a>

<br/>

#### FYI - Backend server will be running on <a href="http://localhost:3333">localhost:3333</a>

#### I know that <code>.env</code> should be gitignored but since it doesn't contain sensitive info at the moment and to ease the setup I have commited .env as well.

<br>

### Possible improvement on Backend - The search suggestions could be stored in a <code>Trie</code> instead of an array ensuring lesser memory consumption and faster retrieval.
