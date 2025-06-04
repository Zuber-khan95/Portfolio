import express from 'express'
const router=express.Router();
import Project from '../Model/project.js';
import {isAdmin} from '../middleware.js'
import User from '../Model/user.js';
import ExpressError from '../ExpressError.js';
import {projectSchema} from '../validate.js';

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

router.post("/new/:userId",isAdmin,async(req,res,next)=>{
    const {userId}=req.params;
    try{
         const projectValidation=projectSchema.validate(req.body);
               if(projectValidation.error)
               {
                   throw new ExpressError(400,`${projectValidation.error}`);
               }
        const user=await User.findById(userId);
        if(!user){
            throw new Error(404,"User not found");
        }
        const newProject=new Project(req.body);
        user.projects.push(newProject._id);
        await user.save();
        await newProject.save();
        res.json({status:200,state:"success", message:"Project added successfully"});
    }
    catch(err)
    {
        next(err);
    }
});

router.delete("/:id/:userId",isAdmin,async(req,res,next)=>{
let {id,userId}=req.params;
    try{
        const project=await Project.findById(id);
        if(!project){
            throw new Error(404,"Project not found");
        }
        const user=await User.findById(userId);
        if(!user){
            throw new Error(404,"User not found");
        }
        const index=user.projects.indexOf(project._id);
        if(index>-1){
            user.projects.splice(index,1);
        }
        else{
            throw new Error(404,"Project not found in user's project list");
        }
        await user.save();
      await Project.findByIdAndDelete(id);
      res.json({status:200,state:"success" ,message:"Project deleted successfully"});
    }
    catch(err)
    {
        next(err);
    }
});

export default router;