const BlogForm = ({
    addBlog,
    newTitle,
    handleTitleChange,
    newAuthor,
    handleAuthorChange,
    newUrl,
    handleUrlChange
}) => {
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

export default BlogForm