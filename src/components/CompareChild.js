import React, { useState } from 'react';
import './CompareChild.css';

const CompareChild = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    coverage: [],
    discounts: [],
  });

  const coverageOptions = [
    '태아 가입',
    '선천이상 보장',
    '소아암 보장',
    '성인까지 보장',
    '상해/질병',
    '입원/수술비',
  ];

  const discountOptions = [
    '임신 중 가입',
    '건강한 출산',
    '쌍둥이 할인',
    '온라인 가입',
    '장기계약',
    '형제자매 할인',
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
      logo: '👶',
      rating: 4.8,
      reviews: 5234,
      coverage: [
        { name: '선천이상 보장', amount: '최대 5천만원' },
        { name: '소아암 진단금', amount: '3천만원' },
        { name: '상해/질병 입원', amount: '1일 5만원' },
        { name: '수술비', amount: '최대 1천만원' },
        { name: '성인까지 보장', amount: '100세까지' },
      ],
      specialties: ['태아 22주부터 가입 가능', '출산 전후 질환 보장', '자동 성인 전환 시스템'],
      discounts: ['임신 중 가입 10%', '온라인 가입 8%', '장기계약 12%'],
      color: '#EC4899',
    },
    {
      id: 2,
      company: '현대라이프',
      logo: '🍼',
      rating: 4.7,
      reviews: 4876,
      coverage: [
        { name: '선천이상 보장', amount: '최대 5천만원' },
        { name: '소아암 진단금', amount: '3천만원' },
        { name: '상해/질병 입원', amount: '1일 5만원' },
        { name: '수술비', amount: '최대 1천만원' },
        { name: '평생 보장', amount: '100세까지' },
      ],
      specialties: ['임신 16주부터 가입 가능', '신생아 집중 케어', '성장기 건강검진 지원'],
      discounts: ['건강한 출산 12%', '쌍둥이 할인 15%', '형제자매 할인 10%'],
      color: '#A855F7',
    },
    {
      id: 3,
      company: 'KB손해보험',
      logo: '🎈',
      rating: 4.6,
      reviews: 4321,
      coverage: [
        { name: '선천이상 보장', amount: '최대 5천만원' },
        { name: '소아암 진단금', amount: '3천만원' },
        { name: '상해/질병 입원', amount: '1일 5만원' },
        { name: '수술비', amount: '최대 1천만원' },
        { name: '통합 보장', amount: '최대 1억원' },
      ],
      specialties: ['태아부터 평생 보장', '성장 단계별 특약 추가', '교육비 지원 특약'],
      discounts: ['임신 중 가입 10%', '온라인 가입 7%', '장기계약 15%'],
      color: '#F59E0B',
    },
  ];

  const scrollToConsultation = () => {
    window.location.href = '/#consultation';
  };

  return (
    <div className="compare-child-page">
      {/* Hero Section */}
      <div className="compare-hero">
        <div className="compare-hero-content">
          <h1>👶 어린이(태아)보험 한눈에 비교하기</h1>
          <p>태아부터 평생보장, 우리 아이를 위한 최적의 보험을 비교하고 선택하세요</p>
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
          <h3>💡 어린이보험 가입 시기와 팁</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">🤰</span>
              <div>
                <strong>임신 중 가입</strong>
                <p>16~22주가 최적 가입시기</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">👶</span>
              <div>
                <strong>선천이상 보장</strong>
                <p>태아 시기 가입이 유리</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📅</span>
              <div>
                <strong>보장 기간</strong>
                <p>100세까지 평생 보장</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💰</span>
              <div>
                <strong>보험료</strong>
                <p>어릴수록 저렴하게 가입</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>🎯 우리 아이를 위한 맞춤 보험이 궁금하다면?</h2>
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

export default CompareChild;
