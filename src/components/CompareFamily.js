import React, { useState } from 'react';
import './CompareFamily.css';

const CompareFamily = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    coverage: [],
    discounts: [],
  });

  const coverageOptions = [
    '배우자 보장',
    '자녀 보장',
    '부모님 보장',
    '온가족 통합',
    '질병입원',
    '수술비',
  ];

  const discountOptions = [
    '가족 단위 가입',
    '건강가족 할인',
    '다자녀 할인',
    '온라인 가입',
    '장기계약',
    '건강검진 완료',
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
      company: '삼성생명',
      logo: '👨‍👩‍👧‍👦',
      rating: 4.7,
      reviews: 3125,
      coverage: [
        { name: '질병입원', amount: '1일당 5만원' },
        { name: '상해입원', amount: '1일당 5만원' },
        { name: '수술비', amount: '최대 1천만원' },
        { name: '진단비', amount: '최대 3천만원' },
        { name: '가족통합 보장', amount: '최대 4인' },
      ],
      specialties: ['온가족 한번에 보장 설계', '자녀 성인까지 자동 갱신', '가족 건강관리 서비스'],
      discounts: ['가족 단위 가입 15%', '다자녀 할인 10%', '건강검진 할인 5%'],
      color: '#7C3AED',
    },
    {
      id: 2,
      company: '현대라이프',
      logo: '💜',
      rating: 4.5,
      reviews: 2876,
      coverage: [
        { name: '질병입원', amount: '1일당 5만원' },
        { name: '상해입원', amount: '1일당 5만원' },
        { name: '수술비', amount: '최대 1천만원' },
        { name: '진단비', amount: '최대 3천만원' },
        { name: '가족통합 보장', amount: '최대 5인' },
      ],
      specialties: ['맞춤형 가족 보장 설계', '임신/출산 특별 보장', '가족 헬스케어 앱 제공'],
      discounts: ['건강가족 할인 12%', '온라인 가입 7%', '장기계약 10%'],
      color: '#EC4899',
    },
    {
      id: 3,
      company: 'KB손해보험',
      logo: '❤️',
      rating: 4.6,
      reviews: 2543,
      coverage: [
        { name: '질병입원', amount: '1일당 5만원' },
        { name: '상해입원', amount: '1일당 5만원' },
        { name: '수술비', amount: '최대 1천만원' },
        { name: '진단비', amount: '최대 3천만원' },
        { name: '가족통합 보장', amount: '최대 6인' },
      ],
      specialties: ['세대 간 보장 연계 가능', '가족 전용 상담 서비스', '가족 건강검진 지원'],
      discounts: ['가족 단위 가입 15%', '다자녀 할인 12%', '온라인 가입 5%'],
      color: '#F59E0B',
    },
  ];

  const scrollToConsultation = () => {
    window.location.href = '/#consultation';
  };

  return (
    <div className="compare-family-page">
      {/* Hero Section */}
      <div className="compare-hero">
        <div className="compare-hero-content">
          <h1>👨‍👩‍👧‍👦 가족보험 한눈에 비교하기</h1>
          <p>온가족을 하나로 보장하는 가족보험을 비교하고 최적의 보장을 찾아보세요</p>
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
          <h3>💡 가족보험이 좋은 이유</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">💰</span>
              <div>
                <strong>보험료 절감</strong>
                <p>개별 가입 대비 최대 30% 절감</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🏠</span>
              <div>
                <strong>통합 관리</strong>
                <p>가족 모두 한번에 관리</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🎯</span>
              <div>
                <strong>맞춤 설계</strong>
                <p>가족 구성원별 맞춤 보장</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <strong>간편 청구</strong>
                <p>가족 전용 원스톱 서비스</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>🎯 우리 가족을 위한 맞춤 보장이 궁금하다면?</h2>
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

export default CompareFamily;
