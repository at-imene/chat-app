import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken"; 

export const hashPassword = async (password)=>{
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const generateToken = (userId, res)=>{
    const token  = jwt.sign({userId}, process.env.SECRET_KEY, {
        expiresIn: "1h"
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 60*60*1000,
        secure: process.env.NODE_ENV !== 'development',
        secure: false,
        sameSite: 'strict'
    });
    return token;
}

export const comparePassword = async(password, hashedPassword)=>{
    return await bcrypt.compare(password, hashedPassword);
}