import Blog from "../model/blogModel.js";

export const createBlog = async (req, res) => { 
     const { title, content } = req.body;

  try {
    // const blogs = await Blog.find({ author: req.user.id });
    // console.log(blogs);
    
    const newBlog = new Blog({ title, content, author: req.user.id });   
    console.log(newBlog);
    
    await newBlog.save();
    // res.status(201).json({ message: "Blog created successfully" });
    res.redirect('/blog/createmyBlog');
  } catch (error) {    res.status(500).json({ message: "Something went wrong" });
  }};


  export const listBlogs = async (req, res) => {
    try {    
     const blogs = await Blog.find({ author: req.user.id });
     console.log(blogs);
     
      res.render("blogs", { blogs }); 
     } catch (error) {
      res.status(500).json({ message: "Something went wrong" });  }
  };

  export const rendermyBlog= async(req,res)=>{
    const blogs = await Blog.find({ author: req.user.id });
    res.render('myBlog',{blogs});
  }