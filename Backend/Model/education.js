import mongoose from 'mongoose'

const educationSchema=mongoose.Schema({
    graduation:{
        type:String,
        required:true,
        unique:true
    },
    specialization:{
        type:String,
        required:true,
    },
    university:{
        type:String,
        required:true,
    },
    startingYear:{
        type:Number,
        required:true
    },
    endingYear:{
        type:Number,
        required:true
    },

});

const Education=mongoose.model("Education",educationSchema);
export default Education;