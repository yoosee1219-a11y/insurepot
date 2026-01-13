/**
 * 폼 초기값 상수 정의
 * 폼 초기화 시 사용되는 기본값을 한 곳에서 관리
 */

import { DEFAULT_CATEGORY, DEFAULT_INSURANCE_TYPE } from './insurance';

// 게시글 폼 초기값
export const POST_FORM_DEFAULTS = {
  title: '',
  category: DEFAULT_CATEGORY,
  content: '',
  is_published: false,
  view_count: 0,
  is_featured: false,
};

// 상담 문의 폼 초기값
export const CONSULTATION_FORM_DEFAULTS = {
  name: '',
  phone: '',
  email: '',
  insurance_type: DEFAULT_INSURANCE_TYPE,
  message: '',
};

// 댓글 폼 초기값
export const COMMENT_FORM_DEFAULTS = {
  author_name: '',
  author_password: '',
  content: '',
};

// 로그인 폼 초기값
export const LOGIN_FORM_DEFAULTS = {
  username: '',
  password: '',
};
