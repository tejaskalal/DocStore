# Design Document (design.md)

## Project Architecture Overview

This document explains the full architecture, workflow, and stack choices for the project. The goal is to provide clear reasoning behind each technology and how different components interact.

---

## 1. Technology Stack Choices

### **Q1--> Frontend: React.js**

React is chosen because:

- Highly interactive UI
- Component based structure
- Easy integration with REST APIs
- Supports file preview using browser capabilities (`_blank` open)
- Fast development and maintainability

### **Q2--> Backend: Node.js + Express**

Reasons for choosing Express:

- Simple route creation
- Middleware support (Multer for file uploads)
- High performance for I/O operations
- Large community + easy debugging

### **File Upload Handling: Multer**

Multer is used as it:

- Efficiently handles multipart/form-data
- Saves files in the `uploads/` folder
- Works smoothly with Express

### **Q3--> Database: MongoDB**

We store only **file metadata** (not the file itself) such as:

- filename
- path
- mime type
- upload date
- userId (optional)

Why MongoDB:

- Schema flexibility
- Easy to store JSON-like records
- Good performance for large metadata collections

### **Storage Method: Local Storage (uploads/)**

Chosen because:

- Easiest setup for assignments/projects
- No cost involved
- Full control over files
- Works well for small-to-medium use cases

Can be upgraded later to:

- AWS S3
- Cloudinary

### **Q4--> Changes needs to be done for 1000 users**

To support around 1,000 users, consider:

- Move file storage to cloud (AWS S3, Cloudinary, Firebase Storage)

- Add JWT authentication + role-based access

- Use rate limiting, Helmet.js, and strict file-size/type validation

- Add MongoDB indexes + pagination for document lists

- Use PM2 + Nginx for production stability

- Add logging (Winston/Morgan) + monitoring (Grafana/Sentry)

---

## 2. Architecture Overview

The project follows a **client–server architecture** with a REST API backend and a React-based frontend. Files are uploaded, stored, and referenced through secure URLs or database records.

### **Architecture**

```
┌─────────────────────────────┐       ┌──────────────────────────────┐
│           Frontend          │       │            Backend           │
│        (React JS)           │       │      (Node.js + Express)     │
├─────────────────────────────┤       ├──────────────────────────────┤
│ - UI components             │ <---> │ - REST API routes            │
│ - Axios fetch calls         │       │ - File handli(Multer)                             │ - File viewer               │       │                              │
└───┬─────────────────────────┘       └───────────┬──────────────────┘
    │                                             │
    ▼                                             ▼
┌──────────────────────────┐        ┌──────────────────────────────┐
│        MongoDB           │        │      File Storage (Local)    │
├──────────────────────────┤        ├──────────────────────────────┤
│ - File metadata          │        │ - Actual .pdf                │
│                          │        │ - Stored inside uploads/     │
└──────────────────────────┘        └──────────────────────────────┘
```

---

## 3. API Specification

### **1 Upload a File**

`POST /documents/upload`

- Uses Multer
- Saves actual file in `uploads/`
- Saves metadata in MongoDB

### **2 Get All Files**

`GET /documents`

- Returns list of all file metadata

### **3 View/Download a File**

`GET /documents/:id`

- Fetch file by ID
- Returns actual file to browser

### **4 Delete a File**

`DELETE /documents/:id`

- Removes file metadata from DB
- Removes physical file from `uploads/`

---

## 4. Data Flow Description

### **Q5--> Data flow**

File Upload (Step-by-step)

- User selects file → frontend sends POST /documents/upload using FormData.

- validation checks file type, and size.

- Multer processes multipart data and stores file (local or cloud).

- Server sanitizes filename and generates unique storage name.

- Metadata (name, path/url, size, mimeType, userId) saved in MongoDB.

- Server returns success response with file info.

File Download(Step-by-step)

- User clicks file → frontend sends GET /documents/:id.

- Server fetches file metadata from MongoDB.

- File is streamed from local folder from uploads.

- Browser downloads or displays the file.

---

## 5. Assumptions

### **Q6--> assumptions made to building this**

- Users upload standard document formats (PDF).

- File size limit assumed to be reasonable (10 MB per file).

- No heavy concurrency expected; typical single user upload at a time.

- Users have stable internet for uploads/downloads.

- Files are not malicious; basic validation is enough.

- Metadata stored in MongoDB is lightweight and indexed.

- Browser can open common document types with the \_blank method.

---

## 7. Summary

This architecture is chosen to:

- Keep the system lightweight
- Follow clean separation of concerns
- Use familiar and modern technologies
- Deliver a fast and scalable solution
