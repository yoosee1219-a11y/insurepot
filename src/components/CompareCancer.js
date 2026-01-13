import React, { useState } from 'react';
import './CompareCancer.css';

const CompareCancer = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    coverage: [],
    discounts: [],
  });

  const coverageOptions = [
    '일반암 진단금',
    '고액암 보장',
    '소액암 보장',
    '암 수술비',
    '항암치료비',
    '암 입원비',
  ];

  const discountOptions = [
    '조기 가입 할인',
    '건강검진 할인',
    '비흡연자 할인',
    '가족력 없음',
    '온라인 가입',
    '장기계약',
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
      logo: '🏢',
      rating: 4.8,
      reviews: 4235,
      coverage: [
        { name: '일반암 진단금', amount: '5천만원' },
        { name: '고액암 진단금', amount: '1억원' },
        { name: '소액암 진단금', amount: '1천만원' },
        { name: '암 수술비', amount: '최대 2천만원' },
        { name: '항암치료비', amount: '최대 3천만원' },
      ],
      specialties: ['암 전문 케어 서비스', '암 2차 의견 서비스', '항암치료 병원 추천'],
      discounts: ['조기 가입 할인 10%', '비흡연자 할인 12%', '건강검진 할인 8%'],
      color: '#059669',
    },
    {
      id: 2,
      company: '현대라이프',
      logo: '🛡️',
      rating: 4.7,
      reviews: 3876,
      coverage: [
        { name: '일반암 진단금', amount: '5천만원' },
        { name: '고액암 진단금', amount: '1억원' },
        { name: '소액암 진단금', amount: '1천만원' },
        { name: '암 수술비', amount: '최대 2천만원' },
        { name: '암 입원비', amount: '1일 10만원' },
      ],
      specialties: ['암 환자 심리 상담', '암 치료비 선지급', '전문 요양병원 연계'],
      discounts: ['가족력 없음 15%', '온라인 가입 8%', '장기계약 10%'],
      color: '#DC2626',
    },
    {
      id: 3,
      company: 'KB손해보험',
      logo: '⛑️',
      rating: 4.6,
      reviews: 3254,
      coverage: [
        { name: '일반암 진단금', amount: '5천만원' },
        { name: '고액암 진단금', amount: '1억원' },
        { name: '소액암 진단금', amount: '1천만원' },
        { name: '암 수술비', amount: '최대 2천만원' },
        { name: '암 통합 보장', amount: '최대 1.5억원' },
      ],
      specialties: ['암 특화 간병 서비스', '재발암 추가 보장', '말기암 생활비 지원'],
      discounts: ['조기 가입 할인 12%', '비흡연자 할인 15%', '온라인 가입 5%'],
      color: '#7C3AED',
    },
  ];

  const scrollToConsultation = () => {
    window.location.href = '/#consultation';
  };

  return (
    <div className="compare-cancer-page">
      {/* Hero Section */}
      <div className="compare-hero">
        <div className="compare-hero-content">
          <h1>🏢 암보험 한눈에 비교하기</h1>
          <p>든든한 암 보장, 주요 보험사의 암보험을 비교하고 최적의 보장을 선택하세요</p>
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
          <h3>💡 암보험 가입 시 꼭 확인하세요</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">🎯</span>
              <div>
                <strong>보장 범위</strong>
                <p>일반암/고액암/소액암 구분</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">⏰</span>
              <div>
                <strong>면책기간</strong>
                <p>90일 또는 1~2년 확인</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🔄</span>
              <div>
                <strong>재발암 보장</strong>
                <p>재발 시 추가 보장 여부</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💊</span>
              <div>
                <strong>치료비 보장</strong>
                <p>수술/항암/입원비 포함</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>🎯 나에게 맞는 암보험이 궁금하다면?</h2>
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

export default CompareCancer;
