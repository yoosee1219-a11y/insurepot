/**
 * 유틸 함수 모음
 * 프로젝트 전체에서 사용되는 유틸리티 함수들을 export
 */

export * from './contentParser';
export * from './errorHandler';
export * from './seoSchema';
export * from './recentlyViewed';
export * from './validator';
export * from './rateLimiter';

/**
 * HTML 태그를 제거하고 순수 텍스트만 추출
 * @param {string} html - HTML 문자열
 * @param {number} maxLength - 최대 길이 (기본 150)
 * @returns {string} 순수 텍스트
 */
export function stripHtmlTags(html, maxLength = 150) {
  if (!html) return '';

  try {
    // DOM Parser를 사용한 강력한 HTML 파싱
    const div = document.createElement('div');

    // HTML 엔티티 먼저 디코딩
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    const decodedHtml = textArea.value;

    // DOM에 삽입하여 textContent로 순수 텍스트 추출
    div.innerHTML = decodedHtml;
    let text = div.textContent || div.innerText || '';

    // 연속 공백 및 줄바꿈 정리
    text = text
      .replace(/\s+/g, ' ') // 연속 공백을 하나로
      .replace(/\n+/g, ' ') // 줄바꿈을 공백으로
      .trim();

    // 최대 길이로 자르기
    if (text.length > maxLength) {
      text = text.substring(0, maxLength).trim() + '...';
    }

    return text;
  } catch (error) {
    console.error('HTML 태그 제거 오류:', error);
    // 에러 발생 시 간단한 정규식으로 fallback
    return html.replace(/<[^>]+>/g, '').substring(0, maxLength) + '...';
  }
}
