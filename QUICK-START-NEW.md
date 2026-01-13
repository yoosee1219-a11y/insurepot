# ⚡ 인슈어팟 빠른 시작 가이드 (2024 최신)

> **먼저 SUPABASE-SETUP.md를 완료하셨나요?** ✅  
> 완료 후 이 가이드를 따라하세요!

---

## 🎯 전체 흐름 (10분)

```
1. Supabase 설정 (SUPABASE-SETUP.md) ✅ 완료
2. 환경변수 확인 ← 지금 여기
3. 로컬 테스트
4. Vercel 배포 (선택)
```

---

## 1️⃣ 환경변수 다시 확인 (1분)

### ⚠️ 가장 흔한 오류 원인!

`.env.local` 파일이 **올바른 위치**에 있나요?

```
✅ 정확한 위치:
C:\Users\woosol\OneDrive\Desktop\insurepot-project\.env.local

❌ 잘못된 위치:
C:\Users\woosol\OneDrive\Desktop\.env.local
C:\Users\woosol\OneDrive\Desktop\insurepot\.env.local
```

### 확인 방법:

**PowerShell:**

```powershell
cd C:\Users\woosol\OneDrive\Desktop\insurepot-project
dir .env.local
```

파일이 보이면 ✅ OK!  
"찾을 수 없음" 메시지가 나오면 ❌ 다시 생성하세요:

```powershell
notepad .env.local
```

### 내용 확인:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ 체크사항:

- [ ] `REACT_APP_` 접두사 있음
- [ ] `=` 양옆에 공백 없음
- [ ] URL이 `https://`로 시작
- [ ] Key가 `eyJ`로 시작하는 긴 문자열

---

## 2️⃣ 프로젝트 구조 확인 (1분)

```
insurepot-project/
├── .env.local              ← 있어야 함! (중요)
├── src/
│   ├── supabaseClient.js   ← Supabase 연결
│   ├── App.js              ← 메인 앱
│   └── components/
│       ├── Header.js
│       ├── InfoSection.js  ← 게시글 표시
│       └── ConsultationSection.js ← 상담 폼
└── package.json
```

---

## 3️⃣ 로컬 서버 실행 (2분)

### 단계 1: 서버 시작

```bash
cd C:\Users\woosol\OneDrive\Desktop\insurepot-project
npm start
```

**처음 실행 시 시간이 걸릴 수 있습니다 (30초~1분)**

### 단계 2: 브라우저 자동 실행

- 자동으로 열림: http://localhost:3000
- 안 열리면 직접 접속

### 단계 3: 페이지 확인

✅ **정상 작동:**

- 보라색 그라데이션 배경 (히어로 섹션)
- "어떤 보험을 찾으시나요?" 카드들
- "보험 완벽 가이드" 섹션에 게시글 3개
- 하단 상담 신청 폼

❌ **오류 발생:**

- 흰 화면만 보임 → F12 → Console 탭 확인
- "Failed to fetch" → 환경변수 확인
- 게시글 0개 → Supabase 데이터 확인

---

## 4️⃣ 기능 테스트 (3분)

### 테스트 A: 게시글 조회

1. 메인 페이지에서 **"보험 완벽 가이드"** 섹션 찾기
2. 게시글 3개가 보이는지 확인:
   - 자동차보험 할인 특약 총정리
   - 30대 직장인 필수 보험
   - 실손보험 청구 거절 대응법

**안 보이면?**
→ **F12** → **Console** 탭에서 오류 확인
→ Supabase 대시보드에서 posts 테이블 확인

---

### 테스트 B: 상담 신청

1. 페이지 맨 아래로 스크롤
2. **"전문가 상담 서비스"** 섹션 찾기
3. 폼 입력:
   ```
   이름: 홍길동
   연락처: 010-1234-5678
   이메일: test@test.com
   보험 종류: 자동차보험
   문의 내용: 테스트입니다
   ```
4. **"상담 신청하기"** 클릭
5. ✅ "상담 신청이 완료되었습니다!" 알림 확인

**확인:**

- Supabase 대시보드 → Table Editor → consultations
- 방금 입력한 데이터가 있으면 성공!

---

### 테스트 C: 관리자 페이지

1. **http://localhost:3000/admin** 접속
2. 사이드바 확인:
   - 📊 대시보드
   - 📝 콘텐츠 관리
   - 💬 상담 문의
