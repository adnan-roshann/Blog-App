import express from 'express';
import { createBlog,listBlogs } from '../controller/blogController.js';
import { authenticateToken } from '../middleware/auth.js';
const blogRouter = express.Router();

blogRouter.post('/create',authenticateToken,createBlog);
blogRouter.get('/getblog',authenticateToken,listBlogs);

export default blogRouter;
