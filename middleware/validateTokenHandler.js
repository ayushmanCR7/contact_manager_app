const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("Cannot verify");
            }
            req.User = decoded.User;
            next()
        });
        if(!token){
            res.status(401)
            throw new Error("cant do anything")
        }

    }
});
module.exports = validateToken