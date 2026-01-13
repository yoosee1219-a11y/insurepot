# 🚀 인슈어팟 배포 가이드

## 📋 배포 전 체크리스트

### ✅ 1단계: Supabase 설정 (5분)

1. **Supabase 프로젝트 생성**
   - https://supabase.com 접속
   - "New Project" 클릭
   - 프로젝트 이름: `insurepot`
   - 데이터베이스 비밀번호 설정 (저장해두세요!)
   - Region: `Northeast Asia (Seoul)` 선택
   - 프로젝트 생성 완료 대기 (약 2분)

2. **데이터베이스 스키마 실행**
   - Supabase 대시보드 왼쪽 메뉴 → "SQL Editor" 클릭
   - "New query" 클릭
   - `supabase-schema.sql` 파일 내용 전체 복사
   - 붙여넣기 후 "Run" 클릭
   - ✅ 성공 메시지 확인

3. **API 키 복사**
   - 왼쪽 메뉴 → "Settings" → "API" 클릭
   - **Project URL** 복사 (예: https://abcdefgh.supabase.co)
   - **anon public** 키 복사 (매우 긴 문자열)
   - 메모장에 임시 저장

---

### ✅ 2단계: 로컬 환경변수 설정 (2분)

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# 윈도우 PowerShell
cd C:\Users\woosol\OneDrive\Desktop\insurepot-project
notepad .env.local
```

아래 내용 입력 (위에서 복사한 실제 값으로 교체):

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

저장 후 닫기

---

### ✅ 3단계: 로컬 테스트 (3분)

```bash
# 개발 서버 시작
npm start
```

브라우저에서 확인:

- http://localhost:3000 - 메인 페이지
- http://localhost:3000/admin - 관리자 페이지

**테스트 항목:**

- [ ] 메인 페이지가 정상적으로 로딩됨
- [ ] 관리자 페이지 접속 가능
- [ ] 게시글 작성 후 저장 확인
- [ ] 상담 신청 폼 제출 확인
- [ ] Supabase 대시보드에서 데이터 확인

---

## 🌐 Vercel 배포 (추천)

### 방법 1: GitHub 연동 배포 (가장 쉬움)

#### 1. GitHub에 코드 업로드

```bash
# Git 초기화 (이미 되어 있음)
git add .
git commit -m "Initial commit - insurepot project"

# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/your-username/insurepot.git
git branch -M main
git push -u origin main
```

#### 2. Vercel 연동

1. https://vercel.com 접속 및 로그인
2. "Add New..." → "Project" 클릭
3. GitHub 저장소 연결 (첫 회만 GitHub 인증 필요)
4. `insurepot` 저장소 선택
5. "Import" 클릭

#### 3. 환경변수 설정 ⚠️ 중요!

"Environment Variables" 섹션에서:

| Name                          | Value                            |
| ----------------------------- | -------------------------------- |
| `REACT_APP_SUPABASE_URL`      | https://your-project.supabase.co |
| `REACT_APP_SUPABASE_ANON_KEY` | your-anon-key-here               |

#### 4. 배포

- "Deploy" 버튼 클릭
- 약 2-3분 대기
- 🎉 배포 완료! (예: https://insurepot.vercel.app)

---

### 방법 2: Vercel CLI 배포

```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 폴더에서 실행
cd C:\Users\woosol\OneDrive\Desktop\insurepot-project
vercel

# 질문에 답변:
# ? Set up and deploy? Yes
# ? Which scope? (본인 계정 선택)
# ? Link to existing project? No
# ? What's your project's name? insurepot
# ? In which directory? ./
# ? Override settings? No

# 환경변수 추가
vercel env add REACT_APP_SUPABASE_URL
# (값 입력)

vercel env add REACT_APP_SUPABASE_ANON_KEY
# (값 입력)

# 프로덕션 배포
vercel --prod
```

---

## 🔧 추가 설정

### 커스텀 도메인 연결

1. Vercel 대시보드 → 프로젝트 선택
2. "Settings" → "Domains" 클릭
3. 도메인 입력 (예: insurepot.com)
4. DNS 설정 안내에 따라 진행

### 애널리틱스 추가

```bash
# Vercel Analytics 설치
npm install @vercel/analytics

# src/index.js에 추가:
import { Analytics } from '@vercel/analytics/react';

// <App /> 아래에:
<Analytics />
```

---

## 📊 Supabase 관리

### 게시글 확인

1. Supabase 대시보드
2. "Table Editor" → "posts" 테이블
3. 데이터 확인 및 수정 가능

### 상담 문의 확인

1. "Table Editor" → "consultations" 테이블
2. 새로운 문의 확인

### 백업 설정

1. "Database" → "Backups" 클릭
2. 자동 백업 활성화 (Pro 플랜)

---

## 🐛 문제 해결

### 배포 후 페이지가 비어있음

→ 환경변수가 제대로 설정되었는지 확인
→ Vercel 대시보드에서 "Deployments" → "Functions" 로그 확인

### Supabase 연결 오류

→ RLS 정책이 활성화되었는지 확인
→ API URL이 https://로 시작하는지 확인

### 404 오류 (관리자 페이지)

→ `vercel.json` 파일이 있는지 확인
→ 재배포: `vercel --prod`

---

## 📈 성능 최적화

### 이미지 최적화

```bash
npm install next/image
# 이미지 컴포넌트 사용
```

### 번들 크기 분석

```bash
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

---

## 🎯 다음 단계

배포 완료 후 추천 작업:

- [ ] Google Analytics 연동
- [ ] Search Console 등록
- [ ] 사이트맵 제출
- [ ] 소셜 미디어 공유 설정
- [ ] 보안 헤더 설정
- [ ] CDN 캐싱 최적화

---

## 📞 지원

문제 발생 시:

1. Vercel 로그 확인
2. Supabase 로그 확인
3. 브라우저 콘솔 확인

성공적인 배포를 응원합니다! 🚀
