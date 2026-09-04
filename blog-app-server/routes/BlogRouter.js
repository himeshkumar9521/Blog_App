const express = require('express');
const router = express.Router();
const Blogdata = require('../models/Blog');
const {verifyToken} = require('../middleware/authMiddleware');
const {createPost,deletePost,updatePost,getPost,blogs,publicBlogs} = require('../controllers/BlogController');
const upload = require('../middleware/multer');

router.get("/", (req,res,next) => {
    res.json({message:"Home-page"});
})
//creating blog

router.post("/create-post" , verifyToken, upload.single('image') , createPost);
//all posts

router.get('/blogs',verifyToken, blogs)
//getting blog by id

router.get('/publicBlogs', publicBlogs)

router.get("/:id", getPost);


//update blog

router.put('/:id', verifyToken,upload.single('image'),updatePost);

//delete Blog
router.delete('/:id' , verifyToken,deletePost);


module.exports = router;