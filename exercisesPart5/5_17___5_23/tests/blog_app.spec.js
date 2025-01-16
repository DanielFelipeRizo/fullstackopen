const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {

    //se puede poner la url asi debido a la configuracion en playwright.config.js
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Daniel',
        username: 'daniel',
        password: '12345'
      }
    })
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {

    const locator = await page.getByText('welcome to blogs')
    await expect(locator).toBeVisible()

    await page.getByRole('button', { name: 'log in' }).click()
    await expect(page.getByText('Log in to application')).toBeVisible()

    await expect(page.getByText('username:')).toBeVisible()
    await expect(page.getByText('password:')).toBeVisible()

    await page.getByTestId('username').isVisible()
    await page.getByTestId('password').isVisible()

  })

  describe('Login', () => {
    test('login fails with wrong credentials', async ({ page }) => {

      await loginWith(page, 'aaaa', 'wrong')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('failed login')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(180, 0, 0)')
      await expect(page.getByText('Daniel logged in')).not.toBeVisible()
    })

    test('login form can be opened', async ({ page }) => {

      await loginWith(page, 'daniel', '12345')
      await expect(page.getByText('Daniel logged in')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'daniel', '12345')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'title test', 'author test', 'url test', '1')
      await page.getByRole('button', { name: 'show' }).click()

      await expect(page.getByText('title: title test')).toBeVisible()
      await expect(page.getByText('author: author test')).toBeVisible()
      await expect(page.getByText('url: url test')).toBeVisible()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'title 1', 'author 1', 'url 1', '44')
      })

      test('increase likes', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes: 45')).toBeVisible()
      })

      test('delete blog', async ({ page }) => {
        //configura un mecanismo para manejar el diálogo cuando aparezca
        // Listen for the dialog event
        page.on('dialog', async (dialog) => {
          expect(dialog.type()).toBe('confirm') // Ensure it's a confirmation dialog
          expect(dialog.message()).toBe('Do you really want to delete the blog?: title 1') // Verify the dialog message
          await dialog.accept() // Accept the confirmation dialog
        })

        await page.getByRole('button', { name: 'show' }).click()
        await page.getByRole('button', { name: 'delete' }).click()

        // Assertions to ensure the blog is deleted
        await expect(page.getByText('title 1')).not.toBeVisible()
        await expect(page.getByText('author 1')).not.toBeVisible()
        await expect(page.getByText('url 1')).not.toBeVisible()
        await expect(page.getByText('44')).not.toBeVisible()
      })

    })
  })

  describe('not visible delete button', () => {
    beforeEach(async ({ page, request }) => {

      await request.post('/api/users', {
        data: {
          name: 'user2',
          username: 'user2',
          password: '12345'
        }
      })

      await page.goto('/')

    })

    test('delete button not visible to users other than creator', async ({ page }) => {

      // creaamos un blog con el usuario daniel y verificamos
      // que el boton delete es visible
      await loginWith(page, 'daniel', '12345')
      await createBlog(page, 'blog daniel', 'test daniel', 'url daniel', '25')
      await page.getByRole('button', { name: 'show' }).click()
      await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()
      await page.getByRole('button', { name: 'logout' }).click()

      // iniciamos sesion con el usuario 2 y verificamos que el boton delete
      // no es visible para este usuario
      await loginWith(page, 'user2', '12345')

      await page.getByRole('button', { name: 'show' }).click()
      await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
      await page.getByRole('button', { name: 'hide' }).click()

      //creamos un segundo blog con el usuario 2
      await createBlog(page, 'title user2 second', 'test user2', 'url user2', '5')

      // Seleccionar el segundo blog y hacer clic en el botón "show"
      const secondBlog = await page.getByRole('listitem').filter({ hasText: 'title user2 second' })
      await secondBlog.getByRole('button', { name: 'show' }).click()

      // Verificar que el botón "delete" es visible
      await expect(secondBlog.getByRole('button', { name: 'delete' })).toBeVisible()

      // iniciar sesion con el usuario daniel y verificar
      // que para el blog 'title user2 second' el boton delete no es visible
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'daniel', '12345')

      // Seleccionar el segundo blog y hacer clic en el botón "show"
      const secondBlogFromDaniel = await page.getByRole('listitem').filter({ hasText: 'title user2 second' })
      await secondBlogFromDaniel.getByRole('button', { name: 'show' }).click()

      // Verificar que el botón "delete" es visible
      await expect(secondBlogFromDaniel.getByRole('button', { name: 'delete' })).not.toBeVisible()

    })
  })

  describe('the blog with the most likes in first place.', () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, 'daniel', '12345')
      await createBlog(page, 'blog daniel', 'test daniel', 'url daniel', '1')
      await createBlog(page, 'blog test daniel2', 'test daniel', 'url daniel', '2')
      await createBlog(page, 'blog test daniel3', 'test daniel', 'url daniel', '3')
    })
    test('the blog with the most likes in first place.', async ({ page }) => {

      const blogs = await page.locator('.blog')
      const blogCount = await blogs.count()
      let blogLikes = []

      for (let i = 0; i < blogCount; i++) {
        const likesText = await blogs.nth(i).locator('.blogDetails').innerText()
        const likesMatch = likesText.match(/likes: (\d+)/)
        const likes = likesMatch ? parseInt(likesMatch[1]) : 0
        blogLikes.push(likes)
      }

      console.log('Likes de los blogs:', blogLikes)

      // Verificar que los likes están en orden descendente
      for (let i = 0; i < blogLikes.length - 1; i++) {
        expect(blogLikes[i]).toBeGreaterThanOrEqual(blogLikes[i + 1])
      }
    })

    test('verify order after clicking on like', async ({ page }) => {

      const blog1 = await page.getByRole('listitem').filter({ hasText: 'blog daniel' })
      await blog1.getByRole('button', { name: 'show' }).click()
      await blog1.getByRole('button', { name: 'like' }).click()
      await blog1.getByRole('button', { name: 'like' }).click()
      await blog1.getByRole('button', { name: 'like' }).click()
      await expect(blog1.getByText('likes: 4')).toBeVisible()

      const blogs = await page.locator('.blog')
      const blogCount = await blogs.count()
      let blogLikes = []

      for (let i = 0; i < blogCount; i++) {
        const likesText = await blogs.nth(i).locator('.blogDetails').innerText()
        const likesMatch = likesText.match(/likes: (\d+)/)
        const likes = likesMatch ? parseInt(likesMatch[1]) : 0
        blogLikes.push(likes)
      }

      console.log('Likes de los blogs:', blogLikes)

      // Verificar que los likes están en orden descendente
      for (let i = 0; i < blogLikes.length - 1; i++) {
        expect(blogLikes[i]).toBeGreaterThanOrEqual(blogLikes[i + 1])
      }

    })
  })
})
