import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'


test('renders content', () => {

  const blog = {
    'title': 'test title',
    'author': 'dfr11',
    'url': 'www.s.com',
    'likes': 5,
    'user': '66d3b85b6bf3f43b36780b3c'
  }

  render(<Blog blog={blog} />)

  screen.debug()
  const element = screen.getByText('title: test title, author: dfr11')
  // expect(element).toBeDefined()

})
