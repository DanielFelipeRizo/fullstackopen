import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const InfoUsers = () => {
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  const blogsForUser = blogs.reduce((obj, blog) => {
    if (!obj[blog.user.id]) {
      obj[blog.user.id] = {
        numberOfBlogs: 1,
        username: blog.user.username,
        name: blog.user.name,
      };
    } else {
      obj[blog.user.id].numberOfBlogs += 1;
    }
    return obj;
  }, {});

  return (
    <div className="info-users">
      <h2>Users</h2>
      <p>Esta sección muestra información relevante sobre los usuarios.</p>

      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>número de blogs</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(blogsForUser).map(([id, userInfo]) => (
            <tr key={id}>
              <td>
                <Link to={`/users/${id}`}>{userInfo.username}</Link>
              </td>
              <td>{userInfo.numberOfBlogs}</td>
              <td>{userInfo.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoUsers;
