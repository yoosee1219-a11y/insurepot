import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from './Header';
import Footer from './Footer';
import './CouponList.css';

function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCoupons(data || []);
    } catch (error) {
      console.error('쿠폰 로딩 오류:', error);
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(coupons.map(c => c.category).filter(Boolean))];

  const filteredCoupons = filter === 'all'
    ? coupons
    : coupons.filter(c => c.category === filter);

  return (
    <>
      <Header />
      <main className="coupon-list-page">
        <div className="coupon-list-header">
          <h1>이달의 정비 쿠폰</h1>
          <p>보이지 상담 고객께 드리는 특별 혜택입니다</p>
        </div>

        <div className="coupon-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? '전체' : cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="coupon-list-loading">쿠폰을 불러오는 중...</div>
        ) : filteredCoupons.length === 0 ? (
          <div className="no-coupons-page">
            <div className="no-coupons-icon">🎫</div>
            <h3>현재 등록된 쿠폰이 없습니다</h3>
            <p>상담 신청 시 쿠폰 혜택을 안내해 드립니다!</p>
            <Link to="/#consult" className="btn-consult">
              상담 신청하기
            </Link>
          </div>
        ) : (
          <div className="coupon-list-grid">
            {filteredCoupons.map((coupon) => (
              <div key={coupon.id} className="coupon-list-card">
                <div className="coupon-list-badge">{coupon.category || '정비'}</div>
                {coupon.image_url ? (
                  <div className="coupon-list-image">
                    <img src={coupon.image_url} alt={coupon.title} />
                  </div>
                ) : (
                  <div className="coupon-list-image coupon-placeholder">
                    <span>🔧</span>
                  </div>
                )}
                <div className="coupon-list-content">
                  <h3>{coupon.title}</h3>
                  <p>{coupon.description}</p>
                  <div className="coupon-list-details">
                    <span className="discount">{coupon.discount_text}</span>
                    {coupon.valid_until && (
                      <span className="expiry">
                        유효기간: ~{new Date(coupon.valid_until).toLocaleDateString('ko-KR')}
                      </span>
                    )}
                  </div>
                  {coupon.location && (
                    <div className="coupon-location">
                      <span>📍 {coupon.location}</span>
                    </div>
                  )}
                  {coupon.how_to_use && (
                    <div className="coupon-usage">
                      <strong>사용방법:</strong> {coupon.how_to_use}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="coupon-notice">
          <h4>쿠폰 이용 안내</h4>
          <ul>
            <li>본 쿠폰은 보이지 상담 고객에게만 제공됩니다.</li>
            <li>쿠폰 사용 시 상담사에게 문의해 주세요.</li>
            <li>유효기간이 지난 쿠폰은 사용할 수 없습니다.</li>
            <li>일부 쿠폰은 중복 사용이 불가할 수 있습니다.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CouponList;
