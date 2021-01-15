const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signUp = (req, res) => {

    // getting info from user

    const { name, email } = req.body;

    // hashing password

    const salt = bcrypt.genSaltSync(10);
    const hashed_password = bcrypt.hashSync(req.body.password, salt);

    // creating new user

    const user = new User({
        name,
        email,
        hashed_password: hashed_password
    });

    // saving user in db

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

exports.signIn = (req, res) => {

    // find the user based on e-mail

    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: 'User with that email does not exist. Please sign up.'
            });
        }
        // if the user is found, make sure the password matches

        if (!bcrypt.compareSync(password, user.hashed_password)) {
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        } else {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            // persist the token as 't' in the cookie with expiration date
            res.cookie('t', token, { expire: new Date() + 9999 })
            // return response with user and token to front-end client
            const { _id, name, email, role } = user
            return res.json({ token, user: { _id, email, name, role } });
        }
    })
}

exports.signOut = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'You have signed out!' });
}