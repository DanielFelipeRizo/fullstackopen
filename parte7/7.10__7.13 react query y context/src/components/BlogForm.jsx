import useField from "../hooks/useField";
import { useNotificationDispatch } from '../NotificationContext'

import {  useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'


const BlogForm = () => {


  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch();

  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const likes = useField("number");


  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData( ['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    }
  })

  const onCreateBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: likes.value,
    };

    newBlogMutation.mutate(blogObject)

    title.onReset();
    author.onReset();
    url.onReset();
    likes.onReset();

    notificationDispatch({ type: "SET_NOTIFICATION", payload: {text: `a new blog ${title.value} by ${author.value} added`, style: "success"}})
    setTimeout(() => { notificationDispatch({ type: "CLEAR_NOTIFICATION" }) }, 5000)
  };

  return (
    <div>
      <h2>add blogs</h2>
      <form onSubmit={onCreateBlog}>
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
