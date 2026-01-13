import React, { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToSection = useCallback(
    (sectionId) => {
      setMenuOpen(false); // 메뉴 닫기
      // 메인 페이지가 아니면 먼저 메인 페이지로 이동
      if (location.pathname !== '/') {
        navigate('/');
        // 페이지 이동 후 스크롤
        setTimeout(() => {
          const element = document.querySelector(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // 이미 메인 페이지면 바로 스크롤
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    [location.pathname, navigate]
  );

  // 검색 기능 (useCallback으로 최적화)
  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/posts?search=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery('');
        setMenuOpen(false);
      }
    },
    [searchQuery, navigate]
  );

  const handleSearchKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleSearch(e);
      }
    },
    [handleSearch]
  );

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <header>
      <nav>
        <Link to="/" className="logo">
          🛡️ 보이지
        </Link>

        {/* 검색창 */}
        <div className="header-search">
          <input
            type="text"
            placeholder="보험 정보 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearchKeyPress}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button" aria-label="검색">
            🔍
          </button>
        </div>

        {/* 햄버거 메뉴 버튼 */}
        <button className="hamburger" onClick={toggleMenu} aria-label="메뉴">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/coupons" onClick={closeMenu} className="coupon-menu-item">
              쿠폰혜택
            </Link>
          </li>
          <li>
            <a
              href="#info"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#info');
              }}
            >
              보험정보
            </a>
          </li>
          <li>
            <a
              href="#compare"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#compare');
              }}
            >
              보험비교
            </a>
          </li>
          <li>
            <a
              href="#consult"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#consult');
              }}
            >
              상담신청
            </a>
          </li>
          <li>
            <Link to="/admin" onClick={closeMenu}>
              관리자
            </Link>
          </li>
          <li className="mobile-cta">
            <a
              href="#quick-quote"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#quick-quote');
              }}
              className="cta-button"
            >
              무료 견적받기
            </a>
          </li>
        </ul>

        <a
          href="#quick-quote"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#quick-quote');
          }}
          className="cta-button desktop-cta"
        >
          무료 견적받기
        </a>
      </nav>
    </header>
  );
}

export default Header;
