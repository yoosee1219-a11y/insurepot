/**
 * Rate Limiting 유틸리티
 * 무차별 대입 공격(Brute Force), 스팸 방지
 */

// Rate Limiter 저장소 (메모리 기반)
const rateLimitStore = new Map();

/**
 * Rate Limit 설정
 */
const RATE_LIMITS = {
  // 로그인 시도 제한
  LOGIN: {
    maxAttempts: 5, // 5번 시도
    windowMs: 15 * 60 * 1000, // 15분
    blockDurationMs: 30 * 60 * 1000, // 30분 차단
  },

  // 댓글 작성 제한
  COMMENT: {
    maxAttempts: 10, // 10개 작성
    windowMs: 10 * 60 * 1000, // 10분
    blockDurationMs: 15 * 60 * 1000, // 15분 차단
  },

  // 상담 신청 제한
  CONSULTATION: {
    maxAttempts: 3, // 3번 신청
    windowMs: 60 * 60 * 1000, // 1시간
    blockDurationMs: 2 * 60 * 60 * 1000, // 2시간 차단
  },

  // API 호출 일반 제한
  API: {
    maxAttempts: 100, // 100번 호출
    windowMs: 60 * 1000, // 1분
    blockDurationMs: 5 * 60 * 1000, // 5분 차단
  },
};

/**
 * 식별자 생성 (IP 대신 브라우저 지문 사용)
 * @param {string} action - 액션 타입 (login, comment 등)
 * @returns {string} 고유 식별자
 */
const generateIdentifier = (action) => {
  // 브라우저 지문 생성 (간단한 버전)
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    window.screen?.colorDepth || 24,
    (window.screen?.width || 1920) + 'x' + (window.screen?.height || 1080),
    new Date().getTimezoneOffset(),
  ].join('|');

  // 해시 생성 (간단한 해시)
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return `${action}_${hash}`;
};

/**
 * Rate Limit 체크
 * @param {string} action - 액션 타입 (LOGIN, COMMENT, CONSULTATION, API)
 * @returns {Object} { allowed: boolean, retryAfter?: number, error?: string }
 */
export const checkRateLimit = (action) => {
  const config = RATE_LIMITS[action];
  if (!config) {
    console.error(`Unknown rate limit action: ${action}`);
    return { allowed: true };
  }

  const identifier = generateIdentifier(action);
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // 차단 중인지 확인
  if (record && record.blockedUntil && now < record.blockedUntil) {
    const retryAfter = Math.ceil((record.blockedUntil - now) / 1000);
    return {
      allowed: false,
      retryAfter,
      error: `너무 많은 시도가 있었습니다. ${Math.ceil(retryAfter / 60)}분 후에 다시 시도해주세요.`,
    };
  }

  // 기록이 없거나 시간 창이 지났으면 초기화
  if (!record || !record.firstAttempt || now - record.firstAttempt > config.windowMs) {
    rateLimitStore.set(identifier, {
      attempts: 1,
      firstAttempt: now,
      blockedUntil: null,
    });
    return { allowed: true };
  }

  // 시도 횟수 증가
  record.attempts += 1;

  // 제한 초과 시 차단
  if (record.attempts > config.maxAttempts) {
    record.blockedUntil = now + config.blockDurationMs;
    rateLimitStore.set(identifier, record);

    const retryAfter = Math.ceil(config.blockDurationMs / 1000);
    return {
      allowed: false,
      retryAfter,
      error: `너무 많은 시도가 있었습니다. ${Math.ceil(retryAfter / 60)}분 후에 다시 시도해주세요.`,
    };
  }

  // 아직 제한 내
  rateLimitStore.set(identifier, record);
  return {
    allowed: true,
    remaining: config.maxAttempts - record.attempts,
  };
};

/**
 * Rate Limit 초기화 (로그인 성공 시 등)
 * @param {string} action - 액션 타입
 */
export const resetRateLimit = (action) => {
  const identifier = generateIdentifier(action);
  rateLimitStore.delete(identifier);
};

/**
 * 전체 Rate Limit 데이터 정리 (주기적으로 호출)
 * 오래된 기록 삭제로 메모리 관리
 */
export const cleanupRateLimitStore = () => {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24시간

  for (const [key, record] of rateLimitStore.entries()) {
    // 차단도 풀렸고, 기록도 오래되었으면 삭제
    if ((!record.blockedUntil || now > record.blockedUntil) && now - record.firstAttempt > maxAge) {
      rateLimitStore.delete(key);
    }
  }
};

// 1시간마다 자동 정리
if (typeof window !== 'undefined') {
  setInterval(cleanupRateLimitStore, 60 * 60 * 1000);
}

/**
 * Rate Limit 정보 가져오기 (디버깅용)
 * @param {string} action - 액션 타입
 * @returns {Object|null} 현재 Rate Limit 상태
 */
export const getRateLimitInfo = (action) => {
  const identifier = generateIdentifier(action);
  const record = rateLimitStore.get(identifier);

  if (!record) return null;

  const config = RATE_LIMITS[action];
  const now = Date.now();

  return {
    attempts: record.attempts,
    maxAttempts: config.maxAttempts,
    remaining: Math.max(0, config.maxAttempts - record.attempts),
    isBlocked: record.blockedUntil && now < record.blockedUntil,
    blockedUntil: record.blockedUntil,
    windowEndsAt: record.firstAttempt + config.windowMs,
  };
};
