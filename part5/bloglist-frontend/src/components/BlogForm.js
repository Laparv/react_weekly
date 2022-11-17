import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')
  }


  return(
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <p>title: <input value={newTitle} onChange={handleTitleChange} /> </p>
        <p> author: <input value={newAuthor} onChange={handleAuthorChange}/></p>
        <p> url: <input value={newUrl} onChange={handleUrlChange} /> </p>
        <button type="submit">save</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
export default BlogForm