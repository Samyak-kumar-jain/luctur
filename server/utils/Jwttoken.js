const jwt = require("jsonwebtoken");

const generateToken = (res,user,message)=>{

    const token = jwt.sign({id :user._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"});

    return res.status(200).cookie("token", token, {
        httpOnly: true,
        sameSite: "strict", 
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    }).json({
        success:true,
        message, 
        user:{
            id:user._id,
            email:user.email
        }
    })
}
module.exports = { generateToken };
