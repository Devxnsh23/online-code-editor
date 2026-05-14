import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import EditorPage from './pages/EditorPage'
import TeacherDashboard from './pages/TeacherDashboard'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/editor"
          element={<EditorPage />}
        />

        <Route
          path="/teacher"
          element={<TeacherDashboard />}
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App