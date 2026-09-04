const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Userdata = require('../models/user');
const Blogdata = require('../models/Blog');
const jwt = require('jsonwebtoken');
const {registerValidation} = require('../validations/authValidation');
const {validationResult} = require('express-validator');
const {registerUser,loginUser,deleteUser,logoutUser} = require('../controllers/authController');
//add new user
router.post("/register",registerValidation , registerUser);

//delete user

router.delete("/:userName" , deleteUser);
    // login
router.post("/login" , loginUser);

router.post('/logout', logoutUser);
module.exports = router;