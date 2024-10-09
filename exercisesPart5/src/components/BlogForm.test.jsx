import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('test event handler for the blog form', async () => {
  const user = userEvent.setup()
  const mockHandleCreateBlog = vi.fn()

  const blog = {
    'title': 'test title',
    'author': 'dfr11',
    'url': 'www.s.com',
    'likes': 5,
    'user': '66d3b85b6bf3f43b36780b3c'
  }

  const container = render(<BlogForm blog={blog} mockHandleCreateBlog={mockHandleCreateBlog} />).container

  const button = container.querySelector("#buttonOnSubmitBlogForm")

  await user.click(button)

  expect(mockHandleCreateBlog.mock.calls).toHaveLength(1)

})
