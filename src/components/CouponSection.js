import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './CouponSection.css';

function CouponSection() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setCoupons(data || []);
    } catch (error) {
      console.error('쿠폰 로딩 오류:', error);
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="coupon-section" id="coupons">
        <div className="section-header">
          <h2>이달의 정비 쿠폰</h2>
          <p>상담 고객께 드리는 특별 혜택</p>
        </div>
        <div className="coupon-loading">로딩 중...</div>
      </section>
    );
  }

  return (
    <section className="coupon-section" id="coupons">
      <div className="section-header">
        <h2>이달의 정비 쿠폰</h2>
        <p>상담 고객께 드리는 특별 혜택</p>
      </div>

      {coupons.length === 0 ? (
        <div className="no-coupons">
          <p>현재 등록된 쿠폰이 없습니다.</p>
          <p>상담 신청 시 쿠폰 혜택을 안내해 드립니다!</p>
        </div>
      ) : (
        <div className="coupon-grid">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="coupon-card">
              <div className="coupon-badge">{coupon.category || '정비'}</div>
              {coupon.image_url && (
                <div className="coupon-image">
                  <img src={coupon.image_url} alt={coupon.title} />
                </div>
              )}
              <div className="coupon-info">
                <h3>{coupon.title}</h3>
                <p className="coupon-description">{coupon.description}</p>
                <div className="coupon-meta">
                  <span className="coupon-discount">{coupon.discount_text}</span>
                  {coupon.valid_until && (
                    <span className="coupon-expiry">
                      ~{new Date(coupon.valid_until).toLocaleDateString('ko-KR')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="coupon-cta">
        <Link to="/coupons" className="btn-view-all">
          전체 쿠폰 보기
        </Link>
      </div>
    </section>
  );
}

export default React.memo(CouponSection);
