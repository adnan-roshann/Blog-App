import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


export const authenticateToken = (req, res, next) => {  
    const token = req.cookies.authToken || req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.redirect("/user/login");
  try {   
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;    
    next();
  } catch (err) {    
    res.redirect("/user/login");
  }}; 