const bcrypt = require('bcryptjs');
const User = require('../models/user');

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
                error
            });
        }
        res.json({
            user
        });
    });
};