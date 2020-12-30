import React from 'react'
import Toggleable from './Toggleable'
import blogService from '../services/blogs'


const Blog = ({ blog, updateBlogs, token, userId }) => {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
  
    const likeBlog = () => {
      const obj = {
        user: blog.user.id,
        likes : blog.likes + 1,
        author : blog.author,
        title : blog.title,
        url : blog.url
  
      }
  
      blogService
      .likeBlog(obj, blog.id, token)
      .then(() => updateBlogs() )
  
    }
  
    const deleteBlog = () => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
          blogService.deleteBlog(token, blog.id)
          .then(() => updateBlogs() )
      }
    }
  
    return(
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <Toggleable outerButtonLabel='view' innerButtonLabel='hide' style={{display:'inline'}} >
        <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a> <br />
        likes {blog.likes} <button onClick={likeBlog}>like</button> <br/>
        {blog.user.name} <br />
    
        {userId === blog.user.id ? <button onClick={deleteBlog}>remove</button>: null } <br />
    </Toggleable>
    </div>
    )
  
  }
  

export default Blog
