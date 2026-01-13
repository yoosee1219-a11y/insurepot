/**
 * 댓글 관련 상태 관리 훅
 * 댓글 조회, 작성, 삭제를 처리
 */

import { useState, useEffect, useCallback } from 'react';
import bcrypt from 'bcryptjs';
import { commentService } from '../services';
import { COMMENT_FORM_DEFAULTS, COMMENT_MESSAGES } from '../constants';
import { validateName, validatePassword, validateCommentContent, checkRateLimit } from '../utils';

export function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(COMMENT_FORM_DEFAULTS);
  const [deletePassword, setDeletePassword] = useState({});
  const [showDeleteInput, setShowDeleteInput] = useState({});

  // 댓글 가져오기
  const fetchComments = useCallback(async () => {
    const result = await commentService.fetchByPostId(postId);

    if (result.success) {
      setComments(result.data);
    } else {
      console.error('댓글 로딩 오류:', result.error);
    }

    setLoading(false);
  }, [postId]);

  // 초기 로드
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // 폼 데이터 변경
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // 댓글 작성
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // 1. Rate Limiting 체크
      const rateLimitResult = checkRateLimit('COMMENT');
      if (!rateLimitResult.allowed) {
        alert(rateLimitResult.error);
        return;
      }

      // 2. 필수 입력 체크
      if (!formData.author_name || !formData.author_password || !formData.content) {
        alert(COMMENT_MESSAGES.REQUIRED_FIELDS);
        return;
      }

      // 3. 입력값 검증
      const nameValidation = validateName(formData.author_name);
      if (!nameValidation.valid) {
        alert(nameValidation.error);
        return;
      }

      const passwordValidation = validatePassword(formData.author_password);
      if (!passwordValidation.valid) {
        alert(passwordValidation.error);
        return;
      }

      const contentValidation = validateCommentContent(formData.content);
      if (!contentValidation.valid) {
        alert(contentValidation.error);
        return;
      }

      // 4. 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(formData.author_password, 10);

      // 5. 댓글 데이터 생성
      const commentData = {
        post_id: postId,
        author_name: formData.author_name.trim(),
        author_password: hashedPassword,
        content: formData.content.trim(),
      };

      // 6. 댓글 저장
      const result = await commentService.create(commentData);

      if (result.success) {
        alert(COMMENT_MESSAGES.CREATE_SUCCESS);
        setFormData(COMMENT_FORM_DEFAULTS);
        fetchComments();
      } else {
        alert(result.error);
      }
    },
    [formData, postId, fetchComments]
  );

  // 댓글 삭제
  const handleDelete = useCallback(
    async (commentId, hashedPassword) => {
      const password = deletePassword[commentId];

      // 1. 비밀번호 입력 확인
      if (!password) {
        alert(COMMENT_MESSAGES.PASSWORD_REQUIRED);
        return;
      }

      // 2. 비밀번호 검증
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        alert(passwordValidation.error);
        return;
      }

      try {
        // 3. 비밀번호 일치 확인
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordValid) {
          alert(COMMENT_MESSAGES.PASSWORD_MISMATCH);
          return;
        }

        // 4. 삭제 확인
        if (!window.confirm(COMMENT_MESSAGES.DELETE_CONFIRM)) return;

        // 5. 댓글 삭제
        const result = await commentService.delete(commentId);

        if (result.success) {
          alert(COMMENT_MESSAGES.DELETE_SUCCESS);
          setShowDeleteInput({ ...showDeleteInput, [commentId]: false });
          setDeletePassword({ ...deletePassword, [commentId]: '' });
          fetchComments();
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.error('댓글 삭제 오류:', error);
        alert(COMMENT_MESSAGES.DELETE_ERROR);
      }
    },
    [deletePassword, showDeleteInput, fetchComments]
  );

  // 삭제 입력창 토글
  const toggleDeleteInput = useCallback((commentId) => {
    setShowDeleteInput((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  }, []);

  return {
    // 상태
    comments,
    loading,
    formData,
    deletePassword,
    showDeleteInput,

    // 핸들러
    handleChange,
    handleSubmit,
    handleDelete,
    toggleDeleteInput,
    setDeletePassword,
  };
}
