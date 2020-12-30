import React, {useState} from 'react'

const BlogForm = ({handleBlogFormSubmit}) => {
  
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')
    return (
      <div>
          <form>
          <br />
          title: <input value= {blogTitle} onChange={(e) => setBlogTitle(e.target.value) }/> <br /> 
          author: <input value= {blogAuthor} onChange={(e) => setBlogAuthor(e.target.value) }/> <br /> 
          url: <input value= {blogUrl} onChange={(e) => setBlogUrl(e.target.value) }/> <br /> 
          <button onClick={(e) => handleBlogFormSubmit(e, blogTitle, blogUrl, blogAuthor)}>create</button>
          </form>
      </div> 
    )
  }
  
  export default BlogForm