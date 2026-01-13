import React from 'react';
import { Link } from 'react-router-dom';
import { stripHtmlTags } from '../utils';

function InfoSection({ posts, loading }) {
  // 샘플 데이터 (Supabase에 데이터가 없을 때)
  const samplePosts = [
    {
      id: 1,
      title: '자동차보험 할인 특약 총정리',
      category: '자동차보험',
      summary: '최대 30% 절약하는 할인 특약 완벽 가이드',
      view_count: 1523,
    },
    {
      id: 2,
      title: '30대 직장인 필수 보험',
      category: '보험추천',
      summary: '꼭 필요한 보험 5가지와 가입 순서',
      view_count: 892,
    },
    {
      id: 3,
      title: '실손보험 청구 거절 대응법',
      category: '실손보험',
      summary: '거절 사유별 대처 방법과 재심사 요청',
      view_count: 2104,
    },
    {
      id: 4,
      title: '암보험 가입 전 체크리스트',
      category: '암보험',
      summary: '보장 범위와 진단금 설정 가이드',
      view_count: 756,
    },
    {
      id: 5,
      title: '다이렉트 vs 일반 보험 비교',
      category: '보험비교',
      summary: '장단점 분석과 절약 금액 계산',
      view_count: 1340,
    },
    {
      id: 6,
      title: '보험료 절약 10가지 방법',
      category: '절약팁',
      summary: '불필요한 특약 정리와 납입주기 조정',
      view_count: 2890,
    },
  ];

  const displayPosts = posts.length > 0 ? posts : samplePosts;

  if (loading) {
    return (
      <section className="info-section" id="info">
        <div className="loading">게시글을 불러오는 중...</div>
      </section>
    );
  }

  return (
    <section className="info-section" id="info">
      <div className="info-section-header">
        <h2 className="section-title">📚 보험 완벽 가이드</h2>
        <Link to="/posts" className="btn-view-all">
          전체 보기 →
        </Link>
      </div>
      <div className="info-grid">
        {displayPosts.map((post) => {
          // HTML 태그 제거하고 순수 텍스트만 추출
          const excerpt = post.summary || stripHtmlTags(post.content, 100);

          return (
            <Link to={`/post/${post.id}`} key={post.id} className="info-card">
              <h3>{post.title}</h3>
              <p>{excerpt}</p>
              <div className="meta">
                {post.category} | 조회 {post.view_count || 0}회
              </div>
            </Link>
          );
        })}
      </div>
      <div className="info-section-footer">
        <Link to="/posts" className="btn-view-all-large">
          더 많은 보험 정보 보기 →
        </Link>
      </div>
    </section>
  );
}

export default InfoSection;
