import React from 'react';
import './AdSidebar.css';

function AdSidebar() {
  return (
    <aside className="ad-sidebar">
      {/* 애드센스 섹션 */}
      <div className="ad-section adsense">
        <div className="ad-label">Advertisement</div>
        <div className="ad-placeholder">
          {/* 여기에 실제 애드센스 코드를 넣으세요 */}
          <div className="ad-content">
            <p>🔹 Google AdSense</p>
            <p className="ad-size">300 x 600</p>
            <p className="ad-instruction">
              애드센스 승인 후<br />
              여기에 광고 코드 삽입
            </p>
          </div>
        </div>
      </div>

      {/* 쿠팡파트너스 섹션 */}
      <div className="ad-section coupang">
        <div className="ad-label">쿠팡파트너스</div>
        <div className="ad-placeholder">
          {/* 여기에 실제 쿠팡파트너스 코드를 넣으세요 */}
          <div className="ad-content">
            <p>🛒 쿠팡 추천 상품</p>
            <p className="ad-size">300 x 600</p>
            <p className="ad-instruction">
              파트너스 승인 후<br />
              여기에 광고 코드 삽입
            </p>
          </div>
        </div>
      </div>

      {/* 이 파트너스 활동의 일환으로 쿠팡으로부터 일정액의 수수료를 제공받을 수 있습니다 */}
      <div className="coupang-disclaimer">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </div>
    </aside>
  );
}

export default AdSidebar;
