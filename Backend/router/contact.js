import express from 'express'
const router=express.Router();
import Contact from '../Model/contact.js'

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

router.post("/new",async(req,res,next)=>{
    try{
const newContact=new Contact(req.body);
await newContact.save();
res.json({state:"success"});

    }
    catch(err){
        next(err);
    }
})

export default router;