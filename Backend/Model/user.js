import mongoose from 'mongoose'
import PassportLocalMongoose from 'passport-local-mongoose';
import Education from './education.js';
import Project from './project.js';


const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    educations:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Education'
        }
    ],
    projects:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
        }
    ]
});

userSchema.plugin(PassportLocalMongoose);

const User=mongoose.model("User",userSchema);
export default User;
