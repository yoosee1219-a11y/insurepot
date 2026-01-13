import React, { useState } from 'react';
import './CompareFire.css';

const CompareFire = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    coverage: [],
    discounts: [],
  });

  const coverageOptions = [
    '화재 보장',
    '도난 보장',
    '배상책임',
    '임시거주비',
    '가재도구',
    '수리비용',
  ];

  const discountOptions = [
    '스프링클러 설치',
    '경보기 설치',
    '장기 계약',
    '온라인 가입',
    '아파트 거주',
    '무사고 할인',
  ];

  const toggleFilter = (category, item) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item],
    }));
  };

  const insuranceData = [
    {
      id: 1,
      company: '삼성화재',
      logo: '🏠',
      rating: 4.7,
      reviews: 2845,
      coverage: [
        { name: '건물 화재', amount: '최대 1억원' },
        { name: '가재도구', amount: '5천만원' },
        { name: '배상책임', amount: '1억원' },
        { name: '임시거주비', amount: '월 200만원' },
        { name: '수리비용', amount: '3천만원' },
      ],
      specialties: ['24시간 긴급출동 서비스', '화재 예방 컨설팅', '신속한 보험금 지급'],
      discounts: ['스프링클러 설치 10%', '장기계약 12%', '아파트 거주 8%'],
      color: '#DC2626',
    },
    {
      id: 2,
      company: '현대해상',
      logo: '🔥',
      rating: 4.5,
      reviews: 2234,
      coverage: [
        { name: '건물 화재', amount: '최대 1억원' },
        { name: '가재도구', amount: '5천만원' },
        { name: '배상책임', amount: '1억원' },
        { name: '임시거주비', amount: '월 200만원' },
        { name: '도난 보장', amount: '2천만원' },
      ],
      specialties: ['AI 화재 감지 서비스 연계', '전문 복구업체 연결', '긴급 숙박비 지원'],
      discounts: ['경보기 설치 8%', '온라인 가입 7%', '무사고 할인 10%'],
      color: '#F59E0B',
    },
    {
      id: 3,
      company: 'DB손해보험',
      logo: '🛡️',
      rating: 4.6,
      reviews: 2087,
      coverage: [
        { name: '건물 화재', amount: '최대 1억원' },
        { name: '가재도구', amount: '5천만원' },
        { name: '배상책임', amount: '1억원' },
        { name: '임시거주비', amount: '월 200만원' },
        { name: '통합 보장', amount: '최대 2억원' },
      ],
      specialties: ['화재 사고 전문 상담사', '주택 안전진단 서비스', '복구 비용 선지급'],
      discounts: ['스프링클러 설치 10%', '장기계약 15%', '온라인 가입 5%'],
      color: '#1E40AF',
    },
  ];

  const scrollToConsultation = () => {
    window.location.href = '/#consultation';
  };

  return (
    <div className="compare-fire-page">
      {/* Hero Section */}
      <div className="compare-hero">
        <div className="compare-hero-content">
          <h1>🏠 주택화재보험 한눈에 비교하기</h1>
          <p>내 집을 지키는 주택화재보험, 주요 보험사를 비교하고 안전한 보장을 선택하세요</p>
        </div>
      </div>

      <div className="compare-container">
        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-group">
            <h3>🎯 필요한 보장</h3>
            <div className="filter-chips">
              {coverageOptions.map((option) => (
                <button
                  key={option}
                  className={`filter-chip ${
                    selectedFilters.coverage.includes(option) ? 'active' : ''
                  }`}
                  onClick={() => toggleFilter('coverage', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>💰 할인 조건</h3>
            <div className="filter-chips">
              {discountOptions.map((option) => (
                <button
                  key={option}
                  className={`filter-chip ${
                    selectedFilters.discounts.includes(option) ? 'active' : ''
                  }`}
                  onClick={() => toggleFilter('discounts', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="comparison-grid">
          {insuranceData.map((insurance) => (
            <div key={insurance.id} className="insurance-card">
              <div className="card-header" style={{ borderTopColor: insurance.color }}>
                <div className="company-info">
                  <span className="company-logo">{insurance.logo}</span>
                  <h2>{insurance.company}</h2>
                </div>
                <div className="rating">
                  <span className="stars">{'⭐'.repeat(Math.floor(insurance.rating))}</span>
                  <span className="rating-text">
                    {insurance.rating} ({insurance.reviews.toLocaleString()})
                  </span>
                </div>
              </div>

              <div className="coverage-section">
                <h3>📋 보장 내용</h3>
                <ul className="coverage-list">
                  {insurance.coverage.map((item, idx) => (
                    <li key={idx}>
                      <span className="coverage-name">{item.name}</span>
                      <span className="coverage-amount">{item.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="specialty-section">
                <h3>✨ 주요 특징</h3>
                <ul className="specialty-list">
                  {insurance.specialties.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="discount-section">
                <h3>🎁 적용 가능 할인</h3>
                <div className="discount-tags">
                  {insurance.discounts.map((discount, idx) => (
                    <span key={idx} className="discount-tag">
                      {discount}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="consult-button"
                style={{ backgroundColor: insurance.color }}
                onClick={scrollToConsultation}
              >
                상담 신청하기
              </button>
            </div>
          ))}
        </div>

        {/* Info Notice */}
        <div className="info-notice">
          <h3>💡 주택화재보험 꼭 알아야 할 것</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">🏢</span>
              <div>
                <strong>건물 유형</strong>
                <p>아파트/주택에 따라 다름</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💰</span>
              <div>
                <strong>보장 금액</strong>
                <p>시가 또는 재조달가액 기준</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🔒</span>
              <div>
                <strong>특약 선택</strong>
                <p>도난/배상책임 추가 가능</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📋</span>
              <div>
                <strong>의무가입</strong>
                <p>전세/대출 시 필수</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>🎯 우리 집에 맞는 화재보험이 궁금하다면?</h2>
          <p>1분만에 무료 상담을 받아보세요!</p>
          <button className="cta-button" onClick={scrollToConsultation}>
            지금 바로 무료 상담 받기
          </button>
          <div className="cta-benefits">
            <span>✅ 100% 무료</span>
            <span>✅ 1분 소요</span>
            <span>✅ 전문가 상담</span>
            <span>✅ 최대 30% 할인</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareFire;
