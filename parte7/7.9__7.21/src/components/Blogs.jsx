import { useDispatch, useSelector } from "react-redux";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import { deleteBlogObj } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";

const Blogs = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => {
    return state.blogs;
  });

  const user = useSelector((state) => state.auth)

  //estilos en linea
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
  };

  const handleDeleteBlog = (blog) => {
    dispatch(deleteBlogObj(blog.id));

    dispatch(
      setNotification({
        msj: `you deleted '${blog.title}'`,
        type: "success",
        seconds: 5,
      }),
    );
  };

  //se encarga de ocultar el boton de eliminar si el usuario logueado no es el mismo que creo el blog
  // if (blog.user.username !== user.username) {
  //   showWhenVisibleDeleteButton.display = "none";
  // }

  const blogsSortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {user && (
        <div>
          <h2>blogs</h2>

          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
        </div>
      )}
      {blogsSortedByLikes.map((blog) => (
        <div style={blogStyle} className="blog" key={blog.id}>
          <li>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <button
              id="buttonDeleteBlog"
              onClick={() => handleDeleteBlog(blog)}
            >
              Delete
            </button>
          </li>
        </div>
      ))}
      ;
    </div>
  );
};

export default Blogs;
