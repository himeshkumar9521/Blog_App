const Blogdata = require('../models/Blog');
const {verifyToken} = require('../middleware/authMiddleware');
const cloudinary = require('../config/cloudinary.js');

const createPost = async (req,res,next) => {
    try{
            const {title,content,user,isPrivate}  = req.body;

            let imageUrl = "";

        // upload only if image exists
        if(req.file){

            const result =
            await cloudinary.uploader.upload(
                req.file.path
            );

            imageUrl = result.secure_url;

        }
    
        const newBlog = await Blogdata.create({title,content,user,image: imageUrl,isPrivate});
    
        res.json({message:"post created"});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message:"please try again",msg:err.message});
        }
}

const deletePost = async (req,res,next) => {
    const blog = await Blogdata.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        if (blog.user !== req.user.userName) {
            return res.status(403).json({ message: "Forbidden: You can only delete your own blogs!" });
        }
    const del_data = await Blogdata.findByIdAndDelete(req.params.id);
        if(!del_data){
            return res.json({message:"blog is not found"});
        }
    
        res.json({message:"Blog deleted"});
}

const updatePost = async (req,res,next) => {
    try{
            const {title,content,isPrivate}  = req.body;
            const existingBlog = await Blogdata.findById(req.params.id);
            if (!existingBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        if (existingBlog.user !== req.user.userName) {
            return res.status(403).json({ message: "Forbidden: You can only delete your own blogs!" });
        }
            
        const updateData = {
            title,
            content,
            isPrivate: isPrivate === 'true' || isPrivate === true 
        };
        
        if(req.file){
            
            // B. If the old blog ALREADY had an image, destroy it first
                // Extract the publicId from the URL
                if (existingBlog && existingBlog.image) {
                const urlArray = existingBlog.image.split('/');
                const imageWithExtension = urlArray[urlArray.length - 1]; 
                const publicId = imageWithExtension.split('.')[0]; 

                // Extra safety check just to be 100% sure we don't send a blank ID
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }
            }
            const result =
            await cloudinary.uploader.upload(
                req.file.path
            );

            updateData.image = result.secure_url;

        }else{

        }
    
        const newBlog = await Blogdata.findByIdAndUpdate(req.params.id,updateData,{ returnDocument: 'after' });
    
        res.json({message:"post update"});
        }
        catch(err){
            console.log(err);
            res.status(500).json({message:"please try again",msg:err.message});
        }
}

const getPost = async (req,res,next) => {
    try {
    // 1. Attempt to find the blog
    const blog = await Blogdata.findById(req.params.id);
    
    // 2. If the ID is valid but the blog doesn't exist in the database
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // 3. If everything is perfect, send the data
    res.status(200).json(blog);

  } catch (error) {
    console.error("Error fetching single post:", error);
    
    // 4. If the ID format is invalid or the database connection drops
    res.status(500).json({ message: "Server error fetching the post" });
  }
}

const blogs = async (req,res,next) => {

    const name = req.query.userName;
    let query = {};
    let result = [];
    if(name){
        query = {user:name};
        result = await Blogdata.find(query);
    }
    

    res.json(result);
}
const publicBlogs = async (req,res,next) => {
    try{
        const data = {isPrivate:false};
        result = await Blogdata.find(data);

        res.json(result);
    }catch(err){
        console.log("failed to fetch Blogs", err);
    }
}
module.exports = {createPost,deletePost,updatePost,getPost,blogs,publicBlogs};