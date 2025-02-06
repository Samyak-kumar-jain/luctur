const jwt = require("jsonwebtoken");

const isAuthenticated = async(req,res,next)=>{
    try {
        const token =req.cookies.token;
        if(!token){
           return res.status(401).json({
                message:"user not authorized",
                success:false,
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY );

        if(!decode){
           return  res.status(401).json({
            message:"Invali token identified",
            success:false,
           })
        }
        req.tokenId = decode.id;
        next();

          



        
    } catch (error) {
        console.log(error)
    }
   
}
module.exports = {isAuthenticated};