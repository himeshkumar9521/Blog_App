const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require("multer");
const cookieParser = require('cookie-parser');
const cloudinary = require("cloudinary").v2;
const BlogRouter = require('./routes/BlogRouter');
const userRouter = require('./routes/userRoutes');
dotenv.config(); // configurating env variable
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.urlencoded({
   extended:true
}));
app.use('/api/user' , userRouter);
app.use('/api/blog' , BlogRouter);

app.use((err, req, res, next) => {

    res.status(400).json({

        message: err.message

    });

});

app.use((req, res) => {

    res.status(404).json({
        message: "Route not found"
    });

});

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI,{dbName:"Mern_Blogger"}).then(() => {
    console.log("mongoose and mongodb is working fine");
    app.listen(PORT, () =>{
        console.log(`server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log("Error in loading Database");
    console.log(err);
});
