-- AI Empire - Supabase Database Setup
-- Run this in your Supabase project's SQL Editor:
-- https://app.supabase.com → Your Project → SQL Editor → New Query

-- 1. Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Market tasks table
CREATE TABLE IF NOT EXISTS market_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  reward_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  reward_currency TEXT DEFAULT 'USD',
  category TEXT DEFAULT 'other',
  status TEXT DEFAULT 'pending_payment', -- pending_payment, open, in_progress, completed, cancelled
  payment_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Task submissions table
CREATE TABLE IF NOT EXISTS task_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID REFERENCES market_tasks(id) ON DELETE CASCADE NOT NULL,
  submitter_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  proof_url TEXT,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. RLS Policies (Row Level Security)

-- Profiles: everyone can read, user can update own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Market tasks: everyone can read open tasks, creator can manage own
ALTER TABLE market_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Market tasks are viewable by everyone"
  ON market_tasks FOR SELECT USING (true);

CREATE POLICY "Users can insert market tasks"
  ON market_tasks FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update own tasks"
  ON market_tasks FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Creators can delete own tasks"
  ON market_tasks FOR DELETE USING (auth.uid() = creator_id);

-- Task submissions: everyone can read, submitter can create, creator can approve/reject
ALTER TABLE task_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Submissions are viewable by everyone"
  ON task_submissions FOR SELECT USING (true);

CREATE POLICY "Users can insert submissions"
  ON task_submissions FOR INSERT WITH CHECK (auth.uid() = submitter_id);

CREATE POLICY "Task creators can update submissions on their tasks"
  ON task_submissions FOR UPDATE USING (
    auth.uid() IN (
      SELECT creator_id FROM market_tasks WHERE id = task_submissions.task_id
    )
  );

-- 5. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_market_tasks_status ON market_tasks(status);
CREATE INDEX IF NOT EXISTS idx_market_tasks_creator ON market_tasks(creator_id);
CREATE INDEX IF NOT EXISTS idx_task_submissions_task ON task_submissions(task_id);
CREATE INDEX IF NOT EXISTS idx_task_submissions_status ON task_submissions(status);
