const express = require("express");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

const port = 5000;
//JACK tokyo ZIP 9 music jack 3 EGG HULU egg fruit bestbuy egg walmart HULU 4
const seed = 'JtZ9mj3EHefbewH4';

 app.set('key', seed);
// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to a basic express App");
});

// Mock API
app.get("/users", (req, res) => {
  res.json([
    { name: "William", location: "Abu Dhabi" },
    { name: "Chris", location: "Vegas" }
  ]);
});

app.post("/user", (req, res) => {
  const { name, location } = req.body;

  res.send({ status: "User created", name, location });
});

app.post('/login', (req, res) => {
  if(req.body.user === "admin" && req.body.password === "1234") {
const payload = {
 check:  true
};
const token = jwt.sign(payload, app.get('key'), {
 expiresIn: 1440
});
res.json({
 mensaje: 'Autenticación correcta',
 token: token
});
  } else {
      res.json({ mensaje: "Usuario o contraseña incorrectos"})
  }
})

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});
