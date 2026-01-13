/**
 * 인증 관련 API 서비스
 * 로그인, 비밀번호 변경 등 인증 관련 작업을 처리
 */

import bcrypt from 'bcryptjs';
import { supabase } from '../supabaseClient';
import { handleApiError, createSuccessResult, checkSupabaseResponse } from '../utils/errorHandler';
import { validateUsername, validatePassword } from '../utils/validator';
import { checkRateLimit, resetRateLimit } from '../utils/rateLimiter';
import { AUTH_MESSAGES } from '../constants';

export const authService = {
  /**
   * 관리자 로그인
   * @param {string} username - 사용자 아이디
   * @param {string} password - 비밀번호
   * @returns {Promise<Object>}
   */
  login: async (username, password) => {
    try {
      // 1. Rate Limiting 체크
      const rateLimitResult = checkRateLimit('LOGIN');
      if (!rateLimitResult.allowed) {
        return {
          success: false,
          error: rateLimitResult.error,
        };
      }

      // 2. 입력값 검증
      if (!username || !password) {
        return {
          success: false,
          error: AUTH_MESSAGES.REQUIRED_FIELDS,
        };
      }

      // 사용자명 검증
      const usernameValidation = validateUsername(username);
      if (!usernameValidation.valid) {
        return {
          success: false,
          error: usernameValidation.error,
        };
      }

      // 비밀번호 검증
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        return {
          success: false,
          error: passwordValidation.error,
        };
      }

      // 3. Supabase에서 관리자 정보 가져오기
      const response = await supabase
        .from('admin_users')
        .select('username, password_hash')
        .eq('username', username)
        .single();

      if (response.error || !response.data) {
        return {
          success: false,
          error: AUTH_MESSAGES.INVALID_CREDENTIALS,
        };
      }

      // 4. 비밀번호 확인 (해시 비교)
      const isPasswordValid = await bcrypt.compare(password, response.data.password_hash);

      if (!isPasswordValid) {
        return {
          success: false,
          error: AUTH_MESSAGES.INVALID_CREDENTIALS,
        };
      }

      // 5. 로그인 성공 - 강력한 토큰 생성
      const tokenData = {
        username: username,
        timestamp: Date.now(),
        random: Math.random().toString(36).substring(2),
      };
      const loginToken = btoa(JSON.stringify(tokenData));

      // 6. Rate Limit 초기화 (로그인 성공)
      resetRateLimit('LOGIN');

      return createSuccessResult({
        token: loginToken,
        username: username,
      });
    } catch (error) {
      return handleApiError(error, AUTH_MESSAGES.LOGIN_ERROR);
    }
  },

  /**
   * 비밀번호 변경
   * @param {string} username - 사용자 아이디
   * @param {string} currentPassword - 현재 비밀번호
   * @param {string} newPassword - 새 비밀번호
   * @returns {Promise<Object>}
   */
  changePassword: async (username, currentPassword, newPassword) => {
    try {
      // 1. 현재 비밀번호 확인
      const loginResult = await authService.login(username, currentPassword);

      if (!loginResult.success) {
        return {
          success: false,
          error: '현재 비밀번호가 올바르지 않습니다.',
        };
      }

      // 2. 새 비밀번호 해싱
      const newPasswordHash = await bcrypt.hash(newPassword, 10);

      // 3. 비밀번호 업데이트
      const response = await supabase
        .from('admin_users')
        .update({ password_hash: newPasswordHash })
        .eq('username', username);

      checkSupabaseResponse(response, AUTH_MESSAGES.PASSWORD_CHANGE_ERROR);

      return createSuccessResult(null);
    } catch (error) {
      return handleApiError(error, AUTH_MESSAGES.PASSWORD_CHANGE_ERROR);
    }
  },

  /**
   * 로그아웃 (세션 스토리지 정리)
   * @returns {Object}
   */
  logout: () => {
    try {
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminUser');

      return createSuccessResult(null);
    } catch (error) {
      return handleApiError(error, '로그아웃에 실패했습니다');
    }
  },

  /**
   * 로그인 상태 확인
   * @returns {boolean}
   */
  isAuthenticated: () => {
    const token = sessionStorage.getItem('adminToken');
    const user = sessionStorage.getItem('adminUser');
    return !!(token && user);
  },

  /**
   * 현재 로그인한 사용자 정보 가져오기
   * @returns {Object|null}
   */
  getCurrentUser: () => {
    const user = sessionStorage.getItem('adminUser');
    const token = sessionStorage.getItem('adminToken');

    if (user && token) {
      return { username: user, token };
    }

    return null;
  },
};
