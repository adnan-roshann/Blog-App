import express from "express";
import { signup,login, renderSignup,renderLogin, renderHome,renderuserProfile} from "../controller/userController.js";

const router = express.Router();

// Define the signup route ,login route
router.post('/signup', signup);
router.post('/login', login);
router.get('/signup',renderSignup);
router.get('/login',renderLogin)
router.get('/home',renderHome);
router.get('/profile',renderuserProfile);


export default router;