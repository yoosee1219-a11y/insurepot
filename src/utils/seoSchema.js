/**
 * SEO 구조화 데이터 생성 유틸리티
 * Schema.org 형식을 따름
 */

// 사이트 기본 URL (배포 시 실제 도메인으로 변경 필요)
const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://insurepot.com';

/**
 * 조직(Organization) 스키마 생성
 * 회사/사이트 정보를 구조화
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '보험이지',
    url: SITE_URL,
    logo: `${SITE_URL}/logo512.png`,
    description: '보험 비교, 상담, 정보를 한 곳에서 - 보험이지',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: '고객 상담',
      availableLanguage: 'Korean',
    },
  };
}

/**
 * 기사(Article) 스키마 생성
 * 블로그 게시글에 대한 구조화 데이터
 */
export function getArticleSchema(post) {
  if (!post) return null;

  // HTML 태그 제거하여 순수 텍스트 추출
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const description = post.content ? stripHtml(post.content).substring(0, 160) : '';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: description,
    image: `${SITE_URL}/logo512.png`, // 게시글 이미지가 있다면 해당 URL 사용
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      '@type': 'Organization',
      name: '보험이지',
    },
    publisher: {
      '@type': 'Organization',
      name: '보험이지',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/post/${post.id}`,
    },
  };
}

/**
 * 빵부스러기(Breadcrumb) 스키마 생성
 * 사이트 내 위치를 나타내는 탐색 경로
 */
export function getBreadcrumbSchema(category, title) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category,
        item: `${SITE_URL}/category/${encodeURIComponent(category)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
      },
    ],
  };
}

/**
 * FAQ 스키마 생성 (향후 FAQ 페이지에 사용 가능)
 */
export function getFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * 보험 상품 스키마 생성 (향후 보험 상품 비교 페이지에 사용 가능)
 */
export function getProductSchema(product) {
  if (!product) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.company,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'KRW',
      lowPrice: product.minPrice,
      highPrice: product.maxPrice,
    },
  };
}
