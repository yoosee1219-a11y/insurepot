# ⚡ 빠른 시작 가이드

## 🎯 지금 바로 시작하기 (5분)

### 1️⃣ 환경변수 파일 생성 (1분)

**중요:** 프로젝트를 실행하기 전에 꼭 해야 합니다!

#### Windows PowerShell:

```powershell
cd C:\Users\woosol\OneDrive\Desktop\insurepot-project
notepad .env.local
```

#### 아래 내용 복사 & 붙여넣기:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

**저장하고 닫기** (Ctrl+S)

> ⚠️ **중요:** 위 값들은 Supabase 설정 후 실제 값으로 변경해야 합니다!

---

### 2️⃣ Supabase 프로젝트 설정 (3분)

1. **https://supabase.com** 접속
2. **Sign Up** 또는 **Sign In**
3. **New Project** 클릭
4. 프로젝트 정보 입력:
   - Name: `insurepot`
   - Database Password: `원하는비밀번호` (저장!)
   - Region: `Northeast Asia (Seoul)`
5. **Create new project** 클릭 (2분 대기)

6. **SQL 실행:**
   - 왼쪽 메뉴 → **SQL Editor**
   - **New query** 클릭
   - `supabase-schema.sql` 파일 열기
   - 전체 복사 → 붙여넣기
   - **Run** 클릭
   - ✅ Success 확인

7. **API 키 복사:**
   - 왼쪽 메뉴 → **Settings** → **API**
   - **Project URL** 복사
   - **anon public** 키 복사
   - `.env.local` 파일에 붙여넣기

---

### 3️⃣ 프로젝트 실행 (1분)

```bash
# 개발 서버 시작
npm start
```

자동으로 브라우저가 열립니다!

- **메인 페이지:** http://localhost:3000
- **관리자:** http://localhost:3000/admin

---

## ✅ 동작 확인

### 메인 페이지 (http://localhost:3000)

- [x] 페이지가 정상적으로 로딩됨
- [x] 히어로 섹션 (보라색 배경)이 보임
- [x] 보험 종류 카드들이 보임
- [x] 하단 상담 신청 폼이 있음

### 관리자 페이지 (http://localhost:3000/admin)

- [x] 사이드바가 보임
- [x] 대시보드 통계가 표시됨
- [x] 콘텐츠 관리 메뉴가 작동함

---

## 🧪 기능 테스트

### 1. 게시글 작성 테스트

1. http://localhost:3000/admin 접속
2. "콘텐츠 관리" 클릭
3. 제목 입력: `테스트 게시글`
4. 카테고리 선택: `자동차보험 가이드`
5. 본문 입력: `이것은 테스트 게시글입니다.`
6. "즉시 발행" 체크
7. "게시하기" 클릭
8. ✅ 성공 메시지 확인
9. 메인 페이지로 이동 → 게시글 확인

### 2. 상담 신청 테스트

1. http://localhost:3000 접속
2. 하단 상담 섹션으로 스크롤
3. 정보 입력:
   - 이름: `홍길동`
   - 연락처: `010-1234-5678`
   - 보험 종류: `자동차보험`
4. "상담 신청하기" 클릭
5. ✅ 완료 메시지 확인
6. 관리자 페이지 → 상담 문의 확인

---

## 🐛 문제 해결

### "Failed to fetch" 오류

→ `.env.local` 파일 확인
→ Supabase URL과 KEY가 정확한지 확인
→ 개발 서버 재시작: `Ctrl+C` 후 `npm start`

### 게시글이 안 보임

→ Supabase 대시보드에서 `posts` 테이블 확인
→ `is_published`가 `true`인지 확인
→ SQL 스키마가 제대로 실행되었는지 확인

### "Module not found" 오류

```bash
npm install
npm start
```

---

## 📦 프로젝트 구조

```
insurepot-project/
├── src/
│   ├── components/         # React 컴포넌트
│   │   ├── Header.js      # 헤더
│   │   ├── Hero.js        # 히어로
│   │   ├── QuickQuote.js  # 빠른 견적
│   │   ├── InfoSection.js # 정보 섹션
│   │   ├── ComparisonSection.js # 비교
│   │   ├── ConsultationSection.js # 상담
│   │   ├── Footer.js      # 푸터
│   │   ├── Admin.js       # 관리자
│   │   └── Admin.css      # 관리자 스타일
│   ├── App.js             # 메인 앱
│   ├── App.css            # 스타일
│   └── supabaseClient.js  # DB 연결
├── supabase-schema.sql    # DB 스키마
├── .env.example           # 환경변수 예제
├── .env.local            # 환경변수 (생성 필요!)
└── README.md              # 문서
```

---

## 🚀 다음 단계

### 로컬 개발이 잘 되면:

1. **GitHub에 업로드**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Vercel 배포**
   - DEPLOYMENT-GUIDE.md 참조
   - 5분 안에 배포 완료!

---

## 💡 팁

- 개발 중에는 Supabase 대시보드를 열어두세요
- 브라우저 개발자 도구(F12)로 오류 확인
- 관리자 페이지에서 실시간으로 데이터 확인 가능

---

**🎉 축하합니다! 프로젝트가 준비되었습니다!**

문제가 있으면 README.md와 DEPLOYMENT-GUIDE.md를 참고하세요!
