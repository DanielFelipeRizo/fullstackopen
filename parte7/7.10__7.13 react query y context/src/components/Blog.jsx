import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateLikes } from "../reducers/blogReducer";
import { deleteBlogObj } from "../reducers/blogReducer";
import { useNotificationDispatch } from '../NotificationContext'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const Blog = () => {

  // const queryClient = useQueryClient();


  const resultGetBlogs = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: false
  })


  const [visibleDetails, setVisibleDetails] = useState({});

  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();

  // const blogs = useSelector((state) => {
  //   return state.blogs;
  // });

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

    notificationDispatch({ type: "SET_NOTIFICATION", payload: { text: `you liked '${blog.title}'`, style: "success" } })
    setTimeout(() => { notificationDispatch({ type: "CLEAR_NOTIFICATION" }) }, 5000)
  };

  // const handleDeleteBlog = (blog) => {
  //   dispatch(
  //     deleteBlogObj(blog.id)
  //   );

  //   notificationDispatch({ type: "SET_NOTIFICATION", payload: { text: `you deleted '${blog.title}'`, style: "success" } })
  //   setTimeout(() => { notificationDispatch({ type: "CLEAR_NOTIFICATION" }) }, 5000)
  // };

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

  

  if (resultGetBlogs.isError) {
    return <span>Error: blog service not available due to problems in server.</span>
  }

  if (resultGetBlogs.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = resultGetBlogs.data;

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
