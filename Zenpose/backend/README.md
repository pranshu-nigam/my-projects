# ZenPose Backend API

A FastAPI-based backend service for the ZenPose yoga and wellness platform.

## Features

- **User Authentication**: JWT-based authentication system
- **User Management**: Registration, login, profile management
- **AI Pose Detection**: Machine learning-powered yoga pose analysis
- **Database Integration**: SQLite database with SQLAlchemy ORM
- **RESTful API**: Clean and well-documented endpoints

## Tech Stack

- **Framework**: FastAPI
- **Database**: SQLite with SQLAlchemy ORM
- **Authentication**: JWT tokens with python-jose
- **Password Hashing**: bcrypt via passlib
- **AI/ML**: TensorFlow/Keras for pose detection
- **Image Processing**: OpenCV and Pillow

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:
   ```bash
   python main.py
   ```

The API will be available at `http://localhost:3000`

### API Documentation

Once the server is running, visit:
- **Interactive API Docs**: `http://localhost:3000/docs`
- **ReDoc Documentation**: `http://localhost:3000/redoc`

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── database.py            # Database configuration and connection
├── models.py              # SQLAlchemy database models
├── schemas.py             # Pydantic schemas for request/response
├── auth.py                # Authentication utilities
├── pose_detection.py      # AI pose detection functionality
├── yoga_pose_5_model_3.keras  # Trained ML model
├── zenpose.db            # SQLite database file
└── README.md             # This file
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user info
- `POST /auth/logout` - Logout user
- `POST /auth/verify-password` - Verify user password
- `DELETE /auth/delete-account` - Delete user account

### User Management
- `GET /users` - Get all users (admin)
- `GET /users/{user_id}` - Get user by ID

### AI Pose Detection
- `POST /ai/pose-detection/analyze-image` - Analyze uploaded image
- `GET /ai/pose-detection/status` - Get AI model status

## Database Schema

### Users Table
- `id` - Primary key
- `first_name` - User's first name
- `last_name` - User's last name
- `username` - Unique username
- `email` - Unique email address
- `hashed_password` - Bcrypt hashed password
- `level` - User's yoga level (Beginner, Intermediate, Advanced)
- `created_at` - Account creation timestamp

## Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./zenpose.db
```

## AI Model

The application includes a pre-trained Keras model (`yoga_pose_5_model_3.keras`) for yoga pose detection. The model can identify:
- Warrior I
- Warrior II
- Tree Pose
- Downward Dog
- Mountain Pose
- Child's Pose

## Development

### Running Tests
```bash
# Run all tests
python -m pytest

# Run specific test file
python test_api.py
```

### Database Migrations
The application uses SQLAlchemy with automatic table creation. Tables are created when the application starts.

### Adding New Features
1. Create new models in `models.py`
2. Add corresponding schemas in `schemas.py`
3. Implement endpoints in `main.py`
4. Update this README with new endpoints

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- CORS is configured for frontend integration
- Input validation using Pydantic schemas

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details






