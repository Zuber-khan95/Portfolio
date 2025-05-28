import express from 'express'
const router=express.Router();
import Contact from '../Model/contact.js'
import User from '../Model/user.js';
import {isUser} from '../middleware.js'

router.get("/",async(req,res,next)=>{
    try{
const data=await Contact.find({});
res.json({data});
    }
    catch(err)
    {
        next(err);
    }
})

router.post("/new/:userId",isUser,async(req,res,next)=>{
    const {userId}=req.params;
    try{
        const user=await User.findById(userId);
        if(!user)
        {
            throw new ExpressError(404,"User not found");
        }
const newContact=new Contact(req.body);
newContact.emailOfOwner=user.email;
await newContact.save();
res.json({status:200, state:"success", message:"Successfully sent to Admin"});

    }
    catch(err){
        next(err);
    }
})

export default router;