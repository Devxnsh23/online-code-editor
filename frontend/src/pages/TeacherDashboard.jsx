import {
  useEffect,
  useState,
} from 'react'

import axios from 'axios'
import '../index.css'

function TeacherDashboard() {

  const [files, setFiles] =
    useState([])

  const [openFileId, setOpenFileId] =
    useState(null)

  useEffect(() => {

    fetchFiles()

  }, [])

  const fetchFiles = async () => {

    const res = await axios.get(
      'http://localhost:5000/api/files'
    )

    setFiles(res.data)
  }

  const deleteFile = async (id) => {

    await axios.delete(
      `http://localhost:5000/api/files/${id}`
    )

    fetchFiles()
  }

  const toggleFile = (id) => {

    if (openFileId === id) {
      setOpenFileId(null)
    } else {
      setOpenFileId(id)
    }
  }

  return (

    <div className="dashboard-container">

      <h1 style={{ marginBottom: '25px' }}>
        Teacher Dashboard
      </h1>

      {files.map((file) => (

        <div
          key={file.id}
          className="file-card"
        >

          <div
            className="file-header"
            onClick={() => toggleFile(file.id)}
          >

            <div>

              <h3>
                {file.student_name}
              </h3>

              <p>
                {file.filename}
                {' • '}
                {file.language}
              </p>

            </div>

            <div>

              <p>
                Runs:
                {' '}
                {file.run_count}
              </p>

              <p>

                Last Run:
                {' '}

                {file.last_run
                  ? new Date(
                      file.last_run
                    ).toLocaleString()
                  : 'Never'}

              </p>

            </div>

          </div>

          {openFileId === file.id && (

            <div className="file-details">

              <h3>Code</h3>

<pre>
  {file.code}
</pre>

<br />

<h3>Output</h3>

<pre>
  {file.theoutput || 'No Output'}
</pre>

              <button
  className="delete-btn"
  onClick={() =>
    deleteFile(file.id)
  }

  style={{
    width: '40px',
    height: '40px',
    fontSize: '18px',
    padding: '0',
  }}
>
  🗑️
</button>

            </div>

          )}

        </div>

      ))}

    </div>
  )
}

export default TeacherDashboard