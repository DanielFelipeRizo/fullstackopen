
const BlogForm = ({ blog, setBlog, handleCreateBlog }) => {

  const handleChange = (event) => {
    const { name, value } = event.target
    setBlog({
      ...blog,
      [name]: value
    })
  }

  return (
    <div>
      <h2>add blogs</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title: &nbsp;
          <input
            data-testid='title'
            type="text"
            value={blog.title}
            name="title"
            onChange={handleChange}
          />
        </div>

        <div>
          author: &nbsp;
          <input
            data-testid='author'
            type="text"
            value={blog.author}
            name="author"
            onChange={handleChange}
          />
        </div>

        <div>
          url: &nbsp;
          <input
            data-testid='url'
            type="text"
            value={blog.url}
            name="url"
            onChange={handleChange}
          />
        </div>

        <div>
          likes: &nbsp;
          <input
            data-testid='likes'
            type="number"
            value={blog.likes}
            name="likes"
            onChange={handleChange}
          />
        </div>

        <button id="buttonOnSubmitBlogForm" type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm