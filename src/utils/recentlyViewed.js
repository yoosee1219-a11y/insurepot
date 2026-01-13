/**
 * 최근 본 글 관리 유틸리티
 * 로컬스토리지 기반으로 사용자가 본 게시글 추적
 */

const STORAGE_KEY = 'insurepot_recently_viewed';
const MAX_ITEMS = 10; // 최대 10개까지 저장

/**
 * 최근 본 글 목록 가져오기
 * @returns {Array} 최근 본 글 목록
 */
export const getRecentlyViewed = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('최근 본 글 로딩 실패:', error);
    return [];
  }
};

/**
 * 최근 본 글 추가
 * @param {Object} post - 게시글 객체 { id, title, category, created_at }
 */
export const addRecentlyViewed = (post) => {
  try {
    let recentPosts = getRecentlyViewed();

    // 이미 존재하는 항목 제거 (중복 방지)
    recentPosts = recentPosts.filter((item) => item.id !== post.id);

    // 맨 앞에 새 항목 추가
    recentPosts.unshift({
      id: post.id,
      title: post.title,
      category: post.category,
      created_at: post.created_at,
      viewedAt: new Date().toISOString(), // 조회 시간 기록
    });

    // 최대 개수 제한
    if (recentPosts.length > MAX_ITEMS) {
      recentPosts = recentPosts.slice(0, MAX_ITEMS);
    }

    // 로컬스토리지에 저장
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentPosts));

    return true;
  } catch (error) {
    console.error('최근 본 글 저장 실패:', error);
    return false;
  }
};

/**
 * 최근 본 글 전체 삭제
 */
export const clearRecentlyViewed = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('최근 본 글 삭제 실패:', error);
    return false;
  }
};

/**
 * 특정 글 제거
 * @param {string} postId - 제거할 게시글 ID
 */
export const removeRecentlyViewed = (postId) => {
  try {
    let recentPosts = getRecentlyViewed();
    recentPosts = recentPosts.filter((item) => item.id !== postId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentPosts));
    return true;
  } catch (error) {
    console.error('최근 본 글 제거 실패:', error);
    return false;
  }
};
