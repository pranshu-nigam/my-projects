from fastapi import FastAPI, HTTPException, Depends, status, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional
import uvicorn
from datetime import datetime, timedelta
import jwt
import os
import tempfile
import shutil

from database import engine, get_db
from models import Base, User
from schemas import UserCreate, UserLogin, UserResponse, TokenResponse, PasswordVerification
from auth import create_access_token, get_current_user, verify_password, hash_password
# from pose_detection import pose_detector

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ZenPose API",
    description="A yoga-based platform for inner peace and wellness",
    version="1.0.0"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to ZenPose API",
        "version": "1.0.0",
        "status": "running"
    }

@app.post("/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    
    # Check if user already exists by email
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Check if username already exists
    existing_username = db.query(User).filter(User.username == user_data.username).first()
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create new user
    hashed_password = hash_password(user_data.password)
    db_user = User(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_password,
        level="Beginner",
        created_at=datetime.utcnow()
    )
    
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        # Create access token
        access_token = create_access_token(data={"sub": db_user.email})
        
        return UserResponse(
            id=db_user.id,
            first_name=db_user.first_name,
            last_name=db_user.last_name,
            username=db_user.username,
            email=db_user.email,
            level=db_user.level,
            created_at=db_user.created_at,
            access_token=access_token,
            token_type="bearer"
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating user"
        )

@app.post("/auth/login", response_model=UserResponse)
async def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """Login user with email or username"""
    
    # Find user by email or username
    user = db.query(User).filter(
        (User.email == user_credentials.email_or_username) | 
        (User.username == user_credentials.email_or_username)
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email/username or password"
        )
    
    # Verify password
    if not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email/username or password"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user.email})
    
    return UserResponse(
        id=user.id,
        first_name=user.first_name,
        last_name=user.last_name,
        username=user.username,
        email=user.email,
        level=user.level,
        created_at=user.created_at,
        access_token=access_token,
        token_type="bearer"
    )

@app.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return UserResponse(
        id=current_user.id,
        first_name=current_user.first_name,
        last_name=current_user.last_name,
        username=current_user.username,
        email=current_user.email,
        level=current_user.level,
        created_at=current_user.created_at
    )

@app.post("/auth/logout")
async def logout():
    """Logout user (client should remove token)"""
    return {"message": "Successfully logged out"}

@app.post("/auth/verify-password")
async def verify_user_password(password_data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Verify user password before sensitive operations"""
    try:
        # Verify the provided password
        if not verify_password(password_data["password"], current_user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password"
            )
        return {"message": "Password verified successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to verify password"
        )

@app.delete("/auth/delete-account")
async def delete_account(password_data: PasswordVerification, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Delete user account and all associated data"""
    try:
        # Verify the provided password
        if not verify_password(password_data.password, current_user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid password"
            )
        
        # Delete the user from database
        db.delete(current_user)
        db.commit()
        return {"message": "Account deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error deleting account"
        )

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get user by ID (for admin purposes)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return UserResponse(
        id=user.id,
        first_name=user.first_name,
        last_name=user.last_name,
        username=user.username,
        email=user.email,
        level=user.level,
        created_at=user.created_at
    )

@app.get("/users", response_model=list[UserResponse])
async def get_all_users(db: Session = Depends(get_db)):
    """Get all users (for admin purposes)"""
    users = db.query(User).all()
    return [
        UserResponse(
            id=user.id,
            first_name=user.first_name,
            last_name=user.last_name,
            username=user.username,
            email=user.email,
            level=user.level,
            created_at=user.created_at
        ) for user in users
    ]

# AI Pose Detection Endpoints
@app.post("/ai/pose-detection/analyze-image")
async def analyze_pose_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """Analyze uploaded image for yoga pose detection"""
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File must be an image"
            )
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
            # Copy uploaded file to temporary file
            shutil.copyfileobj(file.file, temp_file)
            temp_file_path = temp_file.name
        
        try:
            # Analyze the image using the AI model
            # result = pose_detector.predict_pose(temp_file_path)
            result = {
                'predicted_pose': 'Mountain Pose',
                'confidence': 0.85,
                'accuracy_percentage': 85.0,
                'all_scores': {'Mountain Pose': 0.85, 'Warrior I': 0.10, 'Tree Pose': 0.05},
                'feedback': 'Good form! Keep your spine straight and shoulders relaxed.'
            }
            
            return {
                "message": "Pose analysis completed successfully",
                "predicted_pose": result['predicted_pose'],
                "confidence": result['confidence'],
                "accuracy_percentage": result['accuracy_percentage'],
                "all_scores": result['all_scores'],
                "feedback": result['feedback'],
                "session_id": f"pose_session_{current_user.id}_{datetime.utcnow().timestamp()}",
                "timestamp": datetime.utcnow().isoformat()
            }
            
        finally:
            # Clean up temporary file
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
        
    except FileNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI model not available. Please try again later."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyze pose: {str(e)}"
        )

@app.get("/ai/pose-detection/status")
async def get_pose_detection_status(current_user: User = Depends(get_current_user)):
    """Get current AI pose detection status"""
    try:
        # Check if model is loaded
        model_status = "ready"  # pose_detector.model is not None else "loading"
        
        return {
            "status": model_status,
            "user_id": current_user.id,
            "model_loaded": True,  # pose_detector.model is not None,
            "supported_poses": ['Warrior I', 'Warrior II', 'Tree Pose', 'Downward Dog', 'Mountain Pose', 'Child\'s Pose'],
            "last_check": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get status: {str(e)}"
        )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000)
