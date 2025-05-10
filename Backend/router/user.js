import express from 'express'
const router=express.Router();
import passport from 'passport'
import localStrategy from 'passport-local'
import User from '../Model/user.js'

router.post("/register",async(req,res,next)=>{
    let {username,email,password}=req.body;
  const user=new User({username,email});
    try{
  let NewUser=await User.register(user,password);
  
  res.json({state:"success"});
    }
    catch(err)
    {
      next(err);
    }
  });
  
  router.post("/login", passport.authenticate('local', {failureRedirect: '/login'}),async(req,res,next)=>{
    try
    {
  res.json({state:"success"});
  }
    catch(err)
    {
      console.log(err);
      next(err);
    }
  });

  router.delete("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        res.clearCookie('connect.sid');
        res.json({ state: "success" });
      });
    });
  });
  
  export default router;