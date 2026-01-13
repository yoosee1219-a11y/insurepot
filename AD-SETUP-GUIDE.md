# 📊 광고 설정 가이드

## 🎯 광고 위치

게시글 상세 페이지 (`/post/:id`)의 오른쪽 사이드바에 2개의 광고 공간이 있습니다:

1. **상단**: Google AdSense (300x600)
2. **하단**: 쿠팡파트너스 (300x600)

---

## 📍 파일 위치

`src/components/AdSidebar.js`

---

## 1️⃣ Google AdSense 설정

### 1. AdSense 승인 받기

1. https://www.google.com/adsense 접속
2. 계정 생성 및 사이트 등록
3. 승인 대기 (보통 1-2주)

### 2. 광고 코드 받기

승인 후:

1. AdSense 대시보드 → "광고" → "광고 단위별"
2. "디스플레이 광고" 선택
3. 크기: **세로형 대형 배너 (300x600)** 선택
4. 광고 코드 복사

### 3. 코드 삽입

`src/components/AdSidebar.js` 파일에서:

```jsx
{
  /* 애드센스 섹션 */
}
<div className="ad-section adsense">
  <div className="ad-label">Advertisement</div>
  <div className="ad-placeholder">
    {/* 아래에 AdSense 코드 붙여넣기 */}
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"
      crossorigin="anonymous"
    ></script>
    <ins
      class="adsbygoogle"
      style="display:inline-block;width:300px;height:600px"
      data-ad-client="ca-pub-XXXXXXXX"
      data-ad-slot="XXXXXXXXXX"
    ></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  </div>
</div>;
```

---

## 2️⃣ 쿠팡파트너스 설정

### 1. 파트너스 가입

1. https://partners.coupang.com 접속
2. 회원가입 및 사이트 등록
3. 승인 대기 (보통 1-3일)

### 2. 광고 코드 받기

승인 후:

1. 파트너스 대시보드 → "링크 생성" → "배너/위젯"
2. 크기: **300x600** 선택
3. 원하는 상품 카테고리 선택 (예: 보험 관련 도서, 건강용품 등)
4. 코드 복사

### 3. 코드 삽입

`src/components/AdSidebar.js` 파일에서:

```jsx
{
  /* 쿠팡파트너스 섹션 */
}
<div className="ad-section coupang">
  <div className="ad-label">쿠팡파트너스</div>
  <div className="ad-placeholder">
    {/* 아래에 쿠팡파트너스 코드 붙여넣기 */}
    <iframe
      src="https://ads-partners.coupang.com/widgets.html?id=XXXXXX&template=carousel&trackingCode=XXXXXX&subId=&width=300&height=600"
      width="300"
      height="600"
      frameborder="0"
      scrolling="no"
      referrerpolicy="unsafe-url"
    ></iframe>
  </div>
</div>;
```

---

## 🎨 광고 스타일 커스터마이징

### 광고 배경색 변경

`src/components/AdSidebar.css`에서:

```css
/* 애드센스 배경색 */
.ad-section.adsense .ad-placeholder {
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
}

/* 쿠팡 배경색 */
.ad-section.coupang .ad-placeholder {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}
```

### 광고 크기 변경

```css
.ad-placeholder {
  width: 280px; /* 원하는 너비 */
  height: 600px; /* 원하는 높이 */
}
```

---

## 💡 추천 광고 상품 (쿠팡파트너스)

보험 정보 사이트에 어울리는 카테고리:

- 📚 보험 관련 도서
- 💊 건강/의료용품
- 🏥 비상약/구급함
- 📱 건강관리 앱/디바이스
- 💼 금융/재테크 도서

---

## 📊 수익 최적화 팁

### 1. A/B 테스팅

- 다양한 광고 크기 테스트
- 다양한 상품 카테고리 테스트
- 광고 위치 변경 테스트

### 2. 콘텐츠 연관성

- 게시글 내용과 관련된 광고 선택
- 예: 자동차보험 글 → 자동차 용품 광고

### 3. 모바일 최적화

- 현재 1200px 이하에서는 광고 숨김
- 필요시 모바일용 광고 추가

---

## 🔍 성과 측정

### AdSense

- AdSense 대시보드에서 일일 수익 확인
- CTR(클릭률) 모니터링
- 최적화 제안 확인

### 쿠팡파트너스

- 파트너스 대시보드에서 클릭/구매 확인
- 전환율 분석
- 인기 상품 파악

---

## ⚠️ 주의사항

1. **정책 준수**
   - AdSense 정책 엄격히 준수
   - 자가 클릭 금지
   - 부정 트래픽 방지

2. **쿠팡 면책조항**
   - 반드시 면책조항 표시 (이미 포함됨)
   - 수정하지 말 것

3. **사용자 경험**
   - 광고가 콘텐츠를 방해하지 않도록
   - 너무 많은 광고 삽입 지양
   - 페이지 로딩 속도 체크

---

## 🚀 배포 전 체크리스트

- [ ] AdSense 코드 삽입
- [ ] 쿠팡파트너스 코드 삽입
- [ ] 로컬에서 광고 표시 확인
- [ ] 모바일 반응형 테스트
- [ ] 페이지 로딩 속도 측정
- [ ] Git 커밋 및 푸시
- [ ] Vercel 배포
- [ ] 실제 사이트에서 광고 작동 확인

성공적인 수익화를 응원합니다! 💰🎉
