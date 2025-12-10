# Document Storage App - README

## 📌 Project Overview

This is a simple **Document Storage Application** built using **React (frontend)** and **Node.js + Express + MongoDB (backend)**. It allows a user to upload,download, and delete documents. This project was built as a single-user system (no authentication required).

---

## Features

- Upload documents (PDF)
- Download documents
- Delete documents
- Document metadata: Name, Type, Description
- User friendly UI with message alerts

---

## Tech Stack

### **Frontend:**

- React
- Axios
- Bootstrap
- React Icons

### **Backend:**

- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (file upload)

---

## How to Run the Project Locally

### **1️ Clone the repository**

```bash
git clone https://github.com/tejaskalal/DocStore.git
cd DocStore
```

### **2️ Install dependencies**

#### **Backend**

```bash
cd backend
npm install
```

#### **Frontend**

```bash
cd frontend
npm install
```

---

## Start the Project

### **Start Backend**

```bash
cd backend
npm start
```

The backend will run at: **[http://localhost:3000](http://localhost:3000)**

### **Start Frontend**

```bash
cd frontend
npm run dev
```

The frontend will run at: **[http://localhost:5173](http://localhost:5173)** (or whichever port Vite chooses)

---

## Example API Calls

### **GET all documents**

```bash
curl -X GET http://localhost:3000/documents
```

### **Download a document**

```bash
curl -O http://localhost:3000/documents/<document-id>
```

### **Delete a document**

```bash
curl -X DELETE http://localhost:3000/documents/<document-id>
```

---

## Folder Structure

```
DocStore/
│
├── backend/
│ ├── models/
│ │ └── ( mongoose models)
│ ├── uploads/ # Uploaded files stored here
│ ├── .env # Environment variables
│ ├── .gitignore
│ ├── package.json
│ ├── package-lock.json
│ ├── server.js # Main backend server
│ └── upload.js # Multer config
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/ # All React components
│ │ ├── App.css
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .gitignore
│ ├── index.html
│ ├── eslint.config.js
│ ├── package.json
│ └── package-lock.json
│
└── README.md # Project documentation
└── design.md # Project delivarables
```

---

## Future Improvements

- Add user authentication
- Add ability to preview documents
- Add search & filters

---