3. **"콘텐츠 관리"** 클릭
4. 새 게시글 작성:
   ```
   카테고리: 자동차보험 가이드
   제목: 테스트 게시글입니다
   요약: 이것은 테스트입니다
   본문: 관리자 페이지에서 작성한 게시글입니다.
   즉시 발행: ✅ 체크
   ```
5. **"게시하기"** 클릭
6. ✅ 성공 메시지 확인

**확인:**

- 메인 페이지(http://localhost:3000) 새로고침
- 방금 작성한 게시글이 보이면 성공!

---

## 5️⃣ Vercel 배포 (선택, 5분)

### 준비물:

- GitHub 계정
- Vercel 계정 (무료)

### 단계 1: GitHub에 업로드

```bash
# Git 초기화 (이미 되어있음)
git add .
git commit -m "인슈어팟 프로젝트 완성"

# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/your-username/insurepot.git
git push -u origin main
```

### 단계 2: Vercel 배포

1. **https://vercel.com** 접속
2. **"Sign Up"** → GitHub 연동
3. **"Add New..."** → **"Project"**
4. GitHub 저장소 `insurepot` 선택
5. **"Import"** 클릭

### 단계 3: 환경변수 설정 ⚠️

**Environment Variables** 섹션에서:

```
Name: REACT_APP_SUPABASE_URL
Value: https://your-project.supabase.co

Name: REACT_APP_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

각 항목마다 **"Add"** 클릭!

### 단계 4: 배포

1. **"Deploy"** 클릭
2. ⏳ 약 2-3분 대기
3. 🎉 배포 완료!
4. 주소 확인: `https://insurepot-abcd123.vercel.app`

---

## 🐛 자주 발생하는 오류

### 1. "Module not found: Error: Can't resolve '@supabase/supabase-js'"

**원인:** 패키지 설치 안됨

**해결:**

```bash
npm install @supabase/supabase-js
npm start
```

---

### 2. 게시글이 빈 배열 [] 로 나옴

**원인:** RLS 정책 문제 또는 데이터 없음

**해결 1: 데이터 확인**

- Supabase → Table Editor → posts
- 데이터가 있나요?
- `is_published`가 `true`인가요?

**해결 2: RLS 비활성화 (테스트용)**

```sql
-- SQL Editor에서 실행
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
```

테스트 후 다시 활성화:

```sql
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
```

---

### 3. "Invalid API key" 오류

**원인:** 환경변수가 잘못됨

**해결:**

1. Supabase → Settings → API
2. **anon public** 키 복사 (service_role ❌)
3. `.env.local` 파일 수정
4. 서버 재시작 (Ctrl+C → npm start)

---

### 4. Vercel 배포 후 404 오류

**원인:** `vercel.json` 파일 문제

**해결:**
프로젝트 루트에 `vercel.json` 파일 확인:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

없으면 생성 후 재배포

---

## ✅ 최종 체크리스트

모든 단계가 완료되면:

- [ ] 로컬에서 npm start 성공
- [ ] 메인 페이지에서 게시글 3개 확인
- [ ] 상담 신청 폼 테스트 성공
- [ ] 관리자 페이지 접속 가능
- [ ] 새 게시글 작성 및 표시 확인
- [ ] F12 Console에 오류 없음
- [ ] (선택) Vercel 배포 성공

---

## 📚 다음 단계

### 추가 개발 아이디어:

- [ ] 회원 가입/로그인 (Supabase Auth)
- [ ] 이미지 업로드 (Supabase Storage)
- [ ] 검색 기능
- [ ] 페이지네이션
- [ ] 댓글 기능
- [ ] 이메일 알림

### 참고 문서:

- [Supabase Auth 가이드](https://supabase.com/docs/guides/auth)
- [Supabase Storage 가이드](https://supabase.com/docs/guides/storage)
- [React Router 가이드](https://reactrouter.com/)

---

## 🆘 도움이 필요하면?

1. **Console 오류 확인** (F12 → Console)
2. **Supabase 대시보드 확인**
3. **환경변수 재확인**
4. **서버 재시작**

그래도 안되면:

- `.env.local` 파일 내용 확인
- Supabase 테이블 데이터 확인
- npm 캐시 삭제: `npm cache clean --force`

---

**🎉 축하합니다! 인슈어팟 프로젝트가 완성되었습니다!**

이제 자유롭게 커스터마이징하고 기능을 추가해보세요! 🚀
