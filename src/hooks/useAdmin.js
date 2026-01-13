/**
 * 관리자 페이지 전체 상태 관리 훅
 * 게시글과 상담 문의 데이터를 관리
 */

import { useState, useEffect, useCallback } from 'react';
import { postService, consultationService } from '../services';
import { POST_MESSAGES, POST_FORM_DEFAULTS, CONSULTATION_MESSAGES } from '../constants';

export function useAdmin() {
  const [posts, setPosts] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(POST_FORM_DEFAULTS);

  // 데이터 가져오기
  const fetchData = useCallback(async () => {
    setLoading(true);

    // 게시글 가져오기
    const postsResult = await postService.fetchAll();
    if (postsResult.success) {
      setPosts(postsResult.data);
    } else {
      alert(postsResult.error);
    }

    // 상담 문의 가져오기
    const consultResult = await consultationService.fetchAll();
    if (consultResult.success) {
      setConsultations(consultResult.data);
    } else {
      alert(consultResult.error);
    }

    setLoading(false);
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 폼 데이터 변경 핸들러
  const handleFormChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  // 게시글 등록/수정
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      let result;

      if (editingId) {
        // 수정 모드
        result = await postService.update(editingId, formData);
      } else {
        // 새 게시글 작성 모드
        result = await postService.create(formData);
      }

      if (result.success) {
        alert(editingId ? POST_MESSAGES.UPDATE_SUCCESS : POST_MESSAGES.CREATE_SUCCESS);
        setEditingId(null);
        setFormData(POST_FORM_DEFAULTS);
        fetchData();
      } else {
        alert(result.error);
      }
    },
    [editingId, formData, fetchData]
  );

  // 게시글 수정 모드로 전환
  const handleEdit = useCallback((post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      category: post.category,
      content: post.content,
      is_published: post.is_published,
    });
    // 폼으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 수정 취소
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setFormData(POST_FORM_DEFAULTS);
  }, []);

  // 게시글 삭제
  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm(POST_MESSAGES.DELETE_CONFIRM)) return;

      const result = await postService.delete(id);

      if (result.success) {
        alert(POST_MESSAGES.DELETE_SUCCESS);
        fetchData();
      } else {
        alert(result.error);
      }
    },
    [fetchData]
  );

  // 상담 문의 상태 업데이트
  const updateConsultationStatus = useCallback(
    async (id, status) => {
      const result = await consultationService.updateStatus(id, status);

      if (result.success) {
        alert(CONSULTATION_MESSAGES.UPDATE_SUCCESS);
        fetchData();
      } else {
        alert(result.error);
      }
    },
    [fetchData]
  );

  return {
    // 상태
    posts,
    consultations,
    loading,
    editingId,
    formData,

    // 핸들러
    handleFormChange,
    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
    updateConsultationStatus,

    // 유틸
    fetchData,
  };
}
