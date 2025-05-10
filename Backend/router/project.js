import express from 'express'
const router=express.Router();
import Project from '../Model/project.js';
import isAdmin from '../middleware.js';

router.get("/",async(req,res,next)=>{
    try{
const data=await Project.find({});
res.json({data});
    }
    catch(err)
    {
        next(err);
    }
});

router.post("/new",async(req,res,next)=>{
console.log(req.body);
    try{
        let newProject=new Project(req.body);
        await newProject.save();
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
      await Project.findByIdAndDelete(id);
      res.json({state:"success"});
    }
    catch(err)
    {
        next(err);
    }
});

export default router;