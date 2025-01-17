import express from 'express';
 import { signup,login, RenderSignup, RenderLogin, RenderAbout, RenderContact, RenderHome } from '../controller/userController.js';
import { authenticateToken } from '../middleware/auth.js';

 const router = express.Router();


 router.post('/signup',signup);
 router.post('/login',login);
 router.get('/signup',RenderSignup);
 router.get('/login',RenderLogin);
 router.get('/About',RenderAbout);
 router.get('/Contact',RenderContact);
 router.get('/home',authenticateToken,RenderHome);
  
 export default router;