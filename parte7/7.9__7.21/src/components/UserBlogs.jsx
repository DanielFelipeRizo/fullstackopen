import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, ListGroup } from "react-bootstrap";

const UserBlogs = () => {
  const { id } = useParams();

  const blogs = useSelector((state) => state.blogs);

  // Busca el nombre del usuario según el blog
  const userBlogs = blogs.filter((blog) => blog.user.id === id);
  const username = userBlogs[0]?.user?.username || "Usuario";

  return (
    <div className="container mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-primary">
            Blogs de <strong>{username}</strong>
          </Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            Esta sección muestra los blogs creados por este usuario.
          </Card.Subtitle>

          <ListGroup variant="flush">
            {userBlogs.map((blog) => (
              <ListGroup.Item key={blog.id}>
                <span className="fw-bold">{blog.title}</span> —{" "}
                <small className="text-muted">Autor: {blog.author}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {userBlogs.length === 0 && (
            <div className="text-muted mt-3">Este usuario no tiene blogs aún.</div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserBlogs;
