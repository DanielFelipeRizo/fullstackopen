import { useDispatch, useSelector } from "react-redux";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import { deleteBlogObj } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";

const Blogs = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => {
    return state.blogs;
  });

  const user = useSelector((state) => state.auth)

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



  const blogsSortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Card className="shadow-sm">
        <Card.Body>
          {user && (
            <div>
              <h2>blogs</h2>

              <Togglable buttonLabel="new blog">
                <BlogForm />
              </Togglable>
            </div>
          )}
          <ListGroup variant="flush">
            {blogsSortedByLikes.map((blog) => (
              <ListGroup.Item key={blog.id}>
                <li>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>{" "}
                  <Button class name="float-end" variant="danger" size="sm"
                    style={{ display: user.username === blog.user.username ? "inline" : "none" }}
                    id="buttonDeleteBlog"
                    onClick={() => handleDeleteBlog(blog)}
                  >
                    Delete
                  </Button>
                </li>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Blogs;
