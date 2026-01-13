import React, { useState } from 'react';
import './CompareAuto.css';

const CompareAuto = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    coverage: [],
    discounts: [],
  });
  const [openFaq, setOpenFaq] = useState(null);

  const coverageOptions = [
    '대인배상Ⅰ',
    '대인배상Ⅱ',
    '대물배상',
    '자기신체사고',
    '자기차량손해',
    '무보험차상해',
  ];

  const discountOptions = [
    '블랙박스 할인',
    '안전운전 할인',
    '저공해차 할인',
    '주행거리 할인',
    '자녀할인',
    '하이브리드 할인',
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
      logo: '🛡️',
      monthlyPremium: '87,000',
      rating: 4.5,
      reviews: 1234,
      coverage: [
        { name: '대인배상Ⅰ', amount: '무한' },
        { name: '대인배상Ⅱ', amount: '1억원' },
        { name: '대물배상', amount: '2천만원' },
        { name: '자기신체사고', amount: '1억원' },
        { name: '자기차량손해', amount: '시가 기준' },
      ],
      specialties: ['24시간 긴급출동 서비스', '렌터카 무료 제공 (3일)', '전국 정비망 보유'],
      discounts: ['블랙박스 할인 5%', '안전운전 할인 10%', '장기우수 할인 7%'],
      color: '#1E40AF',
    },
    {
      id: 2,
      company: '현대해상',
      logo: '🚗',
      monthlyPremium: '82,500',
      rating: 4.3,
      reviews: 987,
      coverage: [
        { name: '대인배상Ⅰ', amount: '무한' },
        { name: '대인배상Ⅱ', amount: '1억원' },
        { name: '대물배상', amount: '2천만원' },
        { name: '자기신체사고', amount: '1억원' },
        { name: '자기차량손해', amount: '시가 기준' },
      ],
      specialties: ['다이렉트 전문 상담사', 'AI 사고처리 시스템', '보험료 자동절감 알림'],
      discounts: ['주행거리 할인 8%', '자녀할인 3%', '하이브리드 할인 5%'],
      color: '#059669',
    },
    {
      id: 3,
      company: 'DB손해보험',
      logo: '⚡',
      monthlyPremium: '79,900',
      rating: 4.4,
      reviews: 756,
      coverage: [
        { name: '대인배상Ⅰ', amount: '무한' },
        { name: '대인배상Ⅱ', amount: '1억원' },
        { name: '대물배상', amount: '2천만원' },
        { name: '자기신체사고', amount: '1억원' },
        { name: '자기차량손해', amount: '시가 기준' },
      ],
      specialties: ['프리미엄 고객센터', '사고 시 전문변호사 자문', '해외여행 자동차보험 연계'],
      discounts: ['저공해차 할인 7%', '안전운전 할인 10%', '온라인 가입 할인 5%'],
      color: '#DC2626',
    },
  ];

  const scrollToConsultation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: '상담 없이도 가입할 수 있나요?',
      answer:
        '네, 온라인으로 간편하게 보험 신청서를 작성하고 제출할 수 있어요. 기본 정보와 현재 사용중인 보험사, 차량번호를 입력하시면 됩니다.',
    },
    {
      question: '특약은 꼭 선택해야 하나요?',
      answer:
        '특약 선택은 보험 가입 시 필수는 아니지만, 더 폭넓은 보장을 위해 추천드립니다. 블랙박스 할인, 안전운전 할인 등 다양한 특약이 있으며, 고객님의 상황에 맞게 선택하실 수 있습니다.',
    },
    {
      question: '블랙박스가 있으면 무조건 할인되나요?',
      answer:
        '일부 특약은 보험기간 중 변경이 어려우나, 갱신 시에는 자유롭게 조정할 수 있어요. 변경 가능 여부는 고객센터나 마이페이지에서 확인하실 수 있어요.',
    },
    {
      question: '가입 후 특약을 나중에 변경할 수 있나요?',
      answer:
        '일부 특약은 보험 기간 중 변경이 어려우나, 갱신 시에는 자유롭게 조정할 수 있어요. 변경 가능 여부는 고객센터나 마이페이지에서 확인하실 수 있습니다.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: '신청접수',
      description:
        '온라인으로 간편하게 보험 신청서를 작성하고 제출합니다.\n기본 정보와 현재 사용중인 보험사, 차량번호를 입력하세요.',
      icon: '📝',
    },
    {
      number: '02',
      title: '보험이지 전담 매니저',
      description:
        '보험이지 전담 매니저가 배정되어 고객님의 상황에 맞는 맞춤형 상담을 진행합니다.\n궁금한 점은 언제든 물어보세요.',
      icon: '👨‍💼',
    },
    {
      number: '03',
      title: '최저 보험사 조회',
      description:
        '다양한 보험사의 상품을 비교 분석하여 고객님에게 가장 유리하고 합리적인\n조건의 보험사를 찾아드립니다.',
      icon: '🔍',
    },
    {
      number: '04',
      title: '보험료 안내',
      description:
        '최종 선택된 보험 상품의 보험료와 보장 내용을 정리하여 고객님이 이해하기 쉽도록\n상세히 안내해 드리고 계약을 진행합니다.',
      icon: '💬',
    },
  ];

  const reviews = [
    {
      name: '김○○님',
      age: '30대',
      location: '서울',
      rating: 5,
      comment:
        '보험료는 줄이고, 보장은 그대로! 기존 보험보다 1년에 꽤 큰 돈을 아꼈어요. 추천합니다! 특약선택도 일일이 도와주셨어요.',
    },
    {
      name: '이○○님',
      age: '40대',
      location: '대구',
      rating: 5,
      comment:
        '처음엔 다이렉트 보험이라 각정했는데, 무려 10만원이 가입 완료했고 사고 땐 뭔가 처리 서비스까지 정말 편했습니다. 전화 기다릴 필요 없어요!',
    },
    {
      name: '박○○님',
      age: '20대',
      location: '경기',
      rating: 5,
      comment:
        '처음 보험 가입하는 거라 각정 많았는데, 설명도 차분하고 비대면으로 빠르게 결나니까 바쁜 직장인분들 딱이에요. 감사합니다.',
    },
  ];

  const features = [
    {
      number: '01',
      title: 'Comfortable',
      subtitle: '우리의 자동차 생활이\n편리해집니다.',
      description: '보험 그 이상 예상치 못한 순간까지 책임지는 스마트한 선택입니다.',
      gradient: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)',
    },
    {
      number: '02',
      title: 'Reasonable',
      subtitle: '보험료는 합리적으로,\n보장은 넉넉하게 드립니다.',
      description: '슬은 비용 없이 꼭 필요한 보장만 담아, 실속 있는 보험을 완성합니다.',
      gradient: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)',
    },
    {
      number: '03',
      title: 'Fast',
      subtitle: '가입부터 보상까지,\n빠르게 처리됩니다.',
      description: '복잡한 절차 없이 빠르고 간편하게, 응급 상황에도 즉시 대응합니다.',
      gradient: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)',
    },
  ];

  const riders = [
    { icon: '🚗', name: '긴급출동\n서비스' },
    { icon: '⚡', name: '주행거리\n특약 할인' },
    { icon: '🌿', name: 'ECO 마일리지\n특약할인' },
    { icon: '📹', name: '블랙박스 장착 시\n특약 할인' },
    { icon: '🚙', name: '무사고\n할인' },
    { icon: '🪖', name: '자기 신체 사고\n보장 특약' },
    { icon: '✍️', name: '기타\n특약' },
  ];

  return (
    <div className="compare-auto-page">
      {/* Hero Section */}
      <div className="compare-hero">
        <div className="compare-hero-content">
          <p className="hero-label">자동차보험</p>
          <h1 className="hero-title">운전자를 위한 모든 보험</h1>
          <h2 className="hero-subtitle">보험이지로 간편하게!</h2>
          <div className="hero-car-illustration">🚗</div>
        </div>
      </div>

      <div className="compare-container">
        {/* Why Section - 특징 강조 */}
        <section className="why-section">
          <h2 className="section-title">
            <span className="section-label">Why</span>
            <br />
            보험이지를 선택한 이유, 궁금하셨죠?
          </h2>

          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card" style={{ background: feature.gradient }}>
                <div className="feature-number">{feature.number}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-subtitle">{feature.subtitle}</p>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rider Section - 주요 특약 */}
        <section className="rider-section">
          <h2 className="section-title">
            <span className="section-label">Rider</span>
            <br />
            자동차보험 주요 특약 항목이에요.
          </h2>

          <div className="riders-grid">
            {riders.map((rider, idx) => (
              <div key={idx} className="rider-item">
                <div className="rider-icon">{rider.icon}</div>
                <p className="rider-name">{rider.name}</p>
              </div>
            ))}
          </div>
        </section>
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

              <div className="premium-section">
                <div className="premium-label">예상 월 보험료</div>
                <div className="premium-amount">{insurance.monthlyPremium}원</div>
                <div className="premium-note">* 개인 조건에 따라 다를 수 있습니다</div>
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
          <h3>💡 보험료는 이렇게 결정돼요</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">🚙</span>
              <div>
                <strong>차량 정보</strong>
                <p>차종, 연식, 용도</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">👤</span>
              <div>
                <strong>운전자 정보</strong>
                <p>나이, 경력, 사고이력</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <strong>지역</strong>
                <p>주 사용지역, 주차장소</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🎯</span>
              <div>
                <strong>보장 범위</strong>
                <p>가입 특약, 자기부담금</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step Section - 진행 방법 */}
        <section className="step-section">
          <h2 className="section-title">
            <span className="section-label">Step</span>
            <br />
            보험이지 진행방법이에요.
          </h2>

          <div className="steps-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-icon">{step.icon}</div>
                <div className="step-header">
                  <span className="step-label">Step {step.number}</span>
                  <h3 className="step-title">{step.title}</h3>
                </div>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Review Section - 고객 후기 */}
        <section className="review-section">
          <h2 className="section-title">
            <span className="section-label">Review</span>
            <br />
            보험이지 실제 이용자들의 <strong>생생한 후기</strong> 예요.
          </h2>

          <div className="reviews-grid">
            {reviews.map((review, idx) => (
              <div key={idx} className="review-card">
                <div className="review-header">
                  <div className="review-avatar">👤</div>
                  <div className="review-info">
                    <p className="review-author">{review.name}</p>
                    <p className="review-meta">
                      {review.age} {review.location}
                    </p>
                  </div>
                </div>
                <div className="review-rating">{'⭐'.repeat(review.rating)}</div>
                <p className="review-comment">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className="section-title">
            <span className="section-label">FAQ</span>
            <br />
            보험이지, 자주 묻는 질문을 모아봤어요.
          </h2>

          <div className="faq-list">
            {faqData.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(idx)}>
                  <span className="faq-q">Q</span>
                  <span className="faq-text">{faq.question}</span>
                  <span className="faq-arrow">{openFaq === idx ? '▲' : '▼'}</span>
                </button>
                {openFaq === idx && (
                  <div className="faq-answer">
                    <span className="faq-a">A.</span> {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>🎯 내 차에 딱 맞는 보험료가 궁금하다면?</h2>
          <p>1분만에 무료 견적을 받아보세요!</p>
          <button className="cta-button" onClick={scrollToConsultation}>
            지금 바로 무료 견적 받기
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

export default CompareAuto;
