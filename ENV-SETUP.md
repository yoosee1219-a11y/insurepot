# 환경변수 설정 가이드

## 1. .env.local 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 입력하세요:

```
# 인슈어팟 Supabase 환경변수
REACT_APP_SUPABASE_URL=your_supabase_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 2. Supabase 값 확인 방법

1. [Supabase 대시보드](https://supabase.com/dashboard) 로그인
2. 프로젝트 선택
3. Settings → API 메뉴
4. Project URL과 anon public key 복사

## 3. 예시

```
REACT_APP_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUz[:]I1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTk4NjQwMCwiZXhwIjoxOTYxNTYyNDAwfQ.example_key_here
```

## 4. 주의사항

- `.env.local` 파일은 Git에 커밋하지 마세요
- 파일 생성 후 개발 서버를 재시작하세요 (`npm start`)
- 환경변수 이름 앞에 `REACT_APP_` 접두사가 필요합니다
