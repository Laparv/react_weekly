const BlogForm = (props) => {
    return(
        <>
        <h2>Create new</h2>
          <form onSubmit={props.addBlog}>
              <p>title: <input value={props.newTitle} onChange={props.handleTitleChange} /> </p>
              <p> author: <input value={props.newAuthor} onChange={props.handleAuthorChange}/></p>
              <p> url: <input value={props.newUrl} onChange={props.handleUrlChange} /> </p>
            <button type="submit">save</button>
          </form>  
        </>
    )
}

export default BlogForm