/**
 * 콘텐츠 파싱 유틸리티
 * HTML 콘텐츠 파싱 및 목차(TOC) 추출
 */

/**
 * HTML 문자열에서 제목 태그를 추출하여 목차 생성
 * @param {string} htmlContent - HTML 콘텐츠
 * @returns {Array} 목차 배열 [{ id, text, level }]
 */
export function extractTableOfContents(htmlContent) {
  if (!htmlContent) return [];

  try {
    const toc = [];
    const regex = /<h([1-6])\s+[^>]*id="([^"]+)"[^>]*>([^<]+)<\/h[1-6]>/gi;
    let match;

    while ((match = regex.exec(htmlContent)) !== null) {
      const level = parseInt(match[1]);
      const id = match[2];
      const text = match[3].trim();

      // h2, h3, h4만 목차에 포함
      if (level >= 2 && level <= 4) {
        toc.push({
          id,
          text,
          level,
        });
      }
    }

    console.log('📚 추출된 목차:', toc);
    return toc;
  } catch (error) {
    console.error('목차 추출 오류:', error);
    return [];
  }
}

/**
 * HTML 콘텐츠에 id를 추가하여 반환
 * @param {string} htmlContent - HTML 콘텐츠
 * @returns {string} id가 추가된 HTML 콘텐츠
 */
export function addIdsToHeadings(htmlContent) {
  if (!htmlContent) return '';

  try {
    // 정규식으로 제목 태그에 ID 추가
    let processedContent = htmlContent;
    let headingIndex = 0;

    // h1~h6 태그 찾아서 ID 추가
    processedContent = processedContent.replace(
      /<h([1-6])(\s+[^>]*)?>([^<]+)<\/h[1-6]>/gi,
      (match, level, attributes, text) => {
        const id = `heading-${headingIndex++}`;
        // 기존 속성이 있으면 유지하면서 ID 추가
        const attrs = attributes || '';
        if (attrs.includes('id=')) {
          return match; // 이미 ID가 있으면 그대로 반환
        }
        return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
      }
    );

    return processedContent;
  } catch (error) {
    console.error('HTML 파싱 오류:', error);
    return htmlContent;
  }
}

/**
 * 일반 텍스트를 HTML 포맷으로 변환
 * @param {string} text - 일반 텍스트
 * @returns {string} HTML 포맷 텍스트
 */
export function textToHtml(text) {
  if (!text) return '';

  const lines = text.split('\n');
  const htmlLines = [];
  let inList = false;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      // 빈 줄은 리스트 종료
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      return;
    }

    // 제목 형식 감지 (마크다운 스타일)
    if (trimmedLine.startsWith('####')) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push(`<h4>${trimmedLine.replace(/^####\s*/, '')}</h4>`);
      return;
    }
    if (trimmedLine.startsWith('###')) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push(`<h3>${trimmedLine.replace(/^###\s*/, '')}</h3>`);
      return;
    }
    if (trimmedLine.startsWith('##')) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push(`<h3>${trimmedLine.replace(/^##\s*/, '')}</h3>`);
      return;
    }
    if (trimmedLine.startsWith('#')) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push(`<h2>${trimmedLine.replace(/^#\s*/, '')}</h2>`);
      return;
    }

    // 숫자로 시작하는 제목 감지 (예: "1. 제목", "2. 제목")
    const numberedTitleMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
    if (numberedTitleMatch && trimmedLine.length > 10) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push(`<h3>${numberedTitleMatch[2]}</h3>`);
      return;
    }

    // 특정 키워드로 시작하는 제목 감지
    const titleKeywords = [
      '보장내용',
      '가입조건',
      '주의사항',
      '특징',
      '장점',
      '단점',
      '보험료',
      '보상범위',
      '청구방법',
      '필요서류',
      '가입대상',
      '보장기간',
    ];

    const startsWithKeyword = titleKeywords.some((keyword) => trimmedLine.startsWith(keyword));

    if (startsWithKeyword && trimmedLine.length < 30) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push(`<h3>${trimmedLine}</h3>`);
      return;
    }

    // 리스트 형식 감지
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      if (!inList) {
        htmlLines.push('<ul>');
        inList = true;
      }
      htmlLines.push(`<li>${trimmedLine.replace(/^[-*]\s*/, '')}</li>`);
      return;
    }

    // 일반 텍스트
    if (inList) {
      htmlLines.push('</ul>');
      inList = false;
    }
    htmlLines.push(`<p>${trimmedLine}</p>`);
  });

  // 마지막 리스트 닫기
  if (inList) {
    htmlLines.push('</ul>');
  }

  return htmlLines.join('');
}

/**
 * 특정 섹션으로 스무스 스크롤
 * @param {string} targetId - 스크롤할 엘리먼트 ID
 */
export function scrollToSection(targetId) {
  const element = document.getElementById(targetId);

  if (element) {
    const headerOffset = 100; // 헤더 높이 고려
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}
