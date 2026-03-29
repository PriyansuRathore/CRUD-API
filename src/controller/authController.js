import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerUserService, findUserByEmail } from '../models/authmodel.js';

export const register= async(req , res, next)=>{
    const {name, email,password}=req.body;
    try{
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser=await registerUserService(name,email,hashedPassword);
        res.status(201).json({status:201, message:"User registered successfully",data:newUser});
    }catch(error){
        next(error);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 401, message: "Invalid credentials" });
        }
        // ✅ token generated only when password matches
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ status: 200, message: "Login successful", token });
    } catch (error) {
        next(error);
    }
};
