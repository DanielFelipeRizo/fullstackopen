import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import useField from "../hooks/useField";

const BlogForm = () => {
  const dispatch = useDispatch();

  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const likes = useField("number");

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: likes.value,
    };

    dispatch(createBlog(blogObject));

    title.onReset();
    author.onReset();
    url.onReset();
    likes.onReset();

    dispatch(
      setNotification({
        msj: `a new blog ${title.value} by ${author.value} added`,
        type: "success",
        seconds: 5,
      }),
    );
  };

  return (
    <div>
      <h2>add blogs</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input {...title} />
        </div>

        <div>
          author: <input {...author} />
        </div>

        <div>
          url: <input {...url} />
        </div>

        <div>
          likes: <input {...likes} />
        </div>

        <button id="buttonOnSubmitBlogForm" type="submit">
          add
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
