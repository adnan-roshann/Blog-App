import user from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Blog from "../model/blogModel.js";


export const signup = async (req, res) => {
    try {
    const { username, email, password, confirm_password} = req.body;
   console.log(req.body);
   
     // Check if passwords match
    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    console.log('working');
    
    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }
    console.log(existingUser);
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    
    // Create a new user
    const newUser = new user({
        username,
        email,
        password: hashedPassword,
        confirm_password: hashedPassword, // Typically, you wouldn't store confirm_password
    });
    console.log(newUser,'jbjhjh');
    
    // Save the user to the database
    await newUser.save();
    // res.status(201).json({ message: 'User registered successfully!' });
    res.redirect('/user/home');

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};


 export const login = async (req, res) => {
     const { email, password } = req.body;

     try {
        // Check if the user exists
        const userdata = await user.findOne({ email });
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }
        
        
        console.log(userdata);
        
        // console.log(" Password:", password);
        // console.log("Password DB:", user.password);

        console.log(" Password:", password);
        console.log("Password DB:", userdata.password);

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, userdata.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        

        

        
         // Generate a JWT token
         const token = jwt.sign(
            { id: user._id, role: user.role }, // Payload
            process.env.JWT_SECRET,           // Secret key
            { expiresIn: "1h" }               // Token expiration time
        );
        console.log(token);
        
         // Respond with the token and user details (excluding password)
         res.cookie("authToken",token);
        console.log('worked');
        
        // res.cookies(token);
        res.redirect('/user/home');
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "An error occurred during login", error });
    }
};


export const renderSignup =  (req,res) =>{
    res.render('signup')
    }

export const renderHome =  async (req,res) =>{
    const blogData = await Blog.find();
    res.render('home',{blogData})
}



export const renderLogin =  (req,res) =>{
    res.render('login')
}