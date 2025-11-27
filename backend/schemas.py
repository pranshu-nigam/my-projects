from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    """Base user schema"""
    first_name: str
    last_name: str
    username: str
    email: EmailStr

class UserCreate(UserBase):
    """Schema for user registration"""
    password: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters long')
        return v

class UserLogin(BaseModel):
    """Schema for user login"""
    email_or_username: str
    password: str

class UserResponse(UserBase):
    """Schema for user response"""
    id: int
    level: str
    created_at: datetime
    access_token: Optional[str] = None
    token_type: Optional[str] = None
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    """Schema for token response"""
    access_token: str
    token_type: str

class UserUpdate(BaseModel):
    """Schema for user profile updates"""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    bio: Optional[str] = None
    level: Optional[str] = None
    profile_picture: Optional[str] = None

class PasswordVerification(BaseModel):
    """Schema for password verification"""
    password: str
