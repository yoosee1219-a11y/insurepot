/**
 * 게시글 관련 상태 관리 훅
 * 메인 페이지에서 게시글 목록을 관리
 */

import { useState, useEffect } from 'react';
import { postService } from '../services';

export function usePosts(limit = null) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      const result = await postService.fetchPublished(limit);

      if (result.success) {
        setPosts(result.data);
      } else {
        console.error('게시글 로딩 오류:', result.error);
      }

      setLoading(false);
    };

    fetchPosts();
  }, [limit]);

  return { posts, loading };
}
