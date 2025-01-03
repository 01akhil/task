# MERN Stack Project

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to provide user authentication, task management, and other typical backend operations. 

## Table of Contents

- [Overview]
- [Technologies Used]
- [Installation]
- [API Documentation]
  - [User Authentication]
  - [File Upload]
-[Deployed Links]


## Overview

This is a MERN stack application with the following features:
- File Upload (with Cloudinary)
- RESTful API Endpoints for managing users and tasks
- Frontend built with React

## Technologies Used

- **Node.js**: JavaScript runtime for backend.
- **Express.js**: Web framework for handling requests.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM for MongoDB to handle data models.
- **React**: JavaScript library for building the user interface.
- **JWT (JSON Web Token)**: Secure authentication mechanism.
- **bcryptjs**: Password hashing.
- **dotenv**: Managing environment variables.
- **cors**: Cross-origin resource sharing.
- **cookie-parser**: Parsing cookies in Express.

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/01akhil/task.git
2. Go to backend:
   ```bash
   cd backend

3. Run server
   ```bash
   npm start   

### Frontend Setup

1. Go to backend:
   ```bash
   cd frontend

3. Start it
   ```bash
   npm start


API Documentation
User Authentication
POST /api/tasks/signup: Registers a new user.
POST /api/tasks/login: User is login.
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id

We are using free web services for deploying, Thus the spin time is more
Deployed links(frontend):https://task-1-vnq0.onrender.com
Deployed links(backend):https://task-q9yb.onrender.com

