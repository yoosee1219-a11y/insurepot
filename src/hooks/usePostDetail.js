/**
 * 게시글 상세 페이지 상태 관리 훅
 * 게시글, 카테고리, 최근 게시글, 인접 게시글을 관리
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services';

export function usePostDetail(postId) {
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  // 게시글 가져오기
  const fetchPost = useCallback(async () => {
    const result = await postService.fetchById(postId);

    if (result.success && result.data) {
      setPost(result.data);

      // 인접 게시글 가져오기
      const adjacentResult = await postService.fetchAdjacentPosts(result.data.created_at);
      if (adjacentResult.success) {
        setPrevPost(adjacentResult.data.prevPost);
        setNextPost(adjacentResult.data.nextPost);
      }
    } else {
      console.error('게시글 로딩 오류:', result.error);
      navigate('/');
    }

    setLoading(false);
  }, [postId, navigate]);

  // 카테고리 가져오기
  const fetchCategories = useCallback(async () => {
    const result = await postService.fetchCategoryCounts();

    if (result.success) {
      setCategories(result.data);
    } else {
      console.error('카테고리 로딩 오류:', result.error);
    }
  }, []);

  // 최근 게시글 가져오기
  const fetchRecentPosts = useCallback(async () => {
    const result = await postService.fetchRecent(5);

    if (result.success) {
      setRecentPosts(result.data);
    } else {
      console.error('최근 게시글 로딩 오류:', result.error);
    }
  }, []);

  // 조회수 증가
  const incrementViewCount = useCallback(async () => {
    const result = await postService.incrementViewCount(postId);

    if (!result.success) {
      console.error('조회수 증가 오류:', result.error);
    }
  }, [postId]);

  // 초기 로드
  useEffect(() => {
    fetchPost();
    fetchCategories();
    fetchRecentPosts();
    incrementViewCount();
  }, [fetchPost, fetchCategories, fetchRecentPosts, incrementViewCount]);

  return {
    post,
    loading,
    categories,
    recentPosts,
    prevPost,
    nextPost,
  };
}
