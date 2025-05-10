import passport from 'passport';
let isAdmin=async(req,res,next)=>{
    try{
        if(req.isAuthencited)
            {
                next();
            }
    }
   catch(err)
   {
    next(err);
   }
    
}

export default isAdmin;