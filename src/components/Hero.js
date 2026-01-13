import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-badge">🎁 이달의 자동차 정비 쿠폰 증정</span>
          <h1>
            보험, <br />
            <span className="highlight">보이지</span>와 함께 쉽게
          </h1>
          <p>
            복잡한 보험, 1:1 맞춤 컨설팅으로 해결하세요. <br />
            상담 고객께 자동차 정비 쿠폰을 드립니다!
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary-lg"
              onClick={() => document.getElementById('consult').scrollIntoView({ behavior: 'smooth' })}
            >
              무료 상담 신청하기
            </button>
            <button
              className="btn-secondary-lg"
              onClick={() => navigate('/coupons')}
            >
              🎫 쿠폰 받기
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <strong>1:1</strong>
              <span>맞춤 상담</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>무료</strong>
              <span>보험 컨설팅</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>매월</strong>
              <span>쿠폰 혜택</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-placeholder">
            <div className="floating-card card-1">
              <span>🛡️</span> 맞춤 보험 설계
            </div>
            <div className="floating-card card-2">
              <span>🚗</span> 자동차 정비 쿠폰
            </div>
            <div className="floating-card card-3">
              <span>👨‍👩‍👧‍👦</span> 가족 보험 상담
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Hero);
