# 🔐 관리자 계정 Supabase 설정 가이드

## 📋 개요

관리자 로그인 및 비밀번호 변경 기능을 위한 Supabase 설정 안내입니다.

---

## ⚙️ 1단계: Supabase SQL 실행

### 1. Supabase 대시보드 접속

- https://supabase.com 로그인
- 프로젝트 선택 (insurepot)

### 2. SQL Editor 열기

- 왼쪽 메뉴에서 **"SQL Editor"** 클릭
- **"New query"** 클릭

### 3. 관리자 테이블 생성 SQL 실행

아래 파일의 내용을 복사하여 실행:

**파일:** `supabase-admin-schema.sql`

```sql
-- 관리자 계정 테이블 추가
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 읽기 정책
CREATE POLICY "Anyone can read admin usernames" ON admin_users
  FOR SELECT USING (true);

-- 업데이트 트리거
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 초기 관리자 계정 (stryper11 / dbsdudgns0))
INSERT INTO admin_users (username, password_hash)
VALUES ('stryper11', '$2b$10$i/bbAAfAqrI5K./hKI13COuLm0QzgA3uqC8Lt2LnuHHwa9PZxHBki')
ON CONFLICT (username) DO NOTHING;
```

### 4. 실행 버튼 클릭

- **"Run"** 버튼 클릭
- ✅ "Success" 메시지 확인

---

## 🧪 2단계: 테이블 확인

### 1. Table Editor 열기

- 왼쪽 메뉴에서 **"Table Editor"** 클릭

### 2. admin_users 테이블 확인

- `admin_users` 테이블 선택
- 다음 컬럼 확인:
  - `id` (UUID)
  - `username` (TEXT)
  - `password_hash` (TEXT)
  - `created_at` (TIMESTAMP)
  - `updated_at` (TIMESTAMP)

### 3. 초기 데이터 확인

- username: `stryper11`
- password_hash: (해시값 확인)
- created_at: (현재 시간)

---

## 🔑 3단계: 로그인 테스트

### 로컬 테스트

1. 개발 서버 실행

   ```bash
   npm start
   ```

2. 관리자 페이지 접속
   - http://localhost:3000/admin

3. 로그인 정보 입력
   - **아이디:** stryper11
   - **비밀번호:** dbsdudgns0)

4. 로그인 성공 확인

---

## 🔄 4단계: 비밀번호 변경 기능

### 관리자 페이지에서 비밀번호 변경

1. 로그인 후 사이드바에서 **"🔐 비밀번호 변경"** 클릭

2. 비밀번호 변경 폼 입력:
   - 현재 비밀번호: `dbsdudgns0)`
   - 새 비밀번호: (원하는 비밀번호)
   - 새 비밀번호 확인: (동일하게 입력)

3. **"비밀번호 변경"** 버튼 클릭

4. 성공 메시지 확인 후 자동으로 로그아웃됨

5. 새 비밀번호로 다시 로그인

---

## 🚀 5단계: 프로덕션 배포

### Git 커밋 & 푸시

```bash
git add .
git commit -m "관리자 비밀번호 변경 기능 추가"
git push
```

### Vercel 자동 배포

- GitHub 푸시 후 자동으로 Vercel에 배포됩니다
- 배포 완료 후 https://insurepot.vercel.app/admin 접속

---

## 🔒 보안 기능

### 구현된 보안 기능

✅ **bcrypt 암호화** - 비밀번호 해시화 (Salt: 10 rounds)  
✅ **Supabase 저장** - 안전한 데이터베이스 저장  
✅ **현재 비밀번호 확인** - 변경 시 본인 확인  
✅ **비밀번호 확인 입력** - 오타 방지  
✅ **세션 관리** - 변경 후 자동 로그아웃  
✅ **RLS 정책** - Row Level Security 활성화

---

## 📝 비밀번호 안전 수칙

1. **최소 6자 이상** 사용
2. **영문, 숫자, 특수문자 조합** 권장
3. **다른 사이트와 다른 비밀번호** 사용
4. **정기적으로 변경** (3개월마다 권장)
5. **추측하기 어려운 조합** 사용

---

## 🐛 문제 해결

### Q1. "admin_users 테이블을 찾을 수 없습니다"

→ Supabase SQL Editor에서 `supabase-admin-schema.sql` 재실행

### Q2. 로그인이 안 됩니다

→ Supabase Table Editor에서 `admin_users` 테이블의 데이터 확인  
→ 필요시 SQL로 비밀번호 해시 재설정

### Q3. 비밀번호 변경 후 로그인 불가

→ Supabase Table Editor에서 `password_hash` 확인  
→ 브라우저 콘솔에서 오류 메시지 확인

### Q4. RLS 정책 오류

→ Supabase → Authentication → Policies 확인  
→ `admin_users` 테이블에 SELECT 정책이 있는지 확인

---

## 📞 지원

문제 발생 시:

1. Supabase 대시보드 → Table Editor → admin_users 확인
2. 브라우저 개발자 도구 → Console 탭 확인
3. Network 탭에서 API 요청 확인

성공적인 설정을 응원합니다! 🚀
