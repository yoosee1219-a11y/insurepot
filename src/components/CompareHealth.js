import React, { useState } from 'react';
import './CompareHealth.css';

const CompareHealth = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    coverage: [],
    discounts: [],
  });

  const coverageOptions = [
    '입원비 보장',
    '통원비 보장',
    '비급여 항목',
    'MRI/CT 보장',
    '도수치료',
    '한방치료',
  ];

  const discountOptions = [
    '건강검진 완료',
    '비흡연자',
    '온라인 가입',
    '체질량지수 우수',
    '혈압정상',
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
      logo: '🏥',
      rating: 4.6,
      reviews: 2341,
      coverage: [
        { name: '입원의료비', amount: '최대 5천만원' },
        { name: '통원의료비', amount: '1일 30만원' },
        { name: '비급여 보장', amount: '실제 발생비용' },
        { name: 'MRI/CT 보장', amount: '회당 100만원' },
        { name: '도수치료', amount: '연 350만원' },
      ],
      specialties: [
        '24시간 의료상담 서비스',
        '전국 병원 네트워크 연계',
        '신속한 보험금 지급 (평균 3일)',
      ],
      discounts: ['건강검진 완료 5%', '비흡연자 10%', '온라인 가입 7%'],
      color: '#DC2626',
    },
    {
      id: 2,
      company: '현대라이프',
      logo: '💊',
      rating: 4.5,
      reviews: 1876,
      coverage: [
        { name: '입원의료비', amount: '최대 5천만원' },
        { name: '통원의료비', amount: '1일 30만원' },
        { name: '비급여 보장', amount: '실제 발생비용' },
        { name: 'MRI/CT 보장', amount: '회당 100만원' },
        { name: '한방치료', amount: '연 200만원' },
      ],
      specialties: ['AI 기반 맞춤 건강관리', '건강검진 연계 서비스', '모바일 간편 청구 시스템'],
      discounts: ['체질량지수 우수 8%', '혈압정상 5%', '장기계약 10%'],
      color: '#059669',
    },
    {
      id: 3,
      company: 'KB손해보험',
      logo: '⚕️',
      rating: 4.4,
      reviews: 1654,
      coverage: [
        { name: '입원의료비', amount: '최대 5천만원' },
        { name: '통원의료비', amount: '1일 30만원' },
        { name: '비급여 보장', amount: '실제 발생비용' },
        { name: 'MRI/CT 보장', amount: '회당 100만원' },
        { name: '도수/한방 통합', amount: '연 500만원' },
      ],
      specialties: ['프리미엄 건강검진 제공', '전문의 2차 소견 서비스', '치료병원 추천 서비스'],
      discounts: ['건강검진 완료 7%', '비흡연자 10%', '온라인 가입 5%'],
      color: '#1E40AF',
    },
  ];

  const scrollToConsultation = () => {
    window.location.href = '/#consultation';
  };

  return (
    <div className="compare-health-page">
      {/* Hero Section */}
      <div className="compare-hero">
        <div className="compare-hero-content">
          <h1>🏥 실손보험 한눈에 비교하기</h1>
          <p>주요 보험사의 실손보험을 비교하고 나에게 맞는 의료비 보장을 찾아보세요</p>
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
          <h3>💡 실손보험 보험료는 이렇게 결정돼요</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">👤</span>
              <div>
                <strong>연령</strong>
                <p>나이가 높을수록 보험료 증가</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💪</span>
              <div>
                <strong>건강상태</strong>
                <p>기왕증, 흡연여부 등</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📋</span>
              <div>
                <strong>보장범위</strong>
                <p>특약 선택, 자기부담금</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📅</span>
              <div>
                <strong>가입시기</strong>
                <p>조기가입 시 유리</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>🎯 나에게 딱 맞는 실손보험이 궁금하다면?</h2>
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

export default CompareHealth;
