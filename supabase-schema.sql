-- 인슈어팟 Supabase 데이터베이스 스키마
-- Supabase 대시보드의 SQL Editor에서 실행하세요

-- 1. 게시글 테이블
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  summary TEXT,
  content TEXT,
  view_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 상담 문의 테이블
CREATE TABLE consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  insurance_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RLS (Row Level Security) 정책 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 4. 공개 정책 설정
-- 발행된 게시글은 누구나 조회 가능
CREATE POLICY "Public can view published posts" ON posts
  FOR SELECT USING (is_published = true);

-- 모든 사용자가 상담 문의를 등록 가능
CREATE POLICY "Anyone can create consultation" ON consultations
  FOR INSERT WITH CHECK (true);

-- 관리자는 모든 작업 가능 (Supabase Auth를 사용할 경우)
-- CREATE POLICY "Admins can do everything on posts" ON posts
--   FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- CREATE POLICY "Admins can do everything on consultations" ON consultations
--   FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- 5. 샘플 데이터 (테스트용)
INSERT INTO posts (title, category, summary, content, is_published, view_count) VALUES
('자동차보험 할인 특약 총정리', '자동차보험', '최대 30% 절약하는 할인 특약 완벽 가이드', 
'자동차보험료를 크게 절약할 수 있는 할인 특약들을 소개합니다.

## 주요 할인 특약

### 1. 마일리지 할인 특약
연간 주행거리가 1만km 이하인 경우 최대 10% 할인

### 2. 블랙박스 할인
블랙박스 장착 시 3-5% 할인

### 3. 안전운전 할인
무사고 운전 기록에 따라 최대 20% 할인

### 4. 자녀할인 특약
만 26세 미만 자녀가 있는 경우 할인 혜택', true, 1523),

('30대 직장인 필수 보험', '보험추천', '꼭 필요한 보험 5가지와 가입 순서', 
'30대 직장인을 위한 필수 보험을 우선순위별로 안내합니다.

## 우선순위별 가입 순서

1. **실손의료보험** - 가장 먼저 가입해야 할 필수 보험
2. **암보험** - 30대부터 발병률 증가
3. **종신보험** - 사망보장과 노후준비
4. **자동차보험** - 운전자라면 필수
5. **저축성보험** - 재테크와 세제혜택', true, 892),

('실손보험 청구 거절 대응법', '실손보험', '거절 사유별 대처 방법과 재심사 요청', 
'실손보험 청구가 거절되었을 때의 대응 방법을 알려드립니다.

## 주요 거절 사유

### 1. 보장 제외 항목
미용 목적, 예방 목적 등은 보장 대상이 아닙니다.

### 2. 서류 미비
진료확인서, 영수증 등 필수 서류를 확인하세요.

### 3. 고지의무 위반
가입 시 건강상태를 정확히 고지해야 합니다.

## 재심사 요청 방법
거절 통지를 받은 날로부터 30일 이내에 재심사를 요청할 수 있습니다.', true, 2104);

-- 6. 인덱스 생성 (성능 최적화)
CREATE INDEX idx_posts_published ON posts(is_published, created_at DESC);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created ON consultations(created_at DESC);

-- 7. 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE posts 
    SET view_count = view_count + 1 
    WHERE id = post_id AND is_published = true;
END;
$$ LANGUAGE plpgsql;

-- 완료!
-- 이제 Supabase 대시보드에서 테이블을 확인하실 수 있습니다.
