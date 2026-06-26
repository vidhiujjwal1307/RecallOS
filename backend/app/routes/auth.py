from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.auth import get_current_user

from app.database import SessionLocal
from app.models.user import User
from app.schemas.user import UserSignup
from app.services.auth_service import hash_password
from fastapi.security import OAuth2PasswordRequestForm
from app.services.auth_service import (
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):

    existing_email = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_email:
        return {
            "message": "Email already exists"
        }

    existing_username = (
        db.query(User)
        .filter(User.username == user.username)
        .first()
    )

    if existing_username:
        return {
            "message": "Username already exists"
        }

    new_user = User(
        name=user.name,
        email=user.email,
        username=user.username,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully"
    }
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(User)
        .filter(User.username == form_data.username)
        .first()
    )

    if not existing_user:
        return {
            "message": "User not found"
        }

    if not verify_password(
        form_data.password,
        existing_user.password
    ):
        return {
            "message": "Incorrect Password"
        }

    token = create_access_token(
        {
            "sub": existing_user.username
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

    existing_user = (
        db.query(User)
        .filter(User.username == user.username)
        .first()
    )

    if not existing_user:
        return {
            "message": "User not found"
        }

    if not verify_password(
        user.password,
        existing_user.password
    ):
        return {
            "message": "Incorrect Password"
        }

    token = create_access_token(
        {
            "sub": existing_user.username
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
@router.get("/me")
def me(
    username: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "username": user.username
    }