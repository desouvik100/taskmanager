# Task Manager App

A full-stack task management application with user authentication, CRUD operations, and real-time task status updates.

## Features

- **User Authentication**: JWT-based signup/login system
- **Task Management**: Create, read, update, delete tasks
- **Status Toggle**: Mark tasks as pending/completed
- **Priority Levels**: Low, medium, high priority tasks
- **Due Dates**: Set and track task deadlines
- **Search & Filter**: Find tasks by title, status, or priority
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Express Validator for input validation

### Frontend
- React 18 with Hooks
- React Router for navigation
- Axios for API calls
- React Toastify for notifications
- Lucide React for icons

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm run install-deps
   ```

2. **Set up environment variables:**
   
   Create `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   NODE_ENV=development
   ```

3. **Start MongoDB:**
   ```bash
   # If using local MongoDB
   mongod
   ```

4. **Run the application:**
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Or run separately:
   npm run server  # Backend on port 5000
   npm run client  # Frontend on port 3000
   ```

5. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks (with optional filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/toggle` - Toggle task status
- `DELETE /api/tasks/:id` - Delete task

## Deployment

### Backend (Render/Heroku)

1. **For Render:**
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variables in Render dashboard

2. **For Heroku:**
   ```bash
   # In backend directory
   heroku create your-app-name
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   git subtree push --prefix backend heroku main
   ```

### Frontend (Vercel/Netlify)

1. **For Vercel:**
   - Connect your GitHub repository
   - Set root directory to `frontend`
   - Build command: `npm run build`
   - Output directory: `build`
   - Add environment variable: `REACT_APP_API_URL=your_backend_url`

2. **For Netlify:**
   - Drag and drop the `frontend/build` folder after running `npm run build`
   - Or connect GitHub repository with build settings

### Environment Variables for Production

**Backend:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your_super_secure_jwt_secret_key
NODE_ENV=production
```

**Frontend:**
```env
REACT_APP_API_URL=https://your-backend-url.com
```

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String,
  status: String (pending/completed),
  priority: String (low/medium/high),
  dueDate: Date,
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details