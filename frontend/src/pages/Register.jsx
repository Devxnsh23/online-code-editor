import '../index.css'
import { useState } from 'react'
import axios from 'axios'

function Register() {

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const registerUser = async () => {

    try {

      await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name,
          email,
          password,
        }
      )

      alert('Registration successful')

      window.location.href = '/'

    } catch (err) {

      alert('Registration failed')
    }
  }

  return (

  <div className="auth-container">

    <div className="auth-box">

      <h1>Register</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

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

      <button onClick={registerUser}>
        Register
      </button>

    </div>

  </div>
)
}

export default Register