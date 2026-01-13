/**
 * 댓글 관련 API 서비스
 * 댓글 CRUD 작업을 처리
 */

import { supabase } from '../supabaseClient';
import { handleApiError, createSuccessResult, checkSupabaseResponse } from '../utils/errorHandler';
import { COMMENT_MESSAGES } from '../constants';

export const commentService = {
  /**
   * 특정 게시글의 모든 댓글 조회
   * @param {number} postId - 게시글 ID
   * @returns {Promise<Object>} { success: boolean, data?: Array, error?: string }
   */
  fetchByPostId: async (postId) => {
    try {
      const response = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });

      const data = checkSupabaseResponse(response, '댓글 조회에 실패했습니다');

      return createSuccessResult(data || []);
    } catch (error) {
      return handleApiError(error, '댓글 조회에 실패했습니다');
    }
  },

  /**
   * 댓글 생성
   * @param {Object} commentData - 댓글 데이터
   * @returns {Promise<Object>}
   */
  create: async (commentData) => {
    try {
      const response = await supabase.from('comments').insert([commentData]);

      checkSupabaseResponse(response, COMMENT_MESSAGES.CREATE_ERROR);

      return createSuccessResult(null);
    } catch (error) {
      return handleApiError(error, COMMENT_MESSAGES.CREATE_ERROR);
    }
  },

  /**
   * 댓글 삭제
   * @param {number} commentId - 댓글 ID
   * @returns {Promise<Object>}
   */
  delete: async (commentId) => {
    try {
      const response = await supabase.from('comments').delete().eq('id', commentId);

      checkSupabaseResponse(response, COMMENT_MESSAGES.DELETE_ERROR);

      return createSuccessResult(null);
    } catch (error) {
      return handleApiError(error, COMMENT_MESSAGES.DELETE_ERROR);
    }
  },

  /**
   * 게시글별 댓글 수 조회
   * @param {number} postId - 게시글 ID
   * @returns {Promise<Object>}
   */
  countByPostId: async (postId) => {
    try {
      const response = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId);

      checkSupabaseResponse(response, '댓글 개수 조회에 실패했습니다');

      return createSuccessResult(response.count || 0);
    } catch (error) {
      return handleApiError(error, '댓글 개수 조회에 실패했습니다');
    }
  },
};
