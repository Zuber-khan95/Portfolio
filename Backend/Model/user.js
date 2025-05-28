import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
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



const User=mongoose.model("User",userSchema);
export default User;
