import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
    }
    }

    const handleLogout = async (event) => {
      event.preventDefault()
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }

    const handleTitleChange = (event) => {
      setNewTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
      setNewAuthor(event.target.value)
    }
    const handleUrlChange = (event) => {
      setNewUrl(event.target.value)
    }

    const loginForm = () => (
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>      
    )

    const addBlog = (event) => {
      event.preventDefault()

      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        user: user.username,
      }

      blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewUrl('')
      })
    }
  
    const blogForm = () => (
      <div>
        <h2>Create new</h2>
          <form onSubmit={addBlog}>
              <p>title: <input value={newTitle} onChange={handleTitleChange} /> </p>
              <p> author: <input value={newAuthor} onChange={handleAuthorChange}/></p>
              <p> url: <input value={newUrl} onChange={handleUrlChange} /> </p>
            <button type="submit">save</button>
          </form>  
      </div>
    )


  return (
    <div>
      <h2>Blogs</h2>
      {user === null ?
      loginForm() :
      <div>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogForm()}
      </div>
      }
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
