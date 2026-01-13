-- 쿠폰 테이블 생성
-- Supabase SQL Editor에서 실행하세요

-- 쿠폰 테이블
CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT '정비',
  discount_text TEXT NOT NULL,
  location TEXT,
  how_to_use TEXT,
  image_url TEXT,
  valid_until DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- 읽기 정책: 활성화된 쿠폰만 공개 조회 가능
CREATE POLICY "Active coupons are viewable by everyone"
ON coupons
FOR SELECT
USING (is_active = true);

-- 관리자 전체 접근 정책 (인증된 사용자)
CREATE POLICY "Authenticated users can manage coupons"
ON coupons
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- 또는 서비스 역할로 전체 접근 (API 키 사용 시)
-- 참고: 기존 프로젝트처럼 anon key로 관리한다면 아래 정책 사용
CREATE POLICY "Allow all operations for anon"
ON coupons
FOR ALL
USING (true)
WITH CHECK (true);

-- updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_coupons_updated_at
BEFORE UPDATE ON coupons
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 샘플 데이터 (선택사항)
INSERT INTO coupons (title, description, category, discount_text, location, how_to_use, valid_until, is_active)
VALUES
  ('엔진오일 교환 50% 할인', '합성유 기준, 국산차 한정', '엔진오일', '50% 할인', '전국 스피드메이트 매장', '상담사에게 쿠폰 코드 문의', '2025-02-28', true),
  ('타이어 4개 교체 시 1개 무료', '금호, 한국 타이어 한정', '타이어', '1개 무료', '전국 타이어뱅크 매장', '상담 후 쿠폰 발급', '2025-02-28', true),
  ('에어컨 필터 교체 무료', '신규 상담 고객 한정', '에어컨', '무료', '지정 정비소', '상담 완료 후 쿠폰 발급', '2025-03-31', true);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_coupons_is_active ON coupons(is_active);
CREATE INDEX IF NOT EXISTS idx_coupons_category ON coupons(category);
CREATE INDEX IF NOT EXISTS idx_coupons_valid_until ON coupons(valid_until);
