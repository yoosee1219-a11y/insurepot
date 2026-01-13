import React, { useState } from 'react';
import {
  CONSULTATION_FORM_DEFAULTS,
  INSURANCE_TYPE_LIST,
  CONSULTATION_MESSAGES,
} from '../constants';

function ConsultationSection({ onSubmit }) {
  const [formData, setFormData] = useState(CONSULTATION_FORM_DEFAULTS);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert(CONSULTATION_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    const success = await onSubmit(formData);

    if (success) {
      // 폼 초기화
      setFormData(CONSULTATION_FORM_DEFAULTS);
    }
  };

  return (
    <section className="consultation-section" id="consult">
      <div className="consultation-container">
        <div className="consultation-header">
          <span className="section-badge">1:1 맞춤 컨설팅</span>
          <h2 className="section-title text-white">
            보험 전문가에게 <br />
            <span className="text-highlight">무료로 상담</span>받아보세요
          </h2>
          <p className="section-desc">
            복잡한 약관 분석부터 나에게 딱 맞는 상품 추천까지, <br />
            검증된 전문가가 친절하게 도와드립니다.
          </p>

          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">✅</span>
              <span>금융위 등록 정식 설계사</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <span>평균 10분 이내 응답</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <span>개인정보 안심 보장</span>
            </div>
          </div>
        </div>

        <div className="consultation-form-wrapper">
          <form onSubmit={handleSubmit} className="consultation-form">
            <div className="form-header">
              <h3>상담 신청하기</h3>
              <p>신청 후 담당자가 빠르게 연락드립니다.</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>이름</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="성함을 입력해주세요"
                  required
                />
              </div>

              <div className="form-group">
                <label>연락처</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>이메일 (선택)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
              />
            </div>

            <div className="form-group">
              <label>관심 보험 종류</label>
              <select name="insurance_type" value={formData.insurance_type} onChange={handleChange}>
                {INSURANCE_TYPE_LIST.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>문의 내용</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="궁금하신 점이나 현재 상황을 간단히 적어주세요."
              />
            </div>

            <button type="submit" className="submit-button-lg">
              무료 상담 신청하기
            </button>

            <p className="form-footer-text">
              입력하신 정보는 상담 목적으로만 사용됩니다.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ConsultationSection;
