import '../index.css'
import { useState } from 'react'
import axios from 'axios'

function Login() {

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const loginUser = async () => {

    try {

      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        }
      )

      localStorage.setItem(
        'token',
        res.data.token
      )

      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      )

      if (res.data.user.role === 'teacher') {

        window.location.href = '/teacher'

      } else {

        window.location.href = '/editor'
      }

    } catch (err) {

      alert('Login failed')
    }
  }

  return (

  <div className="auth-container">

    <div className="auth-box">

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={loginUser}>
        Login
      </button>

      <br /><br />

      <a href="/register">
        Create Account
      </a>

    </div>

  </div>
)
}

export default Login