const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) response.json(blog);
  else response.status(404).json({ error: "resource not found" });
});

blogsRouter.post("/", async (request, response) => {
  const bodyBlog = request.body;

  if (!request.user || !request.user.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(request.user.id);

  const blog = new Blog({
    title: bodyBlog.title,
    author: bodyBlog.author,
    url: bodyBlog.url,
    likes: bodyBlog.likes || 0,
    user: user.id,
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  // Volver a buscar el blog con populate
  const populatedBlog = await Blog.findById(savedBlog._id).populate("user", {
    username: 1,
    name: 1,
  });

  response.status(201).json(populatedBlog);
});

blogsRouter.put("/comments/:id", async (request, response) => {
  const body = request.body;
  const comment = {
    createdBy: body.createdBy,
    comment: body.comment,
  };

  const blogForUpdate = await Blog.findById(request.params.id);

  console.log('blogForUpdate', blogForUpdate);
  

  blogForUpdate.comments = blogForUpdate.comments.concat(comment);

  if (blogForUpdate) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blogForUpdate,
      {
        new: true,
      }
    );

    console.log('updatedBlog', updatedBlog);

    response.json(updatedBlog);
  } else {
    response.status(404).json({ error: "resource not found" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const bodyBlog = await Blog.findById(request.params.id);
  if (bodyBlog) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });

    response.json(updatedBlog);
  } else {
    response.status(404).json({ error: "resource not found" });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const idToDelete = request.params.id;

  const blogToDelete = await Blog.findById(idToDelete);
  // console.log("request.user");
  // console.log(request.user);

  if (!request.user) {
    return response.status(400).json({ error: "user or token invalid" });
  }

  if (!request.user.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  if (blogToDelete) {
    if (blogToDelete.user.toString() === request.user.id) {
      await Blog.findByIdAndDelete(idToDelete);
      response.status(204).end();
    } else {
      response.status(401).json({
        error: "you must delete the blog with the user who created it",
      });
    }
  } else {
    response.status(404).json({ error: "resource not found" });
  }
});

module.exports = blogsRouter;
