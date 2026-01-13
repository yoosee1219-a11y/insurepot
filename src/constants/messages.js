/**
 * 메시지 상수 정의
 * 사용자에게 보여지는 모든 메시지를 한 곳에서 관리
 */

// 로그인 관련 메시지
export const AUTH_MESSAGES = {
  REQUIRED_FIELDS: '아이디와 비밀번호를 모두 입력해주세요.',
  INVALID_CREDENTIALS: '아이디 또는 비밀번호가 올바르지 않습니다.',
  LOGIN_ERROR: '로그인 중 오류가 발생했습니다.',
  LOGIN_SUCCESS: '로그인에 성공했습니다.',
  PASSWORD_CHANGE_SUCCESS: '비밀번호가 성공적으로 변경되었습니다.',
  PASSWORD_CHANGE_ERROR: '비밀번호 변경에 실패했습니다.',
};

// 게시글 관련 메시지
export const POST_MESSAGES = {
  CREATE_SUCCESS: '게시글이 성공적으로 등록되었습니다!',
  CREATE_ERROR: '게시글 등록 실패',
  UPDATE_SUCCESS: '게시글이 성공적으로 수정되었습니다!',
  UPDATE_ERROR: '게시글 수정 실패',
  DELETE_SUCCESS: '삭제되었습니다.',
  DELETE_ERROR: '삭제 실패',
  DELETE_CONFIRM: '정말 삭제하시겠습니까?',
  FETCH_ERROR: '게시글을 불러오는데 실패했습니다.',
  LOADING: '로딩 중...',
  NO_POSTS: '아직 게시글이 없습니다. 첫 게시글을 작성해보세요!',
};

// 댓글 관련 메시지
export const COMMENT_MESSAGES = {
  CREATE_SUCCESS: '댓글이 등록되었습니다!',
  CREATE_ERROR: '댓글 등록에 실패했습니다.',
  DELETE_SUCCESS: '댓글이 삭제되었습니다.',
  DELETE_ERROR: '댓글 삭제에 실패했습니다.',
  DELETE_CONFIRM: '정말 삭제하시겠습니까?',
  REQUIRED_FIELDS: '모든 항목을 입력해주세요.',
  PASSWORD_REQUIRED: '비밀번호를 입력해주세요.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  LOADING: '댓글을 불러오는 중...',
  NO_COMMENTS: '첫 번째 댓글을 작성해보세요! 😊',
};

// 상담 문의 관련 메시지
export const CONSULTATION_MESSAGES = {
  CREATE_SUCCESS: '상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.',
  CREATE_ERROR: '상담 신청 중 오류가 발생했습니다.',
  UPDATE_SUCCESS: '상태가 업데이트되었습니다.',
  UPDATE_ERROR: '상태 업데이트 실패',
  REQUIRED_FIELDS: '이름과 전화번호는 필수입니다.',
  NO_CONSULTATIONS: '아직 상담 문의가 없습니다.',
};

// 일반 메시지
export const GENERAL_MESSAGES = {
  ERROR: '오류가 발생했습니다.',
  RETRY: '잠시 후 다시 시도해주세요.',
  LOADING: '로딩 중...',
  NO_DATA: '데이터가 없습니다.',
};
