-- ModelIt Readers - Initial Database Schema
-- Run this migration in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types (enums)
CREATE TYPE user_role AS ENUM ('teacher', 'student', 'admin');
CREATE TYPE subscription_tier AS ENUM ('teacher', 'school', 'district');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing');
CREATE TYPE reading_level AS ENUM ('low', 'mid', 'high');
CREATE TYPE content_type AS ENUM ('reader', 'activity', 'assessment');
CREATE TYPE progress_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE topic_domain AS ENUM ('life_systems', 'earth_systems', 'social_systems', 'tech_systems');

-- Schools table (optional for school-wide subscriptions)
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  district TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT,
  role user_role DEFAULT 'teacher',
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  tier subscription_tier DEFAULT 'teacher',
  status subscription_status DEFAULT 'active',
  seats_limit INTEGER DEFAULT 36, -- 36 for teacher tier
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classrooms table
CREATE TABLE classrooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  join_code CHAR(6) NOT NULL UNIQUE,
  grade_level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classroom students junction table
CREATE TABLE classroom_students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  classroom_id UUID NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reading_level reading_level DEFAULT 'mid',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(classroom_id, student_id)
);

-- Topics table (e.g., Ecosystems, Human Body, Economics, Climate)
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  domain topic_domain NOT NULL,
  description TEXT,
  icon TEXT, -- Lucide icon name
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content table (readers, activities, assessments)
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  reading_level reading_level DEFAULT 'mid',
  content_type content_type DEFAULT 'reader',
  mdx_content TEXT NOT NULL,
  estimated_minutes INTEGER DEFAULT 10,
  ngss_standards TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assignments table
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  classroom_id UUID NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content_ids UUID[] NOT NULL,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progress tracking table
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  classroom_id UUID NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  assignment_id UUID REFERENCES assignments(id) ON DELETE SET NULL,
  status progress_status DEFAULT 'not_started',
  score DECIMAL(5,2), -- Percentage 0-100
  time_spent_seconds INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  UNIQUE(student_id, content_id, classroom_id)
);

-- Function to generate unique 6-character join codes
CREATE OR REPLACE FUNCTION generate_join_code()
RETURNS CHAR(6) AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- Excluding ambiguous chars
  code CHAR(6);
  exists_count INTEGER;
BEGIN
  LOOP
    code := '';
    FOR i IN 1..6 LOOP
      code := code || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;

    SELECT COUNT(*) INTO exists_count FROM classrooms WHERE join_code = code;
    EXIT WHEN exists_count = 0;
  END LOOP;

  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate join code on classroom insert
CREATE OR REPLACE FUNCTION trigger_set_join_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.join_code IS NULL OR NEW.join_code = '' THEN
    NEW.join_code := generate_join_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_classroom_join_code
  BEFORE INSERT ON classrooms
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_join_code();

-- Trigger to update updated_at timestamps
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_content_updated_at
  BEFORE UPDATE ON content
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_updated_at();

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_classrooms_teacher_id ON classrooms(teacher_id);
CREATE INDEX idx_classrooms_join_code ON classrooms(join_code);
CREATE INDEX idx_classroom_students_classroom_id ON classroom_students(classroom_id);
CREATE INDEX idx_classroom_students_student_id ON classroom_students(student_id);
CREATE INDEX idx_content_topic_id ON content(topic_id);
CREATE INDEX idx_content_reading_level ON content(reading_level);
CREATE INDEX idx_progress_student_id ON progress(student_id);
CREATE INDEX idx_progress_classroom_id ON progress(classroom_id);
CREATE INDEX idx_assignments_classroom_id ON assignments(classroom_id);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE classroom_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Schools policies (admins only for now)
CREATE POLICY "Anyone can view schools" ON schools
  FOR SELECT USING (true);

-- Subscriptions policies
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Classrooms policies
CREATE POLICY "Teachers can view own classrooms" ON classrooms
  FOR SELECT USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can create classrooms" ON classrooms
  FOR INSERT WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers can update own classrooms" ON classrooms
  FOR UPDATE USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can delete own classrooms" ON classrooms
  FOR DELETE USING (auth.uid() = teacher_id);

CREATE POLICY "Students can view their classrooms" ON classrooms
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM classroom_students
      WHERE classroom_id = classrooms.id AND student_id = auth.uid()
    )
  );

-- Classroom students policies
CREATE POLICY "Teachers can view their classroom students" ON classroom_students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM classrooms
      WHERE id = classroom_students.classroom_id AND teacher_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can add students to their classrooms" ON classroom_students
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM classrooms
      WHERE id = classroom_students.classroom_id AND teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can view own enrollment" ON classroom_students
  FOR SELECT USING (auth.uid() = student_id);

-- Topics policies (public read)
CREATE POLICY "Anyone can view topics" ON topics
  FOR SELECT USING (true);

-- Content policies (subscribers only)
CREATE POLICY "Authenticated users can view content" ON content
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Assignments policies
CREATE POLICY "Teachers can manage own assignments" ON assignments
  FOR ALL USING (auth.uid() = teacher_id);

CREATE POLICY "Students can view their assignments" ON assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM classroom_students
      WHERE classroom_id = assignments.classroom_id AND student_id = auth.uid()
    )
  );

-- Progress policies
CREATE POLICY "Students can view own progress" ON progress
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can update own progress" ON progress
  FOR UPDATE USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own progress" ON progress
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teachers can view student progress in their classrooms" ON progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM classrooms
      WHERE id = progress.classroom_id AND teacher_id = auth.uid()
    )
  );

-- Insert initial topics
INSERT INTO topics (title, domain, description, icon, "order") VALUES
  ('Ecosystems & Food Webs', 'life_systems', 'Explore how living things connect and energy flows through ecosystems', 'TreePine', 1),
  ('Human Body Systems', 'life_systems', 'Discover how organs work together to keep you alive and healthy', 'Heart', 2),
  ('Economic Systems', 'social_systems', 'Understand how supply, demand, and trade shape our world', 'TrendingUp', 3),
  ('Climate & Carbon Cycle', 'earth_systems', 'Learn how carbon moves through Earth and affects our climate', 'Cloud', 4);
