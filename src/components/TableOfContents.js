/**
 * 목차(Table of Contents) 컴포넌트
 * 글 내용의 제목들을 목차로 표시하고 클릭시 해당 섹션으로 이동
 */

import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/contentParser';
import './TableOfContents.css';

function TableOfContents({ toc }) {
  const [activeId, setActiveId] = useState('');

  // 스크롤 위치에 따라 활성 항목 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const headings = toc.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      // 현재 화면에 보이는 제목 찾기
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading.element) {
          const rect = heading.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveId(heading.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  const handleClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
    setActiveId(id);
  };

  if (!toc || toc.length === 0) {
    // 목차가 없을 때도 안내 메시지 표시
    return (
      <div className="sidebar-section toc-section">
        <h3>📑 목차</h3>
        <div className="toc-empty">
          <p>이 글에는 목차가 없습니다.</p>
          <small>
            제목(#, ##, ###)을 사용하면
            <br />
            자동으로 목차가 생성됩니다.
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-section toc-section">
      <h3>📑 목차</h3>
      <nav className="toc-list">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`toc-item toc-level-${item.level} ${activeId === item.id ? 'active' : ''}`}
            onClick={(e) => handleClick(e, item.id)}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default TableOfContents;
