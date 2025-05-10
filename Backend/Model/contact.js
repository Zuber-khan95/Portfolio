import mongoose from 'mongoose'

const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    organisation:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        default:Date.now()
    }
});

const Contact=mongoose.model("Contact",contactSchema);

export default Contact;