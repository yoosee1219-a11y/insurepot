import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>회사 소개</h4>
          <ul>
            <li>
              <a href="#about">보이지 소개</a>
            </li>
            <li>
              <a href="#partnership">제휴 문의</a>
            </li>
            <li>
              <a href="#careers">채용 정보</a>
            </li>
            <li>
              <a href="#press">보도자료</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>서비스</h4>
          <ul>
            <li>
              <a href="#auto">자동차보험 비교</a>
            </li>
            <li>
              <a href="#health">실손보험 비교</a>
            </li>
            <li>
              <a href="#cancer">암보험 비교</a>
            </li>
            <li>
              <a href="#calculator">보험료 계산기</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>고객 지원</h4>
          <ul>
            <li>
              <a href="#faq">자주 묻는 질문</a>
            </li>
            <li>
              <a href="#contact">1:1 문의</a>
            </li>
            <li>
              <a href="#guide">이용 가이드</a>
            </li>
            <li>
              <a href="#terms">보험 용어사전</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>법적 고지</h4>
          <ul>
            <li>
              <a href="#terms">이용약관</a>
            </li>
            <li>
              <a href="#privacy">개인정보처리방침</a>
            </li>
            <li>
              <a href="#insurance-law">보험업법 안내</a>
            </li>
            <li>
              <a href="#consumer">금융소비자보호</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 보이지 (boeasy.co.kr) | 보험 전문 컨설팅</p>
      </div>
    </footer>
  );
}

// React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(Footer);
