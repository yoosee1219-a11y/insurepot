import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { supabase } from '../supabaseClient';
import './PasswordChange.css';

function PasswordChange() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // 1. 입력값 검증
      if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
        setError('모든 항목을 입력해주세요.');
        setIsLoading(false);
        return;
      }

      // 2. 새 비밀번호 일치 확인
      if (formData.newPassword !== formData.confirmPassword) {
        setError('새 비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
        setIsLoading(false);
        return;
      }

      // 3. 비밀번호 강도 검증
      if (formData.newPassword.length < 6) {
        setError('새 비밀번호는 최소 6자 이상이어야 합니다.');
        setIsLoading(false);
        return;
      }

      // 4. 현재 사용자 확인
      const username = sessionStorage.getItem('adminUser');
      if (!username) {
        setError('로그인 세션이 만료되었습니다.');
        setIsLoading(false);
        return;
      }

      // 5. Supabase에서 현재 관리자 정보 가져오기
      const { data: adminData, error: fetchError } = await supabase
        .from('admin_users')
        .select('password_hash')
        .eq('username', username)
        .single();

      if (fetchError || !adminData) {
        setError('관리자 정보를 찾을 수 없습니다.');
        setIsLoading(false);
        return;
      }

      // 6. 현재 비밀번호 확인
      const isCurrentPasswordValid = await bcrypt.compare(
        formData.currentPassword,
        adminData.password_hash
      );

      if (!isCurrentPasswordValid) {
        setError('현재 비밀번호가 올바르지 않습니다.');
        setIsLoading(false);
        return;
      }

      // 7. 새 비밀번호 해싱
      const newPasswordHash = await bcrypt.hash(formData.newPassword, 10);

      // 8. Supabase에 새 비밀번호 저장
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ password_hash: newPasswordHash })
        .eq('username', username);

      if (updateError) {
        setError('비밀번호 변경에 실패했습니다: ' + updateError.message);
        setIsLoading(false);
        return;
      }

      // 9. 성공 메시지
      setSuccess('✅ 비밀번호가 성공적으로 변경되었습니다!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      // 10. 3초 후 세션 초기화 및 로그아웃 (보안을 위해)
      setTimeout(() => {
        alert('보안을 위해 다시 로그인해주세요.');
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminUser');
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      setError('오류가 발생했습니다: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="password-change-container">
      <div className="content-header">
        <h1>🔐 비밀번호 변경</h1>
        <p>관리자 계정의 비밀번호를 안전하게 변경하세요</p>
      </div>

      <div className="password-change-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>현재 비밀번호</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="현재 비밀번호를 입력하세요"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          <div className="form-group">
            <label>새 비밀번호</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="새 비밀번호를 입력하세요 (최소 6자)"
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label>새 비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="새 비밀번호를 다시 입력하세요"
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="btn-change" disabled={isLoading}>
            {isLoading ? '변경 중...' : '비밀번호 변경'}
          </button>
        </form>

        <div className="password-tips">
          <h3>💡 비밀번호 안전 수칙</h3>
          <ul>
            <li>최소 6자 이상 사용하세요</li>
            <li>영문, 숫자, 특수문자를 조합하면 더 안전합니다</li>
            <li>다른 사이트와 동일한 비밀번호는 피하세요</li>
            <li>정기적으로 비밀번호를 변경하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PasswordChange;
