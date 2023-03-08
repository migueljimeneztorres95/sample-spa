const express = require('express');
const cors = require('cors');
const server = express();
const jsonServer = require('json-server');
const users = require('./data/users.json')
const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]\\:;<>,.?~_+\-=|]).*$/
const fs = require("fs")

server.use(cors());
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  const {username, password} = req.body
  if (users[username] && users[username] == password) {
    res.send({
      token: `auth-${username}`,
      user: username,
    });
  } else {
    res.send({
      token: null
    });
  }
});

server.get('/users', (req, res) => {
  console.log(Object.keys(users))
  res.send({ users: Object.keys(users) })
})

server.post('/register', (req, res) => {
  const response = checkCredentials(req.body)
  res.send(response);
})

function checkCredentials({username, password}) {
  if (username in users) {
    return{ error: "This username already exists" }
  }
  if (password.match(passwordRegex)) {
    users[username] = password
    fs.writeFile ("./data/users.json", JSON.stringify(users), function(err) {
      if (err) throw err;
        console.log('complete');
      }
    );
    return { status: 200 }
  } else {
    return { error: "This password does not accomplish  the requirements" }
  }
}

server.listen(8080, () => console.log('API is running on http://localhost:8080'));