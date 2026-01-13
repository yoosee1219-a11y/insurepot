/**
 * 최근 본 글 섹션 컴포넌트
 * 사용자가 최근에 조회한 게시글 표시 (로컬스토리지 기반)
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getRecentlyViewed, clearRecentlyViewed } from '../utils/recentlyViewed';
import './RecentlyViewedPosts.css';

/**
 * 최근 본 글 아이템 컴포넌트 (React.memo 최적화)
 */
const RecentlyViewedPostItem = React.memo(({ post, index }) => (
  <Link to={`/post/${post.id}`} className="recently-viewed-item">
    <div className="recently-viewed-number">{index + 1}</div>

    <div className="recently-viewed-content">
      <div className="recently-viewed-item-header">
        <span className="recently-viewed-category">{post.category}</span>
        <span className="recently-viewed-time">{getTimeAgo(post.viewedAt)}</span>
      </div>

      <h3 className="recently-viewed-item-title">{post.title}</h3>

      <div className="recently-viewed-meta">
        <span className="recently-viewed-date">
          📅 {new Date(post.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>

    <div className="recently-viewed-arrow">→</div>
  </Link>
));

/**
 * 시간 차이를 사람이 읽기 쉬운 형태로 변환
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {string} "방금 전", "5분 전", "2시간 전" 등
 */
function getTimeAgo(dateString) {
  if (!dateString) return '';

  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) return '방금 전';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;

  return new Date(dateString).toLocaleDateString();
}

function RecentlyViewedPosts() {
  const [recentPosts, setRecentPosts] = useState([]);

  const loadRecentPosts = useCallback(() => {
    const posts = getRecentlyViewed();
    setRecentPosts(posts);
  }, []);

  const handleClearAll = useCallback(() => {
    if (window.confirm('최근 본 글을 모두 삭제하시겠습니까?')) {
      clearRecentlyViewed();
      setRecentPosts([]);
    }
  }, []);

  useEffect(() => {
    loadRecentPosts();
  }, [loadRecentPosts]);

  // 최근 본 글이 없으면 섹션 숨김
  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="recently-viewed-section">
      <div className="recently-viewed-container">
        <div className="recently-viewed-header">
          <div className="header-left">
            <h2 className="recently-viewed-title">👀 최근 본 글</h2>
            <p className="recently-viewed-subtitle">내가 최근에 본 보험 정보를 다시 확인하세요</p>
          </div>
          <button onClick={handleClearAll} className="btn-clear-recent" title="전체 삭제">
            전체 삭제
          </button>
        </div>

        <div className="recently-viewed-list">
          {recentPosts.map((post, index) => (
            <RecentlyViewedPostItem key={`${post.id}-${index}`} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentlyViewedPosts;
