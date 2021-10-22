const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Product = require('./product')
const Transaction =  require('./transaction')
const shortid = require('shortid')
const Blogs = require('./blogs');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    // _id: {
    //     'type': String,
    //     'default': shortid.generate
    // },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    blogs : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogs'
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
})

const User = mongoose.model('User',userSchema)

module.exports = User
