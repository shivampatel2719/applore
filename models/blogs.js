const mongoose = require('mongoose')
const shortid = require('shortid')

const BlogsSchema = new mongoose.Schema({
    _id: {
        'type': String,
        'default': shortid.generate
      },
    title: {
        type: String,
        required: true
    },
    content : {
        type: String
    },
    date: {
        type: Date
    },
    rating: {
        type: Number
    },
    state: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Blogs = mongoose.model('Blogs', BlogsSchema);

module.exports = Blogs;