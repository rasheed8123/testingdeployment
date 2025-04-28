// index.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // for parsing JSON request bodies


let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];
  
  // GET all users
  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/', (req, res) => {
    res.json("hello, I am fine");
  });
  
  // GET user by ID
  app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).send('User not found');
  });
  
  // POST create new user
  app.post('/users', (req, res) => {
    const newUser = {
      id: users.length + 1,
      name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
  });
  
  // PUT update user
  app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
      user.name = req.body.name;
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  });
  
  // DELETE user
  app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send();
  });
  

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
