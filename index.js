import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js"
import cookieParser from 'cookie-parser';
import router from './route/userRoute.js';
import ejs from 'ejs';
import path from 'path';
import blogRouter from './route/blogRoute.js';

dotenv.config();

const port = process.env.PORT || 3002
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/user',router);
app.use('/blog',blogRouter)

// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');




connectDB();


app.listen(port,()=>{
    console.log(`port running on ${port}`);
    
});