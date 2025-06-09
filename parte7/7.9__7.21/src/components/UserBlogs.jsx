import { use } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserBlogs = () => {
  const id = useParams().id;

  const blogs = useSelector((state) => {
    return state.blogs;
  });

  const blogsUser = blogs.filter((blog) => blog.user.id === id);
  // console.log("blogsUser", blogsUser);

  return (
    <div className="user-blogs">
      <h2>Blogs del usuario</h2>
      <p>Esta sección muestra los blogs creados por el usuario seleccionado.</p>
      {blogsUser.map((blog) => (
        <div key={blog.id} className="blog">
          <li>{blog.title}</li>
        </div>
      ))}
    </div>
  );
};

export default UserBlogs;
