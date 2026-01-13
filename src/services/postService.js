/**
 * 게시글 관련 API 서비스
 * 게시글 CRUD 작업을 처리
 */

import { supabase } from '../supabaseClient';
import { handleApiError, createSuccessResult, checkSupabaseResponse } from '../utils/errorHandler';
import { POST_MESSAGES } from '../constants';

export const postService = {
  /**
   * 모든 게시글 조회
   * @returns {Promise<Object>} { success: boolean, data?: Array, error?: string }
   */
  fetchAll: async () => {
    try {
      const response = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      const data = checkSupabaseResponse(response, POST_MESSAGES.FETCH_ERROR);

      return createSuccessResult(data || []);
    } catch (error) {
      return handleApiError(error, POST_MESSAGES.FETCH_ERROR);
    }
  },

  /**
   * 발행된 게시글만 조회
   * @param {number} limit - 조회할 게시글 수 (기본값: 전체)
   * @returns {Promise<Object>}
   */
  fetchPublished: async (limit = null) => {
    try {
      let query = supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const response = await query;
      const data = checkSupabaseResponse(response, POST_MESSAGES.FETCH_ERROR);

      return createSuccessResult(data || []);
    } catch (error) {
      return handleApiError(error, POST_MESSAGES.FETCH_ERROR);
    }
  },

  /**
   * 특정 게시글 조회
   * @param {number} id - 게시글 ID
   * @returns {Promise<Object>}
   */
  fetchById: async (id) => {
    try {
      const response = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();

      const data = checkSupabaseResponse(response, POST_MESSAGES.FETCH_ERROR);

      return createSuccessResult(data);
    } catch (error) {
      return handleApiError(error, POST_MESSAGES.FETCH_ERROR);
    }
  },

  /**
   * 게시글 생성
   * @param {Object} postData - 게시글 데이터
   * @returns {Promise<Object>}
   */
  create: async (postData) => {
    try {
      const response = await supabase.from('posts').insert([postData]);

      checkSupabaseResponse(response, POST_MESSAGES.CREATE_ERROR);

      return createSuccessResult(null);
    } catch (error) {
      return handleApiError(error, POST_MESSAGES.CREATE_ERROR);
    }
  },

  /**
   * 게시글 수정
   * @param {number} id - 게시글 ID
   * @param {Object} postData - 수정할 데이터
   * @returns {Promise<Object>}
   */
  update: async (id, postData) => {
    try {
      const response = await supabase.from('posts').update(postData).eq('id', id);

      checkSupabaseResponse(response, POST_MESSAGES.UPDATE_ERROR);

      return createSuccessResult(null);
    } catch (error) {
      return handleApiError(error, POST_MESSAGES.UPDATE_ERROR);
    }
  },

  /**
   * 게시글 삭제
   * @param {number} id - 게시글 ID
   * @returns {Promise<Object>}
   */
  delete: async (id) => {
    try {
      const response = await supabase.from('posts').delete().eq('id', id);

      checkSupabaseResponse(response, POST_MESSAGES.DELETE_ERROR);

      return createSuccessResult(null);
    } catch (error) {
      return handleApiError(error, POST_MESSAGES.DELETE_ERROR);
    }
  },

  /**
   * 조회수 증가
   * @param {number} postId - 게시글 ID
   * @returns {Promise<Object>}
   */
  incrementViewCount: async (postId) => {
    try {
      const response = await supabase.rpc('increment_view_count', {
        post_id: postId,
      });

      checkSupabaseResponse(response, '조회수 증가 실패');

      return createSuccessResult(null);
    } catch (error) {
      return handleApiError(error, '조회수 증가 실패');
    }
  },

  /**
   * 카테고리별 게시글 수 조회
   * @returns {Promise<Object>}
   */
  fetchCategoryCounts: async () => {
    try {
      const response = await supabase.from('posts').select('category').eq('is_published', true);

      const data = checkSupabaseResponse(response, '카테고리 조회 실패');

      // 카테고리별 개수 계산
      const categoryCount = {};
      data.forEach((post) => {
        if (post.category) {
          categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
        }
      });

      const categoryList = Object.entries(categoryCount).map(([name, count]) => ({
        name,
        count,
      }));

      return createSuccessResult(categoryList);
    } catch (error) {
      return handleApiError(error, '카테고리 조회 실패');
    }
  },

  /**
   * 인접 게시글 조회 (이전글, 다음글)
   * @param {string} currentDate - 현재 게시글의 작성일
   * @returns {Promise<Object>}
   */
  fetchAdjacentPosts: async (currentDate) => {
    try {
      // 이전 글
      const prevResponse = await supabase
        .from('posts')
        .select('id, title')
        .eq('is_published', true)
        .lt('created_at', currentDate)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      // 다음 글
      const nextResponse = await supabase
        .from('posts')
        .select('id, title')
        .eq('is_published', true)
        .gt('created_at', currentDate)
        .order('created_at', { ascending: true })
        .limit(1)
        .single();

      return createSuccessResult({
        prevPost: prevResponse.data || null,
        nextPost: nextResponse.data || null,
      });
    } catch (error) {
      return handleApiError(error, '인접 게시글 조회 실패');
    }
  },

  /**
   * 최근 게시글 조회
   * @param {number} limit - 조회할 게시글 수
   * @returns {Promise<Object>}
   */
  fetchRecent: async (limit = 5) => {
    try {
      const response = await supabase
        .from('posts')
        .select('id, title, created_at')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      const data = checkSupabaseResponse(response, '최근 게시글 조회 실패');

      return createSuccessResult(data || []);
    } catch (error) {
      return handleApiError(error, '최근 게시글 조회 실패');
    }
  },

  /**
   * 인기 게시글 조회
   * is_featured = true인 글 우선, 나머지는 조회수 순
   * @param {number} limit - 조회할 게시글 수
   * @returns {Promise<Object>}
   */
  fetchPopular: async (limit = 5) => {
    try {
      // 1. 인기글로 설정된 글 가져오기
      const featuredResponse = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('view_count', { ascending: false });

      const featuredPosts = featuredResponse.data || [];

      // 2. 나머지 조회수 높은 글 가져오기
      const remainingLimit = limit - featuredPosts.length;
      let topPosts = [];

      if (remainingLimit > 0) {
        const topResponse = await supabase
          .from('posts')
          .select('*')
          .eq('is_published', true)
          .eq('is_featured', false)
          .order('view_count', { ascending: false })
          .limit(remainingLimit);

        topPosts = topResponse.data || [];
      }

      // 3. 합치기 (인기글 먼저, 그 다음 조회수 순)
      const popularPosts = [...featuredPosts, ...topPosts].slice(0, limit);

      return createSuccessResult(popularPosts);
    } catch (error) {
      return handleApiError(error, '인기 게시글 조회 실패');
    }
  },
};
