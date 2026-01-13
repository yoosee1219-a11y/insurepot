/**
 * 상담 문의 관련 API 서비스
 * 상담 문의 CRUD 작업을 처리
 */

import { supabase } from '../supabaseClient';
import { handleApiError, createSuccessResult, checkSupabaseResponse } from '../utils/errorHandler';
import { validateConsultationData } from '../utils/validator';
import { checkRateLimit } from '../utils/rateLimiter';
import { CONSULTATION_MESSAGES } from '../constants';

export const consultationService = {
  /**
   * 모든 상담 문의 조회
   * @returns {Promise<Object>} { success: boolean, data?: Array, error?: string }
   */
  fetchAll: async () => {
    try {
      const response = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });

      const data = checkSupabaseResponse(response, '상담 문의 조회에 실패했습니다');

      return createSuccessResult(data || []);
    } catch (error) {
      return handleApiError(error, '상담 문의 조회에 실패했습니다');
    }
  },

  /**
   * 상담 문의 생성
   * @param {Object} consultationData - 상담 문의 데이터
   * @returns {Promise<Object>}
   */
  create: async (consultationData) => {
    try {
      // 1. Rate Limiting 체크
      const rateLimitResult = checkRateLimit('CONSULTATION');
      if (!rateLimitResult.allowed) {
        return {
          success: false,
          error: rateLimitResult.error,
        };
      }

      // 2. 입력값 검증
      const validation = validateConsultationData(consultationData);
      if (!validation.valid) {
        const errorMessages = Object.values(validation.errors).join('\n');
        return {
          success: false,
          error: errorMessages,
        };
      }

      // 3. 데이터 정제 (trim)
      const cleanData = {
        ...consultationData,
        name: consultationData.name?.trim(),
        phone: consultationData.phone?.trim(),
        email: consultationData.email?.trim(),
        message: consultationData.message?.trim(),
      };

      // 4. 상담 문의 저장
      const response = await supabase.from('consultations').insert([cleanData]);

      checkSupabaseResponse(response, CONSULTATION_MESSAGES.CREATE_ERROR);

      return createSuccessResult(null);
    } catch (error) {
      return handleApiError(error, CONSULTATION_MESSAGES.CREATE_ERROR);
    }
  },

  /**
   * 상담 문의 상태 업데이트
   * @param {number} id - 상담 문의 ID
   * @param {string} status - 변경할 상태 (pending, in_progress, completed)
   * @returns {Promise<Object>}
   */
  updateStatus: async (id, status) => {
    try {
      const response = await supabase.from('consultations').update({ status }).eq('id', id);

      checkSupabaseResponse(response, CONSULTATION_MESSAGES.UPDATE_ERROR);

      return createSuccessResult(null);
    } catch (error) {
      return handleApiError(error, CONSULTATION_MESSAGES.UPDATE_ERROR);
    }
  },

  /**
   * 상담 문의 삭제
   * @param {number} id - 상담 문의 ID
   * @returns {Promise<Object>}
   */
  delete: async (id) => {
    try {
      const response = await supabase.from('consultations').delete().eq('id', id);

      checkSupabaseResponse(response, '상담 문의 삭제에 실패했습니다');

      return createSuccessResult(null);
    } catch (error) {
      return handleApiError(error, '상담 문의 삭제에 실패했습니다');
    }
  },

  /**
   * 상태별 상담 문의 개수 조회
   * @param {string} status - 조회할 상태
   * @returns {Promise<Object>}
   */
  countByStatus: async (status) => {
    try {
      const response = await supabase
        .from('consultations')
        .select('*', { count: 'exact', head: true })
        .eq('status', status);

      checkSupabaseResponse(response, '상담 문의 개수 조회에 실패했습니다');

      return createSuccessResult(response.count || 0);
    } catch (error) {
      return handleApiError(error, '상담 문의 개수 조회에 실패했습니다');
    }
  },
};
