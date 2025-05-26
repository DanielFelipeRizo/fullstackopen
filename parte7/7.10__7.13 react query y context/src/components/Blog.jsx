import { useState } from "react";
import { useNotificationDispatch } from "../NotificationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const Blog = () => {
  const queryClient = useQueryClient();

  const resultGetBlogs = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const [visibleDetails, setVisibleDetails] = useState({});

  const notificationDispatch = useNotificationDispatch();

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

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateLikes,
    onSuccess: (blogUpdated) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) =>
          blog.id === blogUpdated.id
            ? { ...blog, likes: blog.likes + 1 }
            : blog,
        ),
      );

      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { text: `you liked '${blogUpdated.title}'`, style: "success" },
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const handleUpdateLikesBlog = (blog) => {
    updateBlogMutation.mutate(blog);
  };

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (_, deletedId) => {
      const blogs = queryClient.getQueryData(["blogs"]);

      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((blog) => blog.id !== deletedId),
      );

      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { text: "You deleted a blog", style: "success" },
      });

      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const handleDeleteBlog = (blog) => {
    deleteBlogMutation.mutate(blog.id);
  };

  const handleView = (id) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [id]: !prev[id], // Alterna la visibilidad del blog con el ID dado
    }));
  };

  if (resultGetBlogs.isError) {
    return (
      <span>Error: blog service not available due to problems in server.</span>
    );
  }

  if (resultGetBlogs.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = resultGetBlogs.data;
  
  // blogs = blogs.map((blog) => {})
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
            <div
              style={showWhenVisibleDetails(blog.id)}
              className="blogDetails"
            >
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
