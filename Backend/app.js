import express from 'express';
import mongoose from 'mongoose';
const app=express();
// import session from 'express-session'
// import passport from 'passport';
// import localStrategy from 'passport-local'
import cors from 'cors';
import 'dotenv/config';
app.use(cors(
    {
        origin:'http://localhost:5173',
        credentials:true,
    }
));
app.use(express.json());
import User from './Model/user.js'


import education from './router/education.js';
import user from './router/user.js'
import project from './router/project.js';
import contact from './router/contact.js'
import ExpressError from './ExpressError.js';

mongoose.connect("mongodb://localhost:27017/Portfolio")
.then((respose)=>{console.log("Database connected");})
.catch((err)=>{console.log("Database connection failed");});

let PORT=8080;
app.listen(PORT,(req,res)=>{
    console.log("Listening the port:"+PORT);
});


app.use((req,res,err,next)=>{
    let {status=500,message="internal server error"}=err;
    res.status(status).send(message);
})


// app.use(session(
//     {
//         secret:process.env.SECRET||"mysuperkey",
//         saveUninitialized:true,
//         resave:false,
//         Cookie:{
//            expire:Date.now()+3*24*60*60*1000,
//            maxAge:3*24*60*60*1000,
//            httpOnly:true  
//         }

//     }
// ));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new localStrategy(User.authenticate()));



  // passport.serializeUser(function(User, cb) {
  //   process.nextTick(function() {
  //     return cb(null, User.id);
  //   });
  // });
  
  // passport.deserializeUser(async function(id, cb) {
  //   try {
  //     const user = await User.findById(id).exec(); 
  //     if (!user) {
  //       return cb(new Error('User not found'));
  //     }
  //     return cb(null, user);
  //   } catch (err) {
  //     return cb(err);
  //   }
  // });
  
  
app.use("/",user);
app.use("/education",education);
app.use("/project",project);
app.use("/contact",contact);

