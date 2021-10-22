const express = require('express')
const router = express.Router()
const BusinessController = require('../controller/businessController')

router.post('/createBlog',BusinessController.createBlog);
router.get('/userBlogs/:id',BusinessController.getUserBlogs);
router.get('/getAllBlogs',BusinessController.getAllBlogs);
router.delete('/blog/:id',BusinessController.deleteBlog);
router.patch('/blog',BusinessController.ApproveOrRejectBlog);
router.get('/users',BusinessController.getUsers);
router.delete('/users/:id',BusinessController.deleteUser);
router.patch('/editblog',BusinessController.editBlog);
router.patch('/rateBlog',BusinessController.rateBlog);

module.exports = router;