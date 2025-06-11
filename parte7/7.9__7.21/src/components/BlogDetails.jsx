import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCommentBlog, updateLikes } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Card, Button, Badge, Form } from "react-bootstrap";
import useField from "../hooks/useField";

const BlogDetails = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const comment = useField("text");

  const blog = useSelector((state) =>
    state.blogs.find((b) => b.id === id)
  );

  const addComment = async (event) => {
    event.preventDefault();

    const commentObject = {
      createdBy: blog.user.id,
      comment: comment.value
    };

    dispatch(createCommentBlog(commentObject));

    comment.onReset();

    dispatch(
      setNotification({
        msj: `a new comment ${comment.value} by ${blog.user.username} added`,
        type: "success",
        seconds: 5,
      }),
    );
  };


  const handleUpdateLikesBlog = () => {
    dispatch(updateLikes(blog.id, blog));
    dispatch(
      setNotification({
        msj: `You liked '${blog.title}'`,
        type: "success",
        seconds: 5,
      })
    );
  };


  if (!blog) return <p className="text-muted">Blog no encontrado.</p>;

  return (
    <div className="container mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Título: {blog.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            Autor: <strong>{blog.author}</strong>
          </Card.Subtitle>

          <Card.Text>
            <span className="d-block mb-2">
              URL:{" "}
              <a href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.url}
              </a>
            </span>

            <span className="d-block mb-3">
              Likes:{" "}
              <Badge bg="info" pill>
                {blog.likes}
              </Badge>
            </span>

            <Button
              variant="primary"
              onClick={handleUpdateLikesBlog}
              id="buttonAddLikes"
            >
              ❤️ Like
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>

      <br></br>

      <Card>
        <Card.Title>Comments: </Card.Title>
        <Card.Subtitle>add comment</Card.Subtitle>
        <Form onSubmit={addComment}>

          <Form.Group>
            <Form.Label>comment:</Form.Label>
            <Form.Control className="w-auto"
              {...comment}
            />
          </Form.Group>
          <br></br>

          <Button id="buttonOnSubmitCommentForm" type="submit">
            add comment
          </Button>
        </Form>

      </Card>
    </div>
  );
};

export default BlogDetails;
