import express from 'express'
const router=express.Router();
import Education from "../Model/education.js";


router.get("/",async(req,res,next)=>{
    try{
let data=await Education.find({});
res.json({data});
    }
    catch(err){
        next(err);
    }
});

router.post("/new",async(req,res,next)=>{
    try{
const newEducation=new Education(req.body);
await newEducation.save();
res.json({state:"success"});

    }
    catch(err)
    {
        next(err);
    }
});

router.delete("/:id",async(req,res,next)=>{
    let {id}=req.params;

    try{
await Education.findByIdAndDelete(id);
res.json({state:success});

    }
    catch(err){
        next(err);
    }
})

export default router;