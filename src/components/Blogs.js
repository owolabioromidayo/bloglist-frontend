import React from 'react'
import Blog from './Blog'

const Blogs = ({blogs, updateBlogs, token, userId}) => (
    <div>
      {blogs.map(blog => 
      <Blog 
        key={blog.id} 
        blog={blog} 
        token={token} 
        userId={userId} 
        updateBlogs={updateBlogs}
        />)}
    </div>
  )

export default Blogs