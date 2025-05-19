import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateLikes } from "../reducers/blogReducer";
import { deleteBlogObj } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = () => {
  const [visibleDetails, setVisibleDetails] = useState({});

  const dispatch = useDispatch();

  const blogs = useSelector((state) => {
    return state.blogs;
  });

  //estilos en linea
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
  };

  const showWhenVisibleDetails = (id) => ({
    display: visibleDetails[id] ? "" : "none",
  });
  const showWhenVisibleDeleteButton = { display: "" };

  const handleUpdateLikesBlog = (blog) => {
    dispatch(updateLikes(blog.id, blog));
    dispatch(
      setNotification({
        msj: `you liked '${blog.title}'`,
        type: "success",
        seconds: 5,
      }),
    );
  };

  const handleDeleteBlog = (blog) => {
    dispatch(
      deleteBlogObj(blog.id)
    );

    dispatch(
      setNotification({
        msj: `you deleted '${blog.title}'`,
        type: "success",
        seconds: 5,
      }),
    );
  };

  const handleView = (id) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [id]: !prev[id], // Alterna la visibilidad del blog con el ID dado
    }));
  };

  //se encarga de ocultar el boton de eliminar si el usuario logueado no es el mismo que creo el blog
  // if (blog.user.username !== user.username) {
  //   showWhenVisibleDeleteButton.display = "none";
  // }

  const blogsSortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {blogsSortedByLikes.map((blog) => (
        <div style={blogStyle} className="blog" key={blog.id}>
          <li>
            title: {blog.title}, author: <span>{blog.author}</span>
            <button
              id={`buttonDetailsVisibility-${blog.id}`}
              onClick={() => handleView(blog.id)}
            >
              {visibleDetails[blog.id] ? "hide" : "show"}
            </button>
            <div style={showWhenVisibleDetails(blog.id)} className="blogDetails">
              url: {blog.url} <br></br>
              likes: {blog.likes}{" "}
              <button
                id="buttonAddLikes"
                onClick={() => handleUpdateLikesBlog(blog)}
              >
                like
              </button>
              <br></br>
              user: {blog.user.name}
              <br></br>
              <button
                id="buttonDeleteBlog"
                style={showWhenVisibleDeleteButton}
                onClick={() => handleDeleteBlog(blog)}
              >
                Delete
              </button>
            </div>
          </li>
        </div>
      ))}
      ;
    </div>
  );
};

export default Blog;
