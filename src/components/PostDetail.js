import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Comments from './Comments';
import TableOfContents from './TableOfContents';
import ShareButtons from './ShareButtons';
import './PostDetail.css';
import { POST_MESSAGES } from '../constants';
import { usePostDetail } from '../hooks';
import { extractTableOfContents, addIdsToHeadings, textToHtml } from '../utils/contentParser';
import { getArticleSchema, getBreadcrumbSchema, getOrganizationSchema } from '../utils/seoSchema';
import { addRecentlyViewed } from '../utils/recentlyViewed';

function PostDetail() {
  const { id } = useParams();
  const { post, loading, categories, recentPosts, prevPost, nextPost } = usePostDetail(id);

  const [processedContent, setProcessedContent] = useState('');
  const [toc, setToc] = useState([]);

  // SEO 구조화 데이터 생성
  const schemaData = useMemo(() => {
    if (!post) return null;

    const schemas = [
      getOrganizationSchema(),
      getArticleSchema(post),
      getBreadcrumbSchema(post.category, post.title),
    ];

    return schemas;
  }, [post]);

  // SEO 스크립트 및 메타 태그 삽입
  useEffect(() => {
    if (post) {
      // 메타 태그 업데이트
      document.title = `${post.title} - 보험이지`;

      // 메타 설명
      const metaDescription =
        document.querySelector('meta[name="description"]') || document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute(
        'content',
        post.content ? post.content.substring(0, 160).replace(/<[^>]*>/g, '') : ''
      );
      if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDescription);
      }

      // Open Graph 메타 태그
      const ogTitle =
        document.querySelector('meta[property="og:title"]') || document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      ogTitle.setAttribute('content', post.title);
      if (!document.querySelector('meta[property="og:title"]')) {
        document.head.appendChild(ogTitle);
      }

      const ogDescription =
        document.querySelector('meta[property="og:description"]') || document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      ogDescription.setAttribute(
        'content',
        post.content ? post.content.substring(0, 160).replace(/<[^>]*>/g, '') : ''
      );
      if (!document.querySelector('meta[property="og:description"]')) {
        document.head.appendChild(ogDescription);
      }

      const ogType =
        document.querySelector('meta[property="og:type"]') || document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      ogType.setAttribute('content', 'article');
      if (!document.querySelector('meta[property="og:type"]')) {
        document.head.appendChild(ogType);
      }
    }

    if (schemaData) {
      // 기존 스키마 제거
      const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
      existingSchemas.forEach((schema) => schema.remove());

      // 새 스키마 추가
      schemaData.forEach((schema) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      });

      // 컴포넌트 언마운트 시 정리
      return () => {
        const schemas = document.querySelectorAll('script[type="application/ld+json"]');
        schemas.forEach((schema) => schema.remove());
      };
    }
  }, [schemaData, post]);

  // 페이지 진입시 최상단으로 스크롤 및 최근 본 글 저장
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // 포스트 정보가 있으면 최근 본 글에 추가
    if (post) {
      addRecentlyViewed({
        id: post.id,
        title: post.title,
        category: post.category,
        created_at: post.created_at,
      });
    }
  }, [id, post]);

  // 콘텐츠 처리 및 목차 추출
  useEffect(() => {
    if (post?.content) {
      // 디버깅: 원본 콘텐츠 확인
      console.log('🔍 원본 콘텐츠:', post.content);
      console.log('🔍 콘텐츠 타입:', typeof post.content);

      // HTML 엔티티 디코딩 함수
      const decodeHTMLEntities = (text) => {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
      };

      // HTML 엔티티가 포함되어 있는지 확인
      const hasHTMLEntities =
        post.content.includes('&lt;') ||
        post.content.includes('&gt;') ||
        post.content.includes('&quot;');

      if (hasHTMLEntities) {
        console.log('⚠️ HTML 엔티티 감지됨. 디코딩 진행...');
      }

      // HTML 엔티티 디코딩
      let decodedContent = hasHTMLEntities ? decodeHTMLEntities(post.content) : post.content;

      console.log('✅ 디코딩된 콘텐츠:', decodedContent);

      // HTML 콘텐츠인지 일반 텍스트인지 확인
      const isHtml = decodedContent.includes('<') && decodedContent.includes('>');

      let htmlContent = isHtml ? decodedContent : textToHtml(decodedContent);

      // 제목에 ID 추가
      htmlContent = addIdsToHeadings(htmlContent);

      // 목차 추출
      const tocData = extractTableOfContents(htmlContent);

      setProcessedContent(htmlContent);
      setToc(tocData);

      // 디버깅용 로그 (개발 중에만)
      if (process.env.NODE_ENV === 'development') {
        console.log('📝 콘텐츠 처리 완료:', {
          isHtml,
          hasHTMLEntities,
          contentLength: post.content.length,
          tocItems: tocData.length,
          processedContent: htmlContent.substring(0, 200) + '...',
        });
      }
    }
  }, [post]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="post-detail-container">
          <div className="loading">{POST_MESSAGES.LOADING}</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="post-detail-container">
        <div className="post-detail-layout">
          {/* 왼쪽 사이드바 */}
          <aside className="post-sidebar post-sidebar-left">
            <div className="sidebar-section">
              <h3>📚 보험 완벽 가이드</h3>
              <div className="category-list">
                <Link to="/posts" className="category-item all">
                  전체보기
                  <span className="count">({categories.reduce((sum, c) => sum + c.count, 0)})</span>
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/posts?category=${encodeURIComponent(cat.name)}`}
                    className={`category-item ${post.category === cat.name ? 'active' : ''}`}
                  >
                    {cat.name}
                    <span className="count">({cat.count})</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>📌 최근 게시글</h3>
              <div className="recent-posts">
                {recentPosts.map((recentPost) => (
                  <Link
                    key={recentPost.id}
                    to={`/post/${recentPost.id}`}
                    className={`recent-post-item ${recentPost.id === id ? 'active' : ''}`}
                  >
                    <div className="recent-post-title">{recentPost.title}</div>
                    <div className="recent-post-date">
                      {new Date(recentPost.created_at).toLocaleDateString()}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="post-main">
            <article className="post-content">
              <div className="post-header">
                <Link
                  to={`/posts?category=${encodeURIComponent(post.category)}`}
                  className="post-category"
                >
                  {post.category}
                </Link>
                <h1 className="post-title">{post.title}</h1>
                <div className="post-meta">
                  <span>📅 {new Date(post.created_at).toLocaleDateString()}</span>
                  <span>👁️ {post.view_count || 0} 조회</span>
                </div>
              </div>

              <div className="post-body" dangerouslySetInnerHTML={{ __html: processedContent }} />

              {/* 공유 버튼 */}
              <ShareButtons post={post} />
            </article>

            {/* 이전글/다음글 네비게이션 */}
            <div className="post-navigation">
              {prevPost && (
                <Link to={`/post/${prevPost.id}`} className="nav-item prev">
                  <span className="nav-label">← 이전 글</span>
                  <span className="nav-title">{prevPost.title}</span>
                </Link>
              )}
              {nextPost && (
                <Link to={`/post/${nextPost.id}`} className="nav-item next">
                  <span className="nav-label">다음 글 →</span>
                  <span className="nav-title">{nextPost.title}</span>
                </Link>
              )}
            </div>

            {/* 댓글 섹션 */}
            <Comments postId={id} />

            {/* 목록으로 버튼 */}
            <div className="back-to-list">
              <Link to="/posts" className="btn-back">
                📋 목록으로 돌아가기
              </Link>
            </div>
          </main>

          {/* 오른쪽 사이드바 - 목차 */}
          <aside className="post-sidebar post-sidebar-right">
            <TableOfContents toc={toc} />
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostDetail;
