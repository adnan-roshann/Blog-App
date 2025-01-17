import Blog from "../model/blogModel.js";

export const createBlog = async (req, res) => {  
    const { title, content } = req.body;
  try {
    const newBlog = new Blog({ title, content, author: req.user.id });    
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {    res.status(500).json({ message: "Something went wrong" });
  }};

  export const listBlogs = async (req, res) => {
    try {  
          const blogs = await Blog.find({ author: req.user.id });
      res.render("blogs", { blogs });
      } catch (error) {
      res.status(500).json({ message: "Something went wrong" });  }
  };


  export const RendermyBlog = (req,res) =>{
    
    
    res.render('myBlog')
  }



