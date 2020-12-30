import React from 'react'

const LoginForm = ({username, password, handlePasswordChange, handleUsernameChange, handleLoginSubmit}) => (
    <div>
            <h2>Log in to application</h2>
            <form>
              <div>
                username : <input value={username} onChange={(e) => handleUsernameChange(e.target.value)}/>
              </div>
              <div>
                password: <input value={password} onChange={(e) => handlePasswordChange(e.target.value)}/>
              </div>
              <button type="submit" onClick={(e) => handleLoginSubmit(e)}>login </button>
            </form>
    </div>
)

export default LoginForm