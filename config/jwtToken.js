import jwt from 'jsonwebtoken'

export const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "15d"});
}

export const generateRefreshToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "15d"});
}