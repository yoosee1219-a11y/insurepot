/**
 * 입력값 검증 유틸리티
 * XSS, SQL Injection, 길이 제한 등 보안 검증
 */

/**
 * XSS 공격 방어 - HTML 태그 제거 또는 이스케이프
 * @param {string} input - 검증할 입력값
 * @returns {string} 정제된 문자열
 */
export const sanitizeHtml = (input) => {
  if (!input || typeof input !== 'string') return '';

  // HTML 태그 제거
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * SQL Injection 방어 - 위험한 SQL 키워드 확인
 * @param {string} input - 검증할 입력값
 * @returns {boolean} 안전하면 true
 */
export const isSqlSafe = (input) => {
  if (!input || typeof input !== 'string') return true;

  const dangerousPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC|SCRIPT)\b)/gi,
    /(--|;|\/\*|\*\/|xp_|sp_)/gi,
    /('|"|`|<|>|&|\||\\)/gi,
  ];

  return !dangerousPatterns.some((pattern) => pattern.test(input));
};

/**
 * 이름 검증
 * @param {string} name - 검증할 이름
 * @returns {Object} { valid: boolean, error?: string }
 */
export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: '이름을 입력해주세요.' };
  }

  if (name.length < 2 || name.length > 20) {
    return {
      valid: false,
      error: '이름은 2~20자 사이로 입력해주세요.',
    };
  }

  // 특수문자 제한 (한글, 영문, 숫자, 공백만 허용)
  const namePattern = /^[가-힣a-zA-Z0-9\s]+$/;
  if (!namePattern.test(name)) {
    return {
      valid: false,
      error: '이름은 한글, 영문, 숫자만 사용 가능합니다.',
    };
  }

  // XSS 체크
  const sanitized = sanitizeHtml(name);
  if (sanitized !== name) {
    return { valid: false, error: '유효하지 않은 문자가 포함되어 있습니다.' };
  }

  return { valid: true };
};

/**
 * 비밀번호 검증 (강도 체크)
 * @param {string} password - 검증할 비밀번호
 * @returns {Object} { valid: boolean, error?: string, strength?: string }
 */
export const validatePassword = (password) => {
  if (!password || password.length === 0) {
    return { valid: false, error: '비밀번호를 입력해주세요.' };
  }

  if (password.length < 4) {
    return {
      valid: false,
      error: '비밀번호는 최소 4자 이상이어야 합니다.',
    };
  }

  if (password.length > 50) {
    return {
      valid: false,
      error: '비밀번호는 50자 이하로 입력해주세요.',
    };
  }

  // 관리자 비밀번호는 더 강력하게 (선택적)
  let strength = '약함';
  if (password.length >= 8) {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strengthScore = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

    if (strengthScore >= 3) strength = '강함';
    else if (strengthScore >= 2) strength = '보통';
  }

  return { valid: true, strength };
};

/**
 * 댓글 내용 검증
 * @param {string} content - 검증할 댓글 내용
 * @returns {Object} { valid: boolean, error?: string }
 */
export const validateCommentContent = (content) => {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: '댓글 내용을 입력해주세요.' };
  }

  if (content.length < 2) {
    return {
      valid: false,
      error: '댓글은 최소 2자 이상 입력해주세요.',
    };
  }

  if (content.length > 500) {
    return {
      valid: false,
      error: '댓글은 500자 이하로 입력해주세요.',
    };
  }

  // SQL Injection 체크
  if (!isSqlSafe(content)) {
    return {
      valid: false,
      error: '허용되지 않는 문자가 포함되어 있습니다.',
    };
  }

  // 연속된 같은 문자 체크 (스팸 방지)
  const repeatedPattern = /(.)\1{9,}/; // 같은 문자 10번 이상 반복
  if (repeatedPattern.test(content)) {
    return {
      valid: false,
      error: '같은 문자를 너무 많이 반복할 수 없습니다.',
    };
  }

  return { valid: true };
};

/**
 * 이메일 검증
 * @param {string} email - 검증할 이메일
 * @returns {Object} { valid: boolean, error?: string }
 */
export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: '이메일을 입력해주세요.' };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { valid: false, error: '올바른 이메일 형식이 아닙니다.' };
  }

  if (email.length > 100) {
    return {
      valid: false,
      error: '이메일은 100자 이하로 입력해주세요.',
    };
  }

  return { valid: true };
};

/**
 * 전화번호 검증
 * @param {string} phone - 검증할 전화번호
 * @returns {Object} { valid: boolean, error?: string }
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return { valid: false, error: '전화번호를 입력해주세요.' };
  }

  // 숫자와 하이픈만 허용
  const phonePattern = /^[0-9-]+$/;
  if (!phonePattern.test(phone)) {
    return {
      valid: false,
      error: '전화번호는 숫자와 하이픈(-)만 입력 가능합니다.',
    };
  }

  // 하이픈 제거 후 길이 체크
  const digitsOnly = phone.replace(/-/g, '');
  if (digitsOnly.length < 9 || digitsOnly.length > 11) {
    return {
      valid: false,
      error: '올바른 전화번호 형식이 아닙니다.',
    };
  }

  return { valid: true };
};

/**
 * URL 검증
 * @param {string} url - 검증할 URL
 * @returns {Object} { valid: boolean, error?: string }
 */
export const validateUrl = (url) => {
  if (!url || url.trim().length === 0) {
    return { valid: true }; // URL은 선택적일 수 있음
  }

  try {
    const urlObj = new URL(url);

    // http, https만 허용
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return {
        valid: false,
        error: 'http 또는 https 프로토콜만 허용됩니다.',
      };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: '올바른 URL 형식이 아닙니다.' };
  }
};

/**
 * 관리자 아이디 검증
 * @param {string} username - 검증할 아이디
 * @returns {Object} { valid: boolean, error?: string }
 */
export const validateUsername = (username) => {
  if (!username || username.trim().length === 0) {
    return { valid: false, error: '아이디를 입력해주세요.' };
  }

  if (username.length < 4 || username.length > 20) {
    return {
      valid: false,
      error: '아이디는 4~20자 사이로 입력해주세요.',
    };
  }

  // 영문, 숫자, 언더스코어만 허용
  const usernamePattern = /^[a-zA-Z0-9_]+$/;
  if (!usernamePattern.test(username)) {
    return {
      valid: false,
      error: '아이디는 영문, 숫자, 언더스코어(_)만 사용 가능합니다.',
    };
  }

  return { valid: true };
};

/**
 * 게시글 제목 검증
 * @param {string} title - 검증할 제목
 * @returns {Object} { valid: boolean, error?: string }
 */
export const validatePostTitle = (title) => {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: '제목을 입력해주세요.' };
  }

  if (title.length < 2 || title.length > 100) {
    return {
      valid: false,
      error: '제목은 2~100자 사이로 입력해주세요.',
    };
  }

  // XSS 체크
  const sanitized = sanitizeHtml(title);
  if (sanitized !== title) {
    return { valid: false, error: '유효하지 않은 문자가 포함되어 있습니다.' };
  }

  return { valid: true };
};

/**
 * 상담 신청 데이터 전체 검증
 * @param {Object} consultationData - 상담 신청 데이터
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateConsultationData = (consultationData) => {
  const errors = {};

  // 이름 검증
  const nameResult = validateName(consultationData.name);
  if (!nameResult.valid) {
    errors.name = nameResult.error;
  }

  // 전화번호 검증
  const phoneResult = validatePhone(consultationData.phone);
  if (!phoneResult.valid) {
    errors.phone = phoneResult.error;
  }

  // 이메일 검증 (선택적)
  if (consultationData.email) {
    const emailResult = validateEmail(consultationData.email);
    if (!emailResult.valid) {
      errors.email = emailResult.error;
    }
  }

  // 상담 내용 검증 (선택적)
  if (consultationData.message && consultationData.message.length > 1000) {
    errors.message = '상담 내용은 1000자 이하로 입력해주세요.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
