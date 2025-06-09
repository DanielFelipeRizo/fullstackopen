import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLikes } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const blogs = useSelector((state) => {
    return state.blogs;
  });

  const blog = blogs.find((blog) => blog.id === id);

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

  return (
    <div className="blog-details">
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <button id="buttonAddLikes" onClick={() => handleUpdateLikesBlog(blog)}>
        like
      </button>
    </div>
  );
};

export default BlogDetails;

// <div>
//   {blogsSortedByLikes.map((blog) => (
//     <div style={blogStyle} className="blog" key={blog.id}>
//       <li>
//         title: {blog.title}, author: <span>{blog.author}</span>
//         <button
//           id={`buttonDetailsVisibility-${blog.id}`}
//           onClick={() => handleView(blog.id)}
//         >
//           {visibleDetails[blog.id] ? "hide" : "show"}
//         </button>
//         <div style={showWhenVisibleDetails(blog.id)} className="blogDetails">
//           url: {blog.url} <br></br>
//           likes: {blog.likes}{" "}
//           <button
//             id="buttonAddLikes"
//             onClick={() => handleUpdateLikesBlog(blog)}
//           >
//             like
//           </button>
//           <br></br>
//           user: {blog.user.name}
//           <br></br>
//           <button
//             id="buttonDeleteBlog"
//             style={showWhenVisibleDeleteButton}
//             onClick={() => handleDeleteBlog(blog)}
//           >
//             Delete
//           </button>
//         </div>
//       </li>
//     </div>
//   ))}
//   ;
// </div>
