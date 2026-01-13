/**
 * 게시글 목록 페이지 컴포넌트
 * 전체 게시글 목록, 카테고리 필터링, 검색, 정렬, 페이지네이션 지원
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PostCard from './PostCard';
import './PostList.css';
import { postService } from '../services';
import { POST_CATEGORY_LIST } from '../constants';

function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 상태 관리
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '전체');
  const [sortBy, setSortBy] = useState('latest'); // latest, popular
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // 게시글 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const result = await postService.fetchPublished();

      if (result.success) {
        setPosts(result.data);
      } else {
        console.error('게시글 로딩 실패:', result.error);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  // URL 파라미터 동기화
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    if (category && category !== selectedCategory) {
      setSelectedCategory(category);
      setCurrentPage(1);
    }

    if (search !== null && search !== searchQuery) {
      setSearchQuery(search);
      setCurrentPage(1);
    }
  }, [searchParams, selectedCategory, searchQuery]);

  // 카테고리별 게시글 수 계산
  const categoryCounts = useMemo(() => {
    const counts = {};
    posts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, [posts]);

  // 필터링 및 정렬된 게시글
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // 카테고리 필터링
    if (selectedCategory !== '전체') {
      result = result.filter((post) => post.category === selectedCategory);
    }

    // 검색 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          (post.content && post.content.toLowerCase().includes(query))
      );
    }

    // 정렬
    if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
    }

    return result;
  }, [posts, selectedCategory, searchQuery, sortBy]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredAndSortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 카테고리 변경 핸들러 (useCallback으로 최적화)
  const handleCategoryChange = useCallback(
    (category) => {
      setSelectedCategory(category);
      setCurrentPage(1);

      // URL 파라미터 업데이트
      if (category === '전체') {
        searchParams.delete('category');
      } else {
        searchParams.set('category', category);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  // 페이지 변경 핸들러 (useCallback으로 최적화)
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 검색 핸들러 (useCallback으로 최적화)
  const handleSearch = useCallback(
    (e) => {
      const newQuery = e.target.value;
      setSearchQuery(newQuery);
      setCurrentPage(1);

      // URL 파라미터 업데이트
      if (newQuery.trim()) {
        searchParams.set('search', newQuery.trim());
      } else {
        searchParams.delete('search');
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  // 정렬 변경 핸들러 (useCallback으로 최적화)
  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  return (
    <>
      <Header />
      <div className="post-list-container">
        <div className="post-list-layout">
          {/* 왼쪽 사이드바 - 카테고리 */}
          <aside className="post-list-sidebar">
            <div className="sidebar-section">
              <h3>📂 카테고리</h3>
              <div className="category-filter">
                <button
                  className={`category-btn ${selectedCategory === '전체' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('전체')}
                >
                  <span className="category-name">전체</span>
                  <span className="category-count">{posts.length}</span>
                </button>

                {POST_CATEGORY_LIST.map((category) => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    <span className="category-name">{category}</span>
                    <span className="category-count">{categoryCounts[category] || 0}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>🔍 검색</h3>
              <input
                type="text"
                className="search-input"
                placeholder="제목으로 검색..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="post-list-main">
            {/* 헤더 */}
            <div className="post-list-header">
              <div className="header-left">
                <h1>{selectedCategory === '전체' ? '전체 게시글' : selectedCategory}</h1>
                <p className="post-count">
                  총 <strong>{filteredAndSortedPosts.length}</strong>개의 글
                </p>
              </div>

              <div className="header-right">
                <div className="sort-buttons">
                  <button
                    className={`sort-btn ${sortBy === 'latest' ? 'active' : ''}`}
                    onClick={() => handleSortChange('latest')}
                  >
                    최신순
                  </button>
                  <button
                    className={`sort-btn ${sortBy === 'popular' ? 'active' : ''}`}
                    onClick={() => handleSortChange('popular')}
                  >
                    인기순
                  </button>
                </div>
              </div>
            </div>

            {/* 로딩 */}
            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>게시글을 불러오는 중...</p>
              </div>
            )}

            {/* 빈 상태 */}
            {!loading && filteredAndSortedPosts.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">📭</span>
                <h3>게시글이 없습니다</h3>
                <p>
                  {searchQuery
                    ? `"${searchQuery}"에 대한 검색 결과가 없습니다.`
                    : selectedCategory !== '전체'
                      ? `${selectedCategory} 카테고리에 게시글이 없습니다.`
                      : '첫 번째 게시글을 작성해보세요!'}
                </p>
                {(searchQuery || selectedCategory !== '전체') && (
                  <button
                    className="btn-reset"
                    onClick={() => {
                      setSearchQuery('');
                      handleCategoryChange('전체');
                    }}
                  >
                    전체 보기
                  </button>
                )}
              </div>
            )}

            {/* 게시글 그리드 */}
            {!loading && currentPosts.length > 0 && (
              <>
                <div className="post-grid">
                  {currentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      ← 이전
                    </button>

                    <div className="pagination-numbers">
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;

                        // 현재 페이지 기준으로 ±2 페이지만 표시
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              className={`pagination-number ${
                                currentPage === pageNumber ? 'active' : ''
                              }`}
                              onClick={() => handlePageChange(pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (
                          pageNumber === currentPage - 3 ||
                          pageNumber === currentPage + 3
                        ) {
                          return <span key={pageNumber}>...</span>;
                        }
                        return null;
                      })}
                    </div>

                    <button
                      className="pagination-btn"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      다음 →
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostList;
