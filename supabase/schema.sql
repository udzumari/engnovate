-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'pro')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TESTS TABLE
CREATE TABLE tests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('reading', 'listening', 'writing', 'speaking')),
  title TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- QUESTIONS TABLE
CREATE TABLE questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  test_id UUID REFERENCES tests(id) ON DELETE CASCADE NOT NULL,
  question_type TEXT NOT NULL,
  content JSONB NOT NULL,
  audio_url TEXT,
  correct_answer JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ATTEMPTS TABLE
CREATE TABLE attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  test_id UUID REFERENCES tests(id) ON DELETE CASCADE NOT NULL,
  section TEXT NOT NULL,
  answers JSONB DEFAULT '{}'::jsonb,
  ai_score JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ADMIN IMPORT LOGS
CREATE TABLE admin_import_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  file_type TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS POLICIES

-- Users: Users can read/update their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Tests: Publicly readable
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tests are viewable by everyone" ON tests FOR SELECT USING (true);

-- Questions: Publicly readable
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions are viewable by everyone" ON questions FOR SELECT USING (true);

-- Attempts: Users can only see their own attempts
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own attempts" ON attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own attempts" ON attempts FOR UPDATE USING (auth.uid() = user_id);

-- Admin Logs: Only admins (logic to be added later, for now restrict to none or specific user if needed)
-- For now, let's assume we will handle admin checks via app logic or a separate admin role column later.
ALTER TABLE admin_import_logs ENABLE ROW LEVEL SECURITY;
