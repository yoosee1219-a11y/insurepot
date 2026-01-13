import React, { useState } from 'react';
import './ComparePet.css';

const ComparePet = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    coverage: [],
    discounts: [],
  });

  const coverageOptions = ['질병 진료비', '수술비', '배상책임', '장례비', '예방접종', '건강검진'];

  const discountOptions = [
    '중성화 완료',
    '예방접종 완료',
    '마이크로칩 등록',
    '온라인 가입',
    '다견 할인',
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
      company: '삼성화재',
      logo: '🐶',
      rating: 4.6,
      reviews: 3234,
      coverage: [
        { name: '질병 진료비', amount: '연 200만원' },
        { name: '수술비', amount: '최대 500만원' },
        { name: '배상책임', amount: '1천만원' },
        { name: '장례비', amount: '100만원' },
        { name: '예방접종', amount: '연 20만원' },
      ],
      specialties: ['24시간 동물병원 안내', '반려동물 전문 수의사 상담', '전국 동물병원 네트워크'],
      discounts: ['중성화 완료 10%', '예방접종 완료 8%', '마이크로칩 등록 5%'],
      color: '#F59E0B',
    },
    {
      id: 2,
      company: '현대해상',
      logo: '🐱',
      rating: 4.5,
      reviews: 2987,
      coverage: [
        { name: '질병 진료비', amount: '연 200만원' },
        { name: '수술비', amount: '최대 500만원' },
        { name: '배상책임', amount: '1천만원' },
        { name: '장례비', amount: '100만원' },
        { name: '건강검진', amount: '연 30만원' },
      ],
      specialties: ['반려동물 건강관리 앱', '치료비 선지급 서비스', '펫시터 추천 서비스'],
      discounts: ['다견 할인 15%', '온라인 가입 10%', '장기계약 12%'],
      color: '#8B5CF6',
    },
    {
      id: 3,
      company: 'DB손해보험',
      logo: '🐾',
      rating: 4.4,
      reviews: 2654,
      coverage: [
        { name: '질병 진료비', amount: '연 200만원' },
        { name: '수술비', amount: '최대 500만원' },
        { name: '배상책임', amount: '1천만원' },
        { name: '장례비', amount: '100만원' },
        { name: '통합 보장', amount: '최대 800만원' },
      ],
      specialties: ['반려동물 행동교정 지원', '유기견 입양 지원 프로그램', '반려동물 호텔 할인'],
      discounts: ['중성화 완료 12%', '예방접종 완료 10%', '온라인 가입 7%'],
      color: '#10B981',
    },
  ];

  const scrollToConsultation = () => {
    window.location.href = '/#consultation';
  };

  return (
    <div className="compare-pet-page">
      {/* Hero Section */}
      <div className="compare-hero">
        <div className="compare-hero-content">
          <h1>🐶 펫보험 한눈에 비교하기</h1>
          <p>소중한 반려동물을 위한 펫보험, 주요 보험사를 비교하고 최적의 보장을 선택하세요</p>
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
          <h3>💡 펫보험 가입 전 체크사항</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">📅</span>
              <div>
                <strong>가입 시기</strong>
                <p>어릴수록 가입이 유리</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🏥</span>
              <div>
                <strong>보장 범위</strong>
                <p>질병/사고/수술비 확인</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">⏰</span>
              <div>
                <strong>대기 기간</strong>
                <p>질병 30일, 슬개골 1년</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💰</span>
              <div>
                <strong>자기부담금</strong>
                <p>20% 자기부담 확인</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>🎯 우리 반려동물을 위한 보험이 궁금하다면?</h2>
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

export default ComparePet;
