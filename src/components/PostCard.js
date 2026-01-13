/**
 * 게시글 카드 컴포넌트 (React.memo 최적화)
 * PostList에서 사용되는 개별 게시글 카드
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { stripHtmlTags } from '../utils';

function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="post-card">
      <div className="post-card-header">
        <span className="post-category">{post.category}</span>
        <span className="post-date">{new Date(post.created_at).toLocaleDateString()}</span>
      </div>

      <h2 className="post-title">{post.title}</h2>

      <p className="post-excerpt">{stripHtmlTags(post.content, 120) || '내용 없음'}</p>

      <div className="post-card-footer">
        <span className="post-views">👁️ {post.view_count || 0}</span>
      </div>
    </Link>
  );
}

// React.memo로 감싸서 props가 변경되지 않으면 리렌더링 방지
export default React.memo(PostCard);
