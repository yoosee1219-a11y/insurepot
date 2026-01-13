import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { imageUploadService } from '../services';

const COUPON_CATEGORIES = ['엔진오일', '타이어', '에어컨', '배터리', '세차', '종합점검', '기타'];

function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '엔진오일',
    discount_text: '',
    location: '',
    how_to_use: '',
    valid_until: '',
    image_url: '',
    is_active: true,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCoupons(data || []);
    } catch (error) {
      console.error('쿠폰 로딩 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await imageUploadService.uploadImage(file);
      if (result.success && result.url) {
        setFormData((prev) => ({ ...prev, image_url: result.url }));
      } else {
        alert(result.error || '이미지 업로드 실패');
      }
    } catch (error) {
      alert('이미지 업로드 중 오류 발생');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.discount_text) {
      alert('제목과 할인 내용은 필수입니다.');
      return;
    }

    try {
      const couponData = {
        ...formData,
        valid_until: formData.valid_until || null,
      };

      if (editingId) {
        const { error } = await supabase
          .from('coupons')
          .update(couponData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('coupons')
          .insert([couponData]);
        if (error) throw error;
      }

      resetForm();
      fetchCoupons();
      alert(editingId ? '쿠폰이 수정되었습니다.' : '쿠폰이 등록되었습니다.');
    } catch (error) {
      console.error('쿠폰 저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon.id);
    setFormData({
      title: coupon.title || '',
      description: coupon.description || '',
      category: coupon.category || '엔진오일',
      discount_text: coupon.discount_text || '',
      location: coupon.location || '',
      how_to_use: coupon.how_to_use || '',
      valid_until: coupon.valid_until ? coupon.valid_until.split('T')[0] : '',
      image_url: coupon.image_url || '',
      is_active: coupon.is_active ?? true,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchCoupons();
    } catch (error) {
      console.error('삭제 오류:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      category: '엔진오일',
      discount_text: '',
      location: '',
      how_to_use: '',
      valid_until: '',
      image_url: '',
      is_active: true,
    });
  };

  return (
    <>
      <div className="content-header">
        <h1>쿠폰 관리</h1>
        <p>자동차 정비 쿠폰을 등록하고 관리하세요</p>
      </div>

      <div className="editor-section">
        <h2>{editingId ? '쿠폰 수정' : '새 쿠폰 등록'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 2 }}>
              <label>쿠폰 제목 *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="예: 엔진오일 교환 50% 할인"
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>카테고리</label>
              <select name="category" value={formData.category} onChange={handleFormChange}>
                {COUPON_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>설명</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="쿠폰에 대한 자세한 설명"
              rows={3}
            />
          </div>

          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>할인 내용 *</label>
              <input
                type="text"
                name="discount_text"
                value={formData.discount_text}
                onChange={handleFormChange}
                placeholder="예: 50% 할인, 10,000원 할인"
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>유효기간</label>
              <input
                type="date"
                name="valid_until"
                value={formData.valid_until}
                onChange={handleFormChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>사용 장소</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleFormChange}
              placeholder="예: 전국 스피드메이트 매장"
            />
          </div>

          <div className="form-group">
            <label>사용 방법</label>
            <input
              type="text"
              name="how_to_use"
              value={formData.how_to_use}
              onChange={handleFormChange}
              placeholder="예: 상담사에게 쿠폰 코드 문의"
            />
          </div>

          <div className="form-group">
            <label>쿠폰 이미지</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && <span>업로드 중...</span>}
            </div>
            {formData.image_url && (
              <div style={{ marginTop: '1rem' }}>
                <img
                  src={formData.image_url}
                  alt="쿠폰 미리보기"
                  style={{ maxWidth: '200px', borderRadius: '8px' }}
                />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, image_url: '' }))}
                  style={{ marginLeft: '1rem', color: '#e74c3c' }}
                >
                  이미지 삭제
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: formData.is_active ? '#d4edda' : '#f8d7da',
              border: '2px solid ' + (formData.is_active ? '#28a745' : '#dc3545'),
              borderRadius: '8px',
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleFormChange}
                style={{ width: '20px', height: '20px' }}
              />
              <span style={{ fontWeight: 500 }}>
                {formData.is_active ? '활성화 (사이트에 표시)' : '비활성화 (숨김)'}
              </span>
            </label>
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              {editingId ? '수정하기' : '등록하기'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              {editingId ? '취소' : '초기화'}
            </button>
          </div>
        </form>
      </div>

      <div className="content-list" style={{ marginTop: '3rem' }}>
        <div className="list-header">
          <h3>등록된 쿠폰 ({coupons.length})</h3>
        </div>

        {loading ? (
          <div className="loading">로딩 중...</div>
        ) : coupons.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            등록된 쿠폰이 없습니다.
          </div>
        ) : (
          coupons.map((coupon) => (
            <div key={coupon.id} className="list-item">
              <div className="item-info" style={{ display: 'flex', gap: '1rem' }}>
                {coupon.image_url && (
                  <img
                    src={coupon.image_url}
                    alt={coupon.title}
                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                )}
                <div>
                  <h3>
                    {!coupon.is_active && (
                      <span style={{ color: '#dc3545', fontSize: '0.8rem', marginRight: '0.5rem' }}>
                        [비활성]
                      </span>
                    )}
                    {coupon.title}
                  </h3>
                  <div className="item-meta">
                    {coupon.category} | {coupon.discount_text}
                    {coupon.valid_until && (
                      <> | ~{new Date(coupon.valid_until).toLocaleDateString('ko-KR')}</>
                    )}
                  </div>
                </div>
              </div>
              <div className="item-actions">
                <button className="action-btn edit" onClick={() => handleEdit(coupon)}>
                  수정
                </button>
                <button className="action-btn delete" onClick={() => handleDelete(coupon.id)}>
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default AdminCoupons;
