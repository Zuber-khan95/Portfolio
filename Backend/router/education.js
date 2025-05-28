import express from 'express'
const router=express.Router();
import Education from "../Model/education.js";
import User from "../Model/user.js"
import {isAdmin} from '../middleware.js'


router.get("/",async(req,res,next)=>{
    try{
let data=await Education.find({});
res.json({data});
    }
    catch(err){
        next(err);
    }
});

router.post("/new/:userId",isAdmin,async(req,res,next)=>{
    const {userId}=req.params;
    try{
        const user=await User.findById(userId);
        if(!user)
        {
            throw new ExpressError(404,"user not found");
        }
const newEducation=new Education(req.body);
user.educations.push(newEducation._id);
await newEducation.save();
await user.save();
res.json({status:200, state:"success", message:"successfully education added"});

    }
    catch(err)
    {
        next(err);
    }
});

router.delete("/:id/:userId",isAdmin,async(req,res,next)=>{
    let {id,userId}=req.params;

    try{
        const education=await Education.findById(id);
        if(!education)
        {
            throw new ExpressError(404,"Education not found.");
        }
        const user=await User.findById(userId);
          if(!user)
        {
            throw new ExpressError(404,"User not found.");
        }
        const index =user.educations.indexOf(education._id);
        if(index>-1){
            user.educations.splice(index,1);
        }
        else{
            throw new ExpressError(404,"Education not found in user's education list.");
        }
        await user.save();
        await Education.findByIdAndDelete(id);
       res.json({status:200, state:"success", message:"successfully education deleted"});

    }
    catch(err){
        next(err);
    }
})

export default router;