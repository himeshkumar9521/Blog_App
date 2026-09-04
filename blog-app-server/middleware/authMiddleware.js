const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    try{
        //get token form header
        const token = req.cookies.token;    

        if(!token){
            return res.status(401).json({message:"No token provided"});
        }

        // 2. Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach the decoded payload (id and userName) to the request
        req.user = decoded;
        
        // 4. Proceed to the delete controller
        next();
    }catch(err){
        res.status(401).json({message:"Invalid token"});
    }
}

module.exports = {verifyToken};