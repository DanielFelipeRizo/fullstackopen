import { useSelector } from "react-redux";

const InfoUsers = () => {
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  console.log("blogs", blogs);

  const blogsForUser = blogs.reduce((obj, blog) => {
    // console.log("blog.user.username", blog.user.username);
    // console.log("blog.title", blog.title);
    // console.log("obj[blog.user.username]", !obj[blog.user.username]);

    if (!obj[blog.user.username]) {
      obj[blog.user.username] = 1;
    } else {
      obj[blog.user.username] = obj[blog.user.username] + 1;
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
            <th>Blogs creados</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(blogsForUser).map(([username, count]) => (
            <tr key={username}>
              <td>{username}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoUsers;
