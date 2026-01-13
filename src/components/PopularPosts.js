/**
 * 인기 게시글 섹션 컴포넌트
 * 카드 슬라이더 형태로 좌우 스크롤 가능
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services';
import './PopularPosts.css';

/**
 * 인기 게시글 카드 컴포넌트
 */
const PopularPostCard = React.memo(({ post, index }) => (
  <Link to={`/post/${post.id}`} className="popular-card">
    <div className="popular-card-badge">
      <span className={`card-rank rank-${index + 1}`}>{index + 1}</span>
      {post.is_featured && <span className="featured-star">⭐</span>}
    </div>

    <div className="popular-card-category">{post.category}</div>

    <h3 className="popular-card-title">{post.title}</h3>

    <div className="popular-card-meta">
      <span className="card-views">👁️ {(post.view_count || 0).toLocaleString()}</span>
      <span className="card-date">{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
    </div>

    <div className="popular-card-cta">자세히 보기 →</div>
  </Link>
));

function PopularPosts() {
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      setLoading(true);
      try {
        const result = await postService.fetchPopular(6);
        if (result.success) {
          setPopularPosts(result.data);
        }
      } catch (error) {
        console.error('인기 게시글 로딩 오류:', error);
      }
      setLoading(false);
    };

    fetchPopularPosts();
  }, []);

  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector('.popular-card')?.offsetWidth || 320;
      const gap = 24;
      sliderRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, popularPosts.length - 1);
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector('.popular-card')?.offsetWidth || 320;
      const gap = 24;
      const scrollLeft = sliderRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(newIndex);
    }
  };

  if (loading) {
    return (
      <section className="popular-posts-section">
        <div className="popular-container">
          <h2 className="popular-title">🔥 인기 게시글</h2>
          <div className="popular-loading">로딩 중...</div>
        </div>
      </section>
    );
  }

  if (popularPosts.length === 0) {
    return null;
  }

  return (
    <section className="popular-posts-section">
      <div className="popular-container">
        <div className="popular-header">
          <h2 className="popular-title">🔥 인기 게시글</h2>
          <p className="popular-subtitle">가장 많이 본 보험 정보를 확인해보세요</p>
        </div>

        <div className="slider-wrapper">
          <button
            className="slider-btn slider-prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="이전"
          >
            ‹
          </button>

          <div
            className="popular-slider"
            ref={sliderRef}
            onScroll={handleScroll}
          >
            {popularPosts.map((post, index) => (
              <PopularPostCard key={post.id} post={post} index={index} />
            ))}
          </div>

          <button
            className="slider-btn slider-next"
            onClick={handleNext}
            disabled={currentIndex >= popularPosts.length - 1}
            aria-label="다음"
          >
            ›
          </button>
        </div>

        <div className="slider-dots">
          {popularPosts.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`${index + 1}번 카드로 이동`}
            />
          ))}
        </div>

        <div className="popular-footer">
          <Link to="/posts" className="btn-view-all-posts">
            전체 게시글 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PopularPosts;
