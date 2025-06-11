import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import useField from "../hooks/useField";
import { Form, Button } from 'react-bootstrap';

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
      <Form onSubmit={addBlog}>

        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control className="w-auto"
            {...title}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control className="w-auto"
            {...author}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control className="w-auto"
            {...url}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>likes:</Form.Label>
          <Form.Control className="w-auto"
            {...likes}
          />
        </Form.Group>
        <br></br>

        <Button id="buttonOnSubmitBlogForm" type="submit">
          add
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
