import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function QuickQuote() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // 사용자 고유 ID (세션 기반)
  const getUserId = () => {
    let userId = localStorage.getItem('user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('user_id', userId);
    }
    return userId;
  };

  const insuranceTypes = [
    {
      icon: '🚗',
      title: '자동차보험',
      desc: '다이렉트 비교',
      link: '/compare/auto',
      type: 'auto',
    },
    {
      icon: '🏥',
      title: '실손보험',
      desc: '의료비 보장',
      link: '/compare/health',
      type: 'health',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: '가족보험',
      desc: '온가족 보장',
      link: '/compare/family',
      type: 'family',
    },
    {
      icon: '🏢',
      title: '암보험',
      desc: '든든한 보장',
      link: '/compare/cancer',
      type: 'cancer',
    },
    {
      icon: '🏠',
      title: '주택화재',
      desc: '내집 지키기',
      link: '/compare/fire',
      type: 'fire',
    },
    {
      icon: '👶',
      title: '어린이(태아)보험',
      desc: '태아부터 평생보장',
      link: '/compare/child',
      type: 'child',
    },
    {
      icon: '🐶',
      title: '펫보험',
      desc: '반려동물 보장',
      link: '/compare/pet',
      type: 'pet',
    },
    {
      icon: '🚘',
      title: '운전자보험',
      desc: '운전자 보호',
      link: '/compare/driver',
      type: 'driver',
    },
  ];

  // 찜하기 목록 로드
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const userId = getUserId();
      const { data, error } = await supabase
        .from('favorites')
        .select('insurance_type')
        .eq('user_identifier', userId);

      if (error) {
        console.error('찜하기 로드 오류:', error);
        console.error('오류 상세:', JSON.stringify(error, null, 2));
      } else {
        const favoriteTypes = data ? data.map((item) => item.insurance_type) : [];
        setFavorites(favoriteTypes);
      }
    } catch (error) {
      console.error('오류:', error);
      console.error('오류 상세:', error.message);
    }
  };

  // 찜하기 토글
  const toggleFavorite = async (e, insuranceType) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지

    if (loading) return;
    setLoading(true);

    try {
      const userId = getUserId();
      const isFavorited = favorites.includes(insuranceType);

      console.log('찜하기 시도:', { userId, insuranceType, isFavorited });

      if (isFavorited) {
        // 찜하기 취소
        const { data, error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_identifier', userId)
          .eq('insurance_type', insuranceType);

        if (error) {
          console.error('찜하기 취소 오류:', error);
          console.error('오류 상세:', JSON.stringify(error, null, 2));
          throw error;
        }

        console.log('찜하기 취소 성공:', data);
        setFavorites(favorites.filter((type) => type !== insuranceType));
      } else {
        // 찜하기 추가
        const { data, error } = await supabase.from('favorites').insert([
          {
            user_identifier: userId,
            insurance_type: insuranceType,
          },
        ]);

        if (error) {
          console.error('찜하기 추가 오류:', error);
          console.error('오류 상세:', JSON.stringify(error, null, 2));
          throw error;
        }

        console.log('찜하기 추가 성공:', data);
        setFavorites([...favorites, insuranceType]);
      }
    } catch (error) {
      console.error('찜하기 오류:', error);
      console.error('전체 오류 객체:', JSON.stringify(error, null, 2));
      alert(`찜하기 처리 중 오류가 발생했습니다.\n\n콘솔을 확인해주세요. (F12)`);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <section className="quick-quote" id="quick-quote">
      <h2>어떤 보험을 찾으시나요?</h2>
      <div className="quote-options">
        {insuranceTypes.map((type, index) => {
          const isFavorited = favorites.includes(type.type);
          return (
            <div
              key={index}
              className={`quote-option ${type.link ? 'clickable' : ''}`}
              onClick={() => handleClick(type.link)}
              style={{
                cursor: type.link ? 'pointer' : 'default',
                position: 'relative',
              }}
            >
              <button
                className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
                onClick={(e) => toggleFavorite(e, type.type)}
                disabled={loading}
                title={isFavorited ? '찜하기 취소' : '찜하기'}
              >
                {isFavorited ? '❤️' : '🤍'}
              </button>
              <i>{type.icon}</i>
              <h4>{type.title}</h4>
              <p>{type.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default QuickQuote;
