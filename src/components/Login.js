import React, { useState } from 'react';
import './Login.css';
import { authService } from '../services';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await authService.login(username, password);

    if (result.success) {
      // 토큰과 사용자 정보 저장
      sessionStorage.setItem('adminToken', result.data.token);
      sessionStorage.setItem('adminUser', result.data.username);

      onLoginSuccess();
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🛡️ 보이지</h1>
          <p>관리자 로그인</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>아이디</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
              required
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="login-footer">
          <p>🔒 보안 연결로 보호됩니다</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
