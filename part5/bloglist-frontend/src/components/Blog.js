import '../index.css'
import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs }) => {

  const [showAll, setShowAll] = useState(false)
  const [newLikes, setNewLikes] = useState(blog.likes)


  const hideWhenVisible = { display: showAll ? 'none' : '' }
  const showWhenVisible = { display: showAll ? '' : 'none' }
  const hideRemoveButton = { display: showAll ? 'none' : '' }
  const showRemoveButton = { display: showAll ? '' : 'none' }

  const toggleVisibility = () => {
    setShowAll(!showAll)
  }


  const updateBlog = async (event) => {

    event.preventDefault()

    const blogObject = {
      user: blog.user.id,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    const changedLikes = { ...blogObject, likes: newLikes + 1 }

    await blogService.update(blog.id, changedLikes)
    setNewLikes(changedLikes.likes)

    const blogs = await blogService.getAll()
    setBlogs(blogs)

  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      await blogService.remove(blog.id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

  }

  const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))


  return(
    <div className="blog" >
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p>{newLikes} likes <button onClick={updateBlog}>like</button></p>
        <p>{blog.url}</p>
        <p>{blog.author}</p>
        <p>{blog.user.name}</p>
        <div style={!user || user.id !== blog.user.id ? hideRemoveButton : showRemoveButton}>
          <p><button onClick={deleteBlog}>remove</button></p>
        </div>
      </div>

    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog