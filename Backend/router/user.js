import express from 'express'
const router=express.Router();
import ExpressError from '../ExpressError.js'
import bcrypt from 'bcryptjs'
import User from '../Model/user.js'
import 'dotenv/config';
import jwt from 'jsonwebtoken'
import {  userSchema } from '../validate.js'

const JWT_SECRET=process.env.JWT_SECRET;

router.post("/register",async(req,res,next)=>{
    let {email,password}=req.body;
    
    try{
    const userValidation=userSchema.validate(req.body);
    if(userValidation.error)  
    {
      throw new ExpressError(400,`${userValidation.error}`);
    }
      if(typeof email!=="string" || typeof password!=="string")
      {
        throw new ExpressError(400,"Email and password should be string");
      }
const existUser=await User.findOne({email:email});
if(existUser)
{
  throw new ExpressError(409,"Email already exists");
}
      const hashedPassword=await bcrypt.hash(password,10);
      if(!hashedPassword)
      {
        throw new ExpressError(500,"Error in hashing password");
      }
      const newUser=new User({
      email:email,
      password:hashedPassword,
      role:"user" 
      });
      
      await newUser.save();
  
  res.json({status:200, state:"success", message:"Successfully signedUp as user"});
    }
    catch(err)
    {
      next(err);
    }
  });
  
  router.post("/login",async(req,res,next)=>{
    const {email,password}=req.body;
    try{
       if(!email || !password){
        throw new ExpressError(400,"Email and password are required");
      }
const user=await User.findOne({email:email});
if(!user)
{
  throw new ExpressError(401,"Email is invalid.");
}
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch)
{
  throw new ExpressError(401,"Password or Email is invalid");
}
const payload={
  userId:user._id,
  email:user.email,
  role:user.role
}
const token=jwt.sign(payload,JWT_SECRET,{expiresIn:'1h'});
if(!token)
{
  throw new ExpressError(404,"Unable to get token ");
}
res.json({state:"success",jsonToken:token});
    
    }
    catch(err){
      next(err);
    }
  });

router.post('/logout', (req, res,next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader){
throw new ExpressError(401, "Authorization header is missing");
  }

  const token = authHeader.split(" ")[1];
  try{
  if (!token) {
  throw new ExpressError(401,"Token not found");
  }
     const decoded = jwt.decode(token);
      const tokenId = decoded.iat; 
  
     res.json({status:200,message:"Successfully Logged out" });

  }
catch(err){
  next(err);
}
}
);

  export default router;