import { supabase } from '../supabaseClient';

/**
 * 이미지 업로드 서비스
 * Supabase Storage를 사용하여 이미지를 업로드하고 URL을 반환
 */
export const imageUploadService = {
  /**
   * 이미지 파일을 Supabase Storage에 업로드
   * @param {File} file - 업로드할 이미지 파일
   * @returns {Promise<{success: boolean, url?: string, error?: string}>}
   */
  uploadImage: async (file) => {
    try {
      // 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        return {
          success: false,
          error: '이미지 파일만 업로드 가능합니다.',
        };
      }

      // 파일 크기 검증 (5MB)
      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        return {
          success: false,
          error: '이미지 크기는 5MB 이하여야 합니다.',
        };
      }

      // 고유한 파일명 생성
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 10);
      const fileExt = file.name.split('.').pop().toLowerCase();
      const fileName = `post-${timestamp}-${randomStr}.${fileExt}`;
      const filePath = `posts/${fileName}`;

      console.log('📤 이미지 업로드 시작:', fileName);

      // Supabase Storage에 업로드
      const { data, error } = await supabase.storage.from('images').upload(filePath, file, {
        cacheControl: '3600', // 1시간 캐시
        upsert: false, // 동일한 파일명이 있으면 에러
      });

      if (error) {
        console.error('❌ 업로드 에러:', error);
        throw error;
      }

      console.log('✅ 업로드 성공:', data);

      // Public URL 가져오기
      const {
        data: { publicUrl },
      } = supabase.storage.from('images').getPublicUrl(filePath);

      console.log('🔗 Public URL:', publicUrl);

      return {
        success: true,
        url: publicUrl,
      };
    } catch (error) {
      console.error('💥 이미지 업로드 실패:', error);

      // 에러 메시지 처리
      let errorMessage = '이미지 업로드에 실패했습니다.';

      if (error.message?.includes('Bucket not found')) {
        errorMessage = '이미지 저장소가 설정되지 않았습니다. 관리자에게 문의하세요.';
      } else if (error.message?.includes('No API key found')) {
        errorMessage = 'Supabase 설정이 올바르지 않습니다.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  /**
   * 이미지 삭제 (필요 시 사용)
   * @param {string} filePath - 삭제할 파일 경로 (예: "posts/abc.jpg")
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  deleteImage: async (filePath) => {
    try {
      const { error } = await supabase.storage.from('images').remove([filePath]);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
};
