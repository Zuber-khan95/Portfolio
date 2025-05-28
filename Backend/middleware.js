import User from './Model/user.js';
import ExpressError from './ExpressError.js';

const isAdmin=async(req,res,next)=>{
    const {userId}=req.params;
    try{
       const user=await User.findById(userId);
       if(user && user.role==='admin' )
       {
          next();
       }
       else{
     throw new ExpressError(403,"only admin can perform these tasks");
       }
    }
   catch(err)
   {
    next(err);
   } 
};

const isUser=async(req,res,next)=>{
   const {userId}=req.params;

   try{
const user=await User.findById(userId);
if(user && user.role==='user')
{
   next();

}
else{
   throw new ExpressError(403,"only loggedin user can perform these tasks");
}
   }
   catch(err){
      next(err);

   }

}


export  {isAdmin,isUser};