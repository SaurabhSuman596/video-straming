const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const movieRoute = require('./routes/movies');
const ListRoute = require('./routes/list');

dotenv.config();

app.use(express.json());

// Route
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movie', movieRoute);
app.use('/api/list', ListRoute);

// Database Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connected Successfully'))
  .catch((err) => console.log({ message: err }));

// Server Listening
app.listen(process.env.PORT || 5000, () => {
  console.log('Backend server is running!');
});
