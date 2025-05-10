import mongoose from 'mongoose'

const projectSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    githubLink:{
        type:String,
        required:true
    },
    startingDate:{
        type:Date,
        required:true
    },
    endingDate:{
        type:Date,
        required:true
    }
});

const Project=mongoose.model("Project",projectSchema);

export default Project;