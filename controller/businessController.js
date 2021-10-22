const User = require('../models/user')
const Blogs = require('../models/blogs');

function createBlog(req,res) {
    let blog = new Blogs({
        user : req.body.user,
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        state: 1,
        rating: 0
    });
    blog.save();
    res.json({
        'statusCode' : 200,
        'blog': blog
    });
}

async function getAllBlogs(req,res) {
    let userBlogs = await Blogs.find().exec();
    res.json({
        'statusCode' : 200,
        'userBlogs' : userBlogs
    });
}

async function getUserBlogs(req,res) {
    let userBlogs = await Blogs.find({user: req.params.id}).exec();
    res.json({
        'statusCode' : 200,
        'userBlogs' : userBlogs
    });
}

async function deleteBlog(req,res) {
    let deletedBlog = await Blogs.findByIdAndDelete(req.params.id).exec();
    res.json({
        'statusCode' : 200
    });
}

async function getUsers(req,res) {
    let users = await User.find().exec();
    res.json({
        'statusCode' : 200,
        'users' : users
    });
}

async function deleteUser(req,res) {
    let deletedUser = await User.findByIdAndDelete(req.params.id).exec();
    let removedBlog = await Blogs.remove({user : req.params.id}).exec();
    res.json({
        'statusCode' : 200
    })
}

async function ApproveOrRejectBlog(req,res) {
    let blog = await Blogs.findOne({ _id : req.body.id });
    blog.state = req.body.status;
    blog.save();
    res.json({
        'statusCode' : 200,
        'blog' : blog
    })
}

async function editBlog(req,res) {
    let blog = await Blogs.findOne({ _id : req.body.id });
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.date = req.body.date;
    blog.save();
    res.json({
        'statusCode' : 200,
        'blog' : blog
    })
}

module.exports = {
    createBlog,
    getUserBlogs,
    getAllBlogs,
    deleteBlog,
    getUsers,
    deleteUser,
    ApproveOrRejectBlog,
    editBlog
}