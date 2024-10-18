import User from '../models/user.model.js';  // Fixed the import path
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorhandler } from '../utils/error.js';
export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  const hashpassword=bcryptjs.hashSync(password,10);
  const newUser = new User({ username, email, password:hashpassword });
  
  try {
    await newUser.save();
    res.status(201).json('User created successfully');
  } catch (error) {
   next(error);
  }
};
export const signin=async(req,res,next)=>{
  const {email,password}=req.body;
  try {
    const validuser=await User.findOne({email});
    if(!validuser) return next(errorhandler(404,'user not found'));
    const validpassword= bcryptjs.compareSync(password,validuser.password)
    if(!validpassword) return next(errorhandler(404,'wrong credentials'));
    const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET,)
    const{password:pass ,...rest}=validuser._doc;
    res.cookie('acess-token',token,{httpOnly:true})
    
    .status(200)
    .json(rest)
  } catch (error) {
    next(error);
  }
}
