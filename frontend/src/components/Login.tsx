import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const authentikUrl = process.env.REACT_APP_AUTHENTIK_URL || 'http://localhost:9000';

  const handleLogin = () => {
    const redirectUri = `${window.location.origin}/auth/callback`;
    window.location.href = `${authentikUrl}/application/o/authorize/?response_type=code&client_id=notes-app&redirect_uri=${redirectUri}`;
  };

  return (
    <div className="login-container">
      <h1>Вход в приложение</h1>
      <button onClick={handleLogin}>Войти через Authentik</button>
    </div>
  );
};

export default Login;