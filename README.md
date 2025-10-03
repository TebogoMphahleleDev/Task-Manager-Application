# Task Manager Application

This is a full-stack task management application built with Angular for the frontend and Python Flask for the backend. It uses a JSON file (`db.json`) for data persistence.

## Overview

This project is a learning journey for a first-time user of Angular and Python. It demonstrates key concepts such as:

- Angular component-based architecture
- Angular forms and validation
- Angular routing and navigation
- Angular services and HTTP client for API communication
- Flask REST API development
- CRUD operations with persistent storage in a JSON file
- Real-time UI updates on task changes
- Drag-and-drop task status management (Kanban style)

## Features

- User can add, edit, delete tasks with title, description, status, and priority.
- Tasks are displayed in a dashboard with columns for different statuses.
- Drag-and-drop tasks between status columns to update their status.
- Backend API persists tasks in `db.json`.
- Frontend communicates with backend via HTTP requests.
- Basic login endpoint for demonstration.

## Project Structure

- `src/app/`: Angular frontend source code
  - Components: Dashboard, TaskForm, TaskList, Login
  - Services: TaskService for API calls
- `app.py`: Flask backend API server
- `db.json`: JSON file storing tasks data
- `package.json`: Angular project dependencies and scripts

## How Far I've Come

- Successfully set up an Angular project with routing, forms, and services.
- Built a Flask backend API with CRUD endpoints and JSON persistence.
- Integrated frontend and backend with HTTP communication.
- Implemented real-time UI updates on task changes.
- Learned to handle drag-and-drop in Angular.
- Gained experience debugging connection issues and improving UX.
- Developed a full-stack application from scratch as a first-time Angular and Python user.

## Running the Application

### Backend

1. Ensure Python 3 is installed.
2. Install Flask and Flask-CORS:
   ```
   pip install flask flask-cors
   ```
3. Run the backend server:
   ```
   python app.py
   ```
   The server runs on `http://localhost:5000`.

### Frontend

1. Ensure Node.js and npm are installed.
2. Install dependencies:
   ```
   npm install
   ```
3. Run the Angular development server:
   ```
   ng serve
   ```
4. Open `http://localhost:4200` in your browser.

## Next Steps

- Add user authentication and authorization.
- Improve UI/UX with Angular Material.
- Add unit and end-to-end tests.
- Deploy backend and frontend to production environments.

---

This project is a great foundation for learning full-stack development with Angular and Python Flask. Feel free to explore and extend it!
