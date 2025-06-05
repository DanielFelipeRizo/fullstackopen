import { useSelector } from "react-redux";

const InfoUsers = () => {
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  console.log("blogs", blogs);

  const blogsForUser = blogs.reduce((obj, blog) => {
    if (!obj[blog.user.id]) {
      obj[blog.user.id] = {numberOfBlogs : 1, username: blog.user.username};
    } else {
      obj[blog.user.id].numberOfBlogs += 1;
    }
    return obj;
  }, {});

  console.log("blogsForUser", blogsForUser);

  return (
    <div className="info-users">
      <h2>Users</h2>
      <p>Esta sección muestra información relevante sobre los usuarios.</p>

      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Blogs creados</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(blogsForUser).map(([username, count]) => (
            <tr key={username}>
              <Link to = {`/users/${username}`}><td>{username}</td></Link>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoUsers;
