require('./config/config');

//packges
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// config mongoose
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

process.env.URLDB = `mongodb://${process.env.URL_DB}/${process.env.COLLECTION}`
console.log(process.env.URLDB);
mongoose.connect(process.env.URLDB,{ useNewUrlParser: true, useUnifiedTopology: true  },
  (err,res) => {
      console.log("Base de datos Conectada ...");
  }
)

// app.set('key', process.env.SEED);
// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//global de rutas
app.get('/',(req,res) => res.send('Welcome to a basic express App'))
app.use('/api/',require('./routes/routes.routes'));

// Listen on port 5000
app.listen(process.env.PORT, () => {
  console.log(`Server RUNNING on port ${process.env.PORT}
  Visit http://localhost:${process.env.PORT}`);
});
