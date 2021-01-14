const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const port = process.env.PORT || 8000;

// import routes

const userRoutes = require('./routes/user');

// app

const app = express();

// database connection

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
).then(() => console.log('database connected'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

// middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// routes middleware

app.use('/api', userRoutes);

app.listen(port, () => {
    console.log('app launched on port ' + port);
})