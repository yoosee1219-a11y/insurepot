/**
 * 보험 관련 상수 정의
 * One Source of Truth 원칙에 따라 보험 타입과 카테고리를 한 곳에서 관리
 */

// 보험 종류
export const INSURANCE_TYPES = {
  AUTO: '자동차보험',
  HEALTH: '실손보험',
  CANCER: '암보험',
  FAMILY: '가족보험',
  FIRE: '주택화재보험',
  TRAVEL: '여행자보험',
  CHILD: '어린이보험',
  PET: '반려동물보험',
  DRIVER: '운전자보험',
  ETC: '기타',
};

// 보험 종류 배열 (select 옵션용)
export const INSURANCE_TYPE_LIST = [
  INSURANCE_TYPES.AUTO,
  INSURANCE_TYPES.HEALTH,
  INSURANCE_TYPES.CANCER,
  INSURANCE_TYPES.FAMILY,
  INSURANCE_TYPES.FIRE,
  INSURANCE_TYPES.TRAVEL,
  INSURANCE_TYPES.ETC,
];

// 게시글 카테고리
export const POST_CATEGORIES = {
  AUTO_GUIDE: '자동차보험 가이드',
  HEALTH_INFO: '실손보험 정보',
  CANCER_GUIDE: '암보험 가이드',
  SAVE_TIP: '보험료 절약 팁',
  CLAIM_GUIDE: '보험금 청구 안내',
  FAQ: 'FAQ',
};

// 게시글 카테고리 배열 (select 옵션용)
export const POST_CATEGORY_LIST = [
  POST_CATEGORIES.AUTO_GUIDE,
  POST_CATEGORIES.HEALTH_INFO,
  POST_CATEGORIES.CANCER_GUIDE,
  POST_CATEGORIES.SAVE_TIP,
  POST_CATEGORIES.CLAIM_GUIDE,
  POST_CATEGORIES.FAQ,
];

// 기본 카테고리
export const DEFAULT_CATEGORY = POST_CATEGORIES.AUTO_GUIDE;

// 기본 보험 타입
export const DEFAULT_INSURANCE_TYPE = INSURANCE_TYPES.AUTO;
