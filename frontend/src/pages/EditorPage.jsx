import {
  useEffect,
  useState,
} from 'react'

import Editor from '@monaco-editor/react'
import axios from 'axios'
import '../index.css'

function EditorPage() {

  const [code, setCode] =
    useState('print("Hello World")')

  const [language, setLanguage] =
    useState('python')

  const [output, setOutput] =
    useState('')

  const [filename, setFilename] =
    useState('main')

  const [timeSpent, setTimeSpent] =
    useState(0)

  const [files, setFiles] =
    useState([])

  const [selectedFileId, setSelectedFileId] =
    useState(null)

  const [input, setInput] =
    useState('')

  const user = JSON.parse(
    localStorage.getItem('user')
  )

  useEffect(() => {

    const interval = setInterval(() => {

      setTimeSpent((prev) => prev + 1)

    }, 1000)

    return () => clearInterval(interval)

  }, [])

  useEffect(() => {

    fetchFiles()

  }, [])

  const fetchFiles = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/files/user/${user.id}`
      )

      setFiles(res.data)

    } catch (err) {

      console.log(err)
    }
  }

  const openFile = (file) => {

    setSelectedFileId(file.id)

    setFilename(file.filename)

    setLanguage(file.language)

    setCode(file.code)
  }

  const deleteFile = async (id) => {

    await axios.delete(
      `http://localhost:5000/api/files/${id}`
    )

    fetchFiles()
  }

  const runCode = async () => {

  try {

    const res = await axios.post(
      'http://localhost:5000/api/code/run',
      {
        language,
        code,
        input,
        fileId: selectedFileId,
      }
    )

    setOutput(res.data.output)

    fetchFiles()

  } catch (err) {

    setOutput('Execution failed')
  }
}

  const saveFile = async () => {

  try {

    const res = await axios.post(
      'http://localhost:5000/api/files/save',
      {
        user_id: user.id,
        filename,
        language,
        code,
        theoutput: output,
      }
    )

    if (res.data.file) {

      setSelectedFileId(
        res.data.file.id
      )
    }

    alert('File saved')

    fetchFiles()

  } catch (err) {

    alert('Save failed')
  }
}

  return (

    <div
      style={{
        display: 'flex',
        height: '100vh',
      }}
    >

      <div
        style={{
          width: '250px',
          background: '#1e293b',
          padding: '20px',
          overflowY: 'auto',
        }}
      >

        <h2>My Files</h2>

        <br />

        {files.map((file) => (

          <div
            key={file.id}
            style={{
              background:
                selectedFileId === file.id
                  ? '#2563eb'
                  : '#334155',

              padding: '12px',

              marginBottom: '10px',

              borderRadius: '8px',
            }}
          >

            <div
              onClick={() =>
                openFile(file)
              }

              style={{
                cursor: 'pointer',
              }}
            >

              {file.filename}

            </div>

            <button
  onClick={(e) => {

    e.stopPropagation()

    deleteFile(file.id)
  }}

  style={{
    marginTop: '8px',
    width: '35px',
    height: '35px',
    background: '#dc2626',
    border: 'none',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  }}
>
  🗑️
</button>

          </div>

        ))}

      </div>

      <div
        className="editor-container"
        style={{
          flex: 1,
        }}
      >

        <h1
          style={{
            marginBottom: '20px',
          }}
        >
          Online Code Editor
        </h1>

        <div className="top-bar">

          <input
            type="text"
            placeholder="Filename"
            value={filename}
            onChange={(e) =>
              setFilename(e.target.value)
            }
          />

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >

            <option value="python">
              Python
            </option>

            <option value="cpp">
              C++
            </option>

            <option value="java">
              Java
            </option>

          </select>

          <button onClick={runCode}>
            Run
          </button>

          <button onClick={saveFile}>
            Save
          </button>

        </div>

        <Editor
          height="500px"
          language={language}
          value={code}
          onChange={(value) =>
            setCode(value)
          }
        />

        <textarea
          placeholder="Program Input"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }

          style={{
            width: '100%',
            height: '120px',
            marginTop: '20px',
            background: '#1e293b',
            color: 'white',
            padding: '10px',
            borderRadius: '10px',
          }}
        />

        <div className="output-box">

          {output}

        </div>

      </div>

    </div>
  )
}

export default EditorPage