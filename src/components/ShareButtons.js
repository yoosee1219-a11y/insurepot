/**
 * 공유 버튼 컴포넌트
 * 카카오톡 공유, URL 복사 기능 제공
 */

import React, { useState } from 'react';
import './ShareButtons.css';

function ShareButtons({ post }) {
  const [copied, setCopied] = useState(false);

  // 현재 페이지 URL
  const currentUrl = window.location.href;

  // URL 복사 기능
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);

      // 2초 후 복사 메시지 초기화
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('URL 복사 실패:', error);
      // Fallback: 구식 방법
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 카카오톡 공유 기능
  const handleKakaoShare = () => {
    // Kakao SDK가 로드되었는지 확인
    if (!window.Kakao) {
      alert('카카오톡 공유 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    // Kakao SDK 초기화 확인
    if (!window.Kakao.isInitialized()) {
      // JavaScript 키로 초기화
      const kakaoKey = process.env.REACT_APP_KAKAO_KEY || 'cafd9dfe1955184f28f022dadc403d9b';
      window.Kakao.init(kakaoKey);
      console.log('✅ 카카오 SDK 초기화 완료');
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: post.title,
          description: post.content
            ? post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
            : '보험 정보를 확인하세요',
          imageUrl: 'https://via.placeholder.com/800x400/3b82f6/ffffff?text=보험이지', // 나중에 실제 이미지로 변경
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
    } catch (error) {
      console.error('카카오톡 공유 오류:', error);
      alert('카카오톡 공유에 실패했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <div className="share-buttons">
      <div className="share-title">이 글 공유하기</div>

      <div className="share-button-group">
        {/* 카카오톡 공유 */}
        <button onClick={handleKakaoShare} className="share-btn kakao" aria-label="카카오톡 공유">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2.7-.6 2.1-.7 2.5 0 0 0 .2.1.3.1.1.2.1.3 0 .5-.3 2.4-1.6 2.8-1.9.5.1 1.1.1 1.7.1 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
          </svg>
          카카오톡
        </button>

        {/* URL 복사 */}
        <button
          onClick={handleCopyUrl}
          className={`share-btn url ${copied ? 'copied' : ''}`}
          aria-label="URL 복사"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {copied ? (
              <path d="M20 6L9 17l-5-5" />
            ) : (
              <>
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </>
            )}
          </svg>
          {copied ? '복사 완료!' : 'URL 복사'}
        </button>
      </div>

      {/* 복사 성공 메시지 */}
      {copied && <div className="copy-toast">✅ URL이 클립보드에 복사되었습니다!</div>}
    </div>
  );
}

export default ShareButtons;
