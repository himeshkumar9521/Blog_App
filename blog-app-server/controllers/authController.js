const bcrypt = require('bcrypt');
const Userdata = require('../models/user');
const Blogdata = require('../models/Blog');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const generateToken = (user,res) => {
    const payload = {
            id: user._id,
            userName: user.userName 
            };
            const token = jwt.sign(
                
                    payload
                ,
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.cookie("token",token,{
                httpOnly:true,
                secure:process.env.NODECOOKIE === "production",
                sameSite:"lax",
                maxAge:24*60*60*1000
            })
            return token;
}

const registerUser = async (req,res,next) => {
    try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});
            }
            
            const {userName,passWord,email} = req.body;
            const search = await Userdata.findOne({userName});
            // if(search){
            //     console.log("userexist",search);
            //     return res.status(400).json({message:"username already exist"});
            // }
    
            const hashedPassword = await bcrypt.hash(passWord, 10);
            const newUser = await Userdata.create({
                userName,
                passWord:hashedPassword,
                email
            });
            const token = generateToken(newUser,res);
            res.json({newUser,message:"registration successfully",token});
        }
        catch(err){
            console.log(err);
            res.json({Error:err});
        }
}

const loginUser = async (req,res,next) => {
    try{
            const {userName,passWord} = req.body;

            //find user
            const user = await Userdata.findOne({userName});
            if(!user){
                return res.status(404).json({message:"incorrect password or usename"});
            }
    
            const isMatch = await bcrypt.compare(passWord,user.passWord);
    
            if(!isMatch){
                return res.json({message:"incorrect password or username"})
            }
            const token = generateToken(user,res);
    
            res.status(200).json({message:"login successfully",token});
        }
        catch(err){
            console.log(err);
            res.status(404).json({message:err.message});
        }
}

const deleteUser = async (req,res,next) => {
try{
        const del_user = await Userdata.findOneAndDelete({userName:req.params.userName});
    
        if(!del_user){
            return res.status(404).json({message:"user not found"});
        }
                const result = await Blogdata.deleteMany({
                    user:req.params.userName
                });
                res.json({
                    message:"delete successfully"
                });
            }
            catch(err){
                res.status(500).json({
                message: err.message
            });
            }
}

const logoutUser = (req, res) => {
    // res.clearCookie completely destroys the token in the user's browser
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODECOOKIE === "production",
        sameSite: "lax"
    });

    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {registerUser,loginUser,deleteUser,logoutUser};