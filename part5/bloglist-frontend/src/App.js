import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()


  useEffect(() => {
    console.log('effect')
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
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
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }



  const addBlog = async (blogObject) => {

    const blog = await blogService.create(blogObject)
    blogFormRef.current.toggleVisibility()
    setMessage(`a new blog "${blog.title}" by ${blog.author} added`)
    const blogs = await blogService.getAll()
    setBlogs(blogs)

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }



  return (
    <div>
      <h2>Blogs</h2>
      <Notification message = {message}/>
      {user === null
        ? <LoginForm
          handleLogin = {handleLogin}
          username = {username}
          password = {password}
          setUsername = {setUsername}
          setPassword = {setPassword}
        />
        :<div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
            <BlogForm createBlog= {addBlog} />
          </Togglable>
        </div>
      }

      {blogs
        .sort((a,b) => a.likes > b.likes ? -1 : 1)
        .map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
        )}
    </div>
  )
}

export default App
