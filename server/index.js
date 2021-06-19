const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const { environment, config } = require('./config');
const { userRoutes, rentalRoutes } = require('./routes');

const FakeDb = require('./fakedb');

const app = express();
dotenv.config()

const port = process.env.PORT || 3001;

mongoose.connect(environment.DB_URI, { useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, })
  .then(() => {
    console.log('Connected To Database!')
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
  },
    err => console.log('Error Connecting to Database!')
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
// app.use(cors)

app.use(`/${config.API.path}/${config.API.version}/rentals`, rentalRoutes);
app.use(`/${config.API.path}/${config.API.version}/users`, userRoutes);

app.all('*', function (req, res) {
  res.status(404).send({ 'error': '404: Something went wrong...' });
})

app.listen(port, function () {
  console.log(`Server listening on ${port}`);
});