import React, { useState, useEffect, useRef} from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser]  = useState(localStorage.getItem('user') || '')
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '')
  const [notification, setNotification] = useState([null, ''])
  const [username, setUsername]  = useState('')
  const [password, setPassword]  = useState('')
  const blogFormRef = useRef()

  const handleUsernameChange = (val) => setUsername(val)
  const handlePasswordChange = (val) => setPassword(val)

  const notify = (message, type) => {
    setNotification([message, type])
        setTimeout(() => setNotification([null, '']), 2000)
  }

  const updateBlogs = () =>{
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort( (a,b) => b.likes - a.likes) )
    )
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    blogService.getToken({username, password})
    .then( ({token, username, id}) => {
      if(token !== null){
        setToken(token)
        setUser(username)
        setUserId(id)
      }
    })
    .catch(err => notify('wrong username or password', 'err'))
  }
  const handleLogout = () => {
    setUser('')
  }

  const handleBlogFormSubmit = (e, blogTitle, blogUrl, blogAuthor) => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()

      const postObj = {
        user: userId,
        title: blogTitle,
        url: blogUrl,
        author: blogAuthor
      }

      blogService
      .postBlog(postObj, token)
      .then(savedObj => 
          notify(`a new blog ${savedObj.title} by ${savedObj.author} added!`, '')
      )
      .then(() => 
          blogService
          .getAll()
          .then(blogs =>setBlogs( blogs ))
        )
     
  }


  useEffect(() => {
    localStorage.setItem('user', user)
  }, [user])

  useEffect(() => {
    localStorage.setItem('userId', userId)
  }, [userId])

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  useEffect(updateBlogs , [])  


  return (
    <div>
      <Notification message={notification[0]} type={notification[1]}/>
      {user === '' ? 
      <LoginForm 
        username={username} 
        password={password} 
        handlePasswordChange={handlePasswordChange}
        handleUsernameChange={handleUsernameChange}
        handleLoginSubmit={handleLoginSubmit} 
        /> :
        <div>
          <h2>blogs</h2>
          <p> {user} logged in <button onClick={handleLogout}>logout</button> </p>
        
        <Toggleable outerButtonLabel='new blog' ref={blogFormRef}>
            <BlogForm
                handleBlogFormSubmit={handleBlogFormSubmit} />
        </Toggleable>
        
        <Blogs blogs={blogs} updateBlogs={updateBlogs} token={token} userId={userId}  />
        </div>
        }
      
    </div>
  )
}

export default App