import React, { useState } from 'react';
import './CompareDriver.css';

const CompareDriver = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    coverage: [],
    discounts: [],
  });

  const coverageOptions = [
    '교통사고처리지원금',
    '벌금',
    '변호사선임비용',
    '형사합의금',
    '방어비용',
    '면허정지위로금',
  ];

  const discountOptions = [
    '무사고 할인',
    '안전운전 할인',
    '블랙박스 할인',
    '온라인 가입',
    '장기계약',
    '우수운전자',
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
      logo: '🚘',
      rating: 4.7,
      reviews: 4532,
      coverage: [
        { name: '벌금', amount: '최대 2천만원' },
        { name: '변호사비용', amount: '최대 3천만원' },
        { name: '형사합의금', amount: '최대 3천만원' },
        { name: '교통사고처리지원금', amount: '5천만원' },
        { name: '면허정지위로금', amount: '100만원' },
      ],
      specialties: ['24시간 사고 상담 서비스', '전문 변호사 즉시 연결', '신속한 사고처리 지원'],
      discounts: ['무사고 할인 15%', '안전운전 할인 12%', '블랙박스 할인 10%'],
      color: '#3B82F6',
    },
    {
      id: 2,
      company: '현대해상',
      logo: '🛡️',
      rating: 4.6,
      reviews: 4123,
      coverage: [
        { name: '벌금', amount: '최대 2천만원' },
        { name: '변호사비용', amount: '최대 3천만원' },
        { name: '형사합의금', amount: '최대 3천만원' },
        { name: '교통사고처리지원금', amount: '5천만원' },
        { name: '방어비용', amount: '최대 2천만원' },
      ],
      specialties: ['AI 사고처리 시스템', '법률 전문가 무료 상담', '사고처리 원스톱 서비스'],
      discounts: ['온라인 가입 10%', '장기계약 12%', '우수운전자 15%'],
      color: '#059669',
    },
    {
      id: 3,
      company: 'DB손해보험',
      logo: '⚡',
      rating: 4.5,
      reviews: 3897,
      coverage: [
        { name: '벌금', amount: '최대 2천만원' },
        { name: '변호사비용', amount: '최대 3천만원' },
        { name: '형사합의금', amount: '최대 3천만원' },
        { name: '교통사고처리지원금', amount: '5천만원' },
        { name: '통합 보장', amount: '최대 1억원' },
      ],
      specialties: ['전문 변호사 네트워크', '사고 대응 매뉴얼 제공', '빠른 보험금 지급'],
      discounts: ['무사고 할인 15%', '블랙박스 할인 10%', '온라인 가입 8%'],
      color: '#DC2626',
    },
  ];

  const scrollToConsultation = () => {
    window.location.href = '/#consultation';
  };

  return (
    <div className="compare-driver-page">
      {/* Hero Section */}
      <div className="compare-hero">
        <div className="compare-hero-content">
          <h1>🚘 운전자보험 한눈에 비교하기</h1>
          <p>운전자를 보호하는 운전자보험, 주요 보험사를 비교하고 안전한 운전을 시작하세요</p>
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
          <h3>💡 운전자보험 vs 자동차보험</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">🚗</span>
              <div>
                <strong>자동차보험</strong>
                <p>차량 손해와 상대방 보상</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">👨‍⚖️</span>
              <div>
                <strong>운전자보험</strong>
                <p>운전자 본인의 법적 보호</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">⚖️</span>
              <div>
                <strong>형사책임</strong>
                <p>벌금, 변호사비용 등</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💼</span>
              <div>
                <strong>민사책임</strong>
                <p>합의금, 위로금 등</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>🎯 안전한 운전을 위한 보험이 궁금하다면?</h2>
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

export default CompareDriver;
