const asyncHandler = require("express-async-handler");
const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { use } = require("../routes/contactRoutes");
const registerUsers = asyncHandler(async (req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        throw new Error("all fields are mandatory")
    }
    const availableUser = await userSchema.findOne({email});
    if(availableUser){
        res.status(400);
        throw new Error("user already exists")
    }
    const hashedpass = await bcrypt.hash(password,10);
    const user = await userSchema.create({
        username,
        email,
        password: hashedpass,
    })
    if(user){
        res.status(201).json({id: user.id, email: user.email})
    }
    else{
        res.status(400);
        throw new Error("user already exists")
    }
    res.json({message : "registered"});
})
const loginUsers = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All field are mandatory")
    }
    const User = await userSchema.findOne({email});
    if(User && (await bcrypt.compare(password,User.password))){
        const accessToken = jwt.sign({
            User: {
                username: User.username,
                email: User.email,
                id: User.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "25m"}
    );
        res.status(200).json({accessToken})
    }
    else{
        res.status(401);
        throw new Error("something went wrong")
    }
    
})
const currentUsers = asyncHandler(async (req,res)=>{
    res.json(req.User);
})
module.exports = {registerUsers, loginUsers, currentUsers}