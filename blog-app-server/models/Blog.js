const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
        {
            title:{
                type:String,
                required:true,
            },
            image:{
                type:String
            },
            content:{
                type:String,
                required:true,
            },
            user:{
                type:String,
                required:true,
            },
            isPrivate:{
                type:Boolean
            }
        },{timestamps:true}
);

module.exports = mongoose.model("Blog", blogSchema);