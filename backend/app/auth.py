from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from typing import Optional
import httpx
import os
from .auth_schemas import TokenData, UserInfo

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
AUTHENTIK_URL = os.getenv("AUTHENTIK_URL", "http://authentik-server:9000")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> Optional[UserInfo]:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Проверяем токен через Authentik
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{AUTHENTIK_URL}/api/v3/users/me/",
                headers={"Authorization": f"Bearer {token}"}
            )
            
            if response.status_code != 200:
                raise credentials_exception
            
            user_data = response.json()
            return UserInfo(
                id=str(user_data["pk"]),
                email=user_data["email"],
                name=user_data.get("name", user_data["username"])
            )
            
    except JWTError:
        raise credentials_exception
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Authentication error: {str(e)}"
        )