import React, { useState, useEffect } from 'react';
import Login from './Login';
import Admin from './Admin';

function AdminWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로그인 상태 확인
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = sessionStorage.getItem('adminToken');
    const user = sessionStorage.getItem('adminUser');

    // 토큰과 사용자 정보가 있으면 로그인 상태로 간주
    if (token && user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: '#f3f4f6',
        }}
      >
        <div style={{ fontSize: '1.5rem', color: '#6b7280' }}>로딩 중...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <Admin onLogout={handleLogout} />;
}

export default AdminWrapper;
