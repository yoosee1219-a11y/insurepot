import React, { useState } from 'react';

function ComparisonSection() {
  const [filters, setFilters] = useState({
    carType: '중형차',
    driverAge: '만 31-40세',
    experience: '3-5년',
    coverage: '자차 포함',
  });

  const mockResults = [
    {
      company: '삼성',
      name: '삼성화재 다이렉트',
      note: '온라인 할인 15% 적용',
      price: 452000,
    },
    {
      company: '현대',
      name: '현대해상 다이렉트',
      note: '마일리지 특약 포함',
      price: 468000,
    },
    {
      company: 'KB',
      name: 'KB손해보험 다이렉트',
      note: '안전운전 할인 적용',
      price: 445000,
    },
  ];

  const handleCompare = () => {
    alert('실제 서비스에서는 보험사 API와 연동하여 실시간 견적을 제공합니다.');
  };

  return (
    <section className="comparison-section" id="compare">
      <h2 className="section-title">🔍 실시간 보험료 비교</h2>
      <div className="comparison-tool">
        <h3>다이렉트 자동차보험 비교견적</h3>

        <div className="comparison-filters">
          <div className="filter-group">
            <label>차량 종류</label>
            <select
              value={filters.carType}
              onChange={(e) => setFilters({ ...filters, carType: e.target.value })}
            >
              <option>소형차</option>
              <option>중형차</option>
              <option>대형차</option>
              <option>SUV</option>
            </select>
          </div>

          <div className="filter-group">
            <label>운전자 연령</label>
            <select
              value={filters.driverAge}
              onChange={(e) => setFilters({ ...filters, driverAge: e.target.value })}
            >
              <option>만 21-25세</option>
              <option>만 26-30세</option>
              <option>만 31-40세</option>
              <option>만 41세 이상</option>
            </select>
          </div>

          <div className="filter-group">
            <label>운전경력</label>
            <select
              value={filters.experience}
              onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
            >
              <option>1년 미만</option>
              <option>1-3년</option>
              <option>3-5년</option>
              <option>5년 이상</option>
            </select>
          </div>

          <div className="filter-group">
            <label>보장범위</label>
            <select
              value={filters.coverage}
              onChange={(e) => setFilters({ ...filters, coverage: e.target.value })}
            >
              <option>대인/대물</option>
              <option>자차 포함</option>
              <option>풀커버</option>
            </select>
          </div>
        </div>

        <button className="cta-button" onClick={handleCompare} style={{ width: '100%' }}>
          비교 견적 받기
        </button>

        <div className="comparison-results">
          <h4>비교 결과 (연간보험료)</h4>
          {mockResults.map((result, index) => (
            <div key={index} className="result-card">
              <div className="insurance-company">
                <div className="company-logo">{result.company}</div>
                <div>
                  <h4>{result.name}</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>{result.note}</p>
                </div>
              </div>
              <div className="price-info">
                <div className="price">{result.price.toLocaleString()}원</div>
                <div className="price-label">연납 기준</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComparisonSection;
