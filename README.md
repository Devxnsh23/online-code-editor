# Online LAN Based Code Editor

## Overview

Online LAN Based Code Editor is a browser-based multi-language programming environment built for educational institutions and computer laboratories.

The system allows students to:
- write code
- run code
- save code files
- reopen saved files
- continue coding from any computer

Teachers can:
- view student submissions
- view execution outputs
- check run counts
- check latest execution timestamps
- delete files

Supported languages:
- Python
- C++
- Java

---

# Features

## Student Features

- Authentication System
- Persistent File Storage
- Monaco Code Editor
- Multi-language Code Execution
- Program Input Support
- File Sidebar
- Reopen Saved Files
- Continue Coding
- Delete Files
- Dark Mode Interface

---

## Teacher Features

- Teacher Dashboard
- Expandable Student Submission Cards
- View Student Name
- View Filename & Language
- View Output
- View Run Count
- View Last Run Timestamp
- Delete Student Files

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- React Router DOM
- Monaco Editor

---

## Backend
- Node.js
- Express.js

---

## Database
- PostgreSQL

---

## Supported Languages
- Python
- C++
- Java

---

# Project Structure

```text
code-editor-project/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── temp/
│   ├── .env
│   ├── db.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Complete Installation & Setup Guide

# 1. Install Node.js

Download:
https://nodejs.org

Install:
- Download LTS version
- Keep everything default
- Make sure "Add to PATH" is enabled

Verify:

```bash
node -v
npm -v
```

---

# 2. Install Git

Download:
https://git-scm.com/downloads/win

Recommended installation options:
- Git from command line and third-party software
- Use bundled OpenSSH
- Use OpenSSL library

Verify:

```bash
git --version
```

---

# 3. Install PostgreSQL

Download:
https://www.postgresql.org/download/windows/

Install:
- PostgreSQL Server
- pgAdmin
- Command Line Tools

During installation:
- keep port as 5432
- remember postgres password

Verify:
Open pgAdmin 4.

---

# 4. Install Python

Download the standalone python installer:
https://www.python.org/downloads/

IMPORTANT:
Enable:

```text
Add Python to PATH
```

Verify:

```bash
python --version
```

---

# 5. Install Java JDK

Download:
https://adoptium.net

Install:
- JDK 17 (more stable than JDK 25, for this project anyways)
- x64

Verify:

```bash
java -version
javac -version
```

---

# 6. Install C++ Compiler

Download GCC from:
https://winlibs.com

Download:
- UCRT Runtime
- Win64
- GCC only

Extract the downloaded folder and move it to C drive.

```text
C:\mingw64
```

Now go inside:

```text
C:\mingw64\bin
```
Copy this path.

Add To PATH:

Search:
```text
Environment Variables
```
Open:
```text
Edit system environment variables
```
Click:
```text
Environment Variables
```
Under:
```text
System Variables
```
Find:
```text
Path
```
Edit → New

Paste:
```text
C:\mingw64\bin
```

Save everything. 

Verify:

```bash
g++ --version
```

---

# Backend Setup

# 1. Create Project Folder

```bash
mkdir code-editor-project
cd code-editor-project
mkdir backend
```

---

# 2. Initialize Backend

```bash
cd backend
npm init -y
```

---

# 3. Install Backend Dependencies

```bash
npm install express cors dotenv pg bcryptjs jsonwebtoken
npm install -D nodemon
```

---

# 4. Create Backend Folder Structure

Inside backend folder create:

```text
controllers/
routes/
temp/
```

Create files:

```text
server.js
db.js
.env
```

---

# 5. Create PostgreSQL Database

Open pgAdmin 4.

Expand:

```text
Servers
→ PostgreSQL
→ Databases
```

Right click:

```text
Databases
→ Create
→ Database
```

Database name:

```text
code_editor
```

Save.

---

# 6. Create Database Tables

Select:
```text
code_editor
```

Open:
```text
Query Tool
```

Run:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20)
);

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  filename VARCHAR(255),
  language VARCHAR(50),
  code TEXT,
  theoutput TEXT,
  run_count INTEGER DEFAULT 0,
  last_run TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 7. Create .env File

Inside backend folder create:

```text
.env
```

Paste:

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=code_editor
DB_PASSWORD=yourpassword
DB_PORT=5432

JWT_SECRET=jwtsecret

TEACHER_EMAIL=teacher@college.edu
```

Replace:
- yourpassword
- teacher email

---

# Frontend Setup

# 1. Open Project Root

```bash
cd ..
```
Or you can just kill the terminal(s), and create a new terminal which loads up in the root by default
---

# 2. Create Frontend Using Vite

```bash
npm create vite@latest frontend
```

Choose:
- React
- JavaScript

---

# 3. Open Frontend Folder

```bash
cd frontend
```

---

# 4. Install Frontend Dependencies

```bash
npm install
```

Install additional packages:

```bash
npm install axios react-router-dom @monaco-editor/react
```

---

# Running The Project

You need TWO terminals.

---

# Terminal 1 — Backend

```bash
cd backend
npx nodemon server.js
```

Expected:

```text
Server running on port 5000
```

---

# Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Expected:

```text
http://localhost:5173
```

Open that URL in browser.

# Terminating the process 
Press Ctrl+C in your backend and frontend terminals.

---

Any account registered using:

```env
TEACHER_EMAIL
```

inside `.env`

automatically becomes teacher.

All other accounts become students.

---

# Viewing PostgreSQL Tables

Open pgAdmin 4.

Expand:

```text
Servers
→ PostgreSQL
→ Databases
→ code_editor
→ Schemas
→ public
→ Tables
```

Tables:
- users
- files

To view data:

```text
Right Click Table
→ View/Edit Data
→ All Rows
```

---

# Running Backend Again Later

```bash
cd backend
npx nodemon server.js
```

---

# Running Frontend Again Later

```bash
cd frontend
npm run dev
```

