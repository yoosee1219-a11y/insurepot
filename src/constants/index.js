/**
 * 상수 통합 export
 * 다른 파일에서 import 시 편의성을 위한 re-export
 */

// 보험 관련
export {
  INSURANCE_TYPES,
  INSURANCE_TYPE_LIST,
  POST_CATEGORIES,
  POST_CATEGORY_LIST,
  DEFAULT_CATEGORY,
  DEFAULT_INSURANCE_TYPE,
} from './insurance';

// 상태 관련
export { CONSULTATION_STATUS, STATUS_COLORS, STATUS_LABELS, STATUS_OPTIONS } from './status';

// 메시지 관련
export {
  AUTH_MESSAGES,
  POST_MESSAGES,
  COMMENT_MESSAGES,
  CONSULTATION_MESSAGES,
  GENERAL_MESSAGES,
} from './messages';

// 폼 기본값
export {
  POST_FORM_DEFAULTS,
  CONSULTATION_FORM_DEFAULTS,
  COMMENT_FORM_DEFAULTS,
  LOGIN_FORM_DEFAULTS,
} from './formDefaults';
