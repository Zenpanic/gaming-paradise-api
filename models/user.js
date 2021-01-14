const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        required: true,
        unique: 32
    },
    about: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
);

/* // virtual field

userSchema.virtual('password')
    .set((password) => {
        this._password = password;
        this.salt = bcrypt.genSaltSync(10);
        console.log('ok');
        this.hashed_password = this.encryptPassword(password);
    })
    .get(() => {
        return this._password;
    })

// methods

userSchema.methods.encryptPassword = function (password) {
    if (!password) return '';
    try {
        return bcrypt.hashSync(password, this.salt);
    } catch (err) {
        return '';
    }
} */

module.exports = mongoose.model('User', userSchema);