-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Tables
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  tagline TEXT,
  about_text TEXT,
  photo_url TEXT,
  cv_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT NOT NULL,
  institution TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,  -- NULL means "Present"
  description TEXT,
  display_order INT DEFAULT 0
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  category TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE tech_stacks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  icon_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('frontend','backend','database','tools')),
  display_order INT DEFAULT 0
);

CREATE TABLE project_tech_stacks (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  tech_stack_id UUID REFERENCES tech_stacks(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, tech_stack_id)
);

CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE NOT NULL,
  certificate_url TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0
);

-- 2. Insert Dummy Profile (So you don't get empty data errors initially)
INSERT INTO profile (full_name, tagline, about_text, email, linkedin_url, github_url)
VALUES (
  'Samid Saputra', 
  'Membangun sistem yang presisi, bukan sekadar jalan.', 
  'A software engineer with a passion for turning ideas into intuitive, user-first experiences.',
  'hello@samidsaputra.com',
  'https://linkedin.com/in/samidsaputra',
  'https://github.com/samidsaputra'
);

-- 3. Set Up Row Level Security (RLS)
-- We want EVERYONE to be able to READ data (for the landing page)
-- But ONLY Authenticated users (You) can INSERT, UPDATE, or DELETE (for the Admin page)

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Auth Write Profile" ON profile FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Auth Write Experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Auth Write Projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE tech_stacks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read TechStacks" ON tech_stacks FOR SELECT USING (true);
CREATE POLICY "Auth Write TechStacks" ON tech_stacks FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE project_tech_stacks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read ProjectTechStacks" ON project_tech_stacks FOR SELECT USING (true);
CREATE POLICY "Auth Write ProjectTechStacks" ON project_tech_stacks FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Auth Write Certificates" ON certificates FOR ALL USING (auth.role() = 'authenticated');

-- 4. Create Storage Buckets (Optional, can also be done via UI)
-- Uncomment these if you want to create buckets via SQL instead of the Supabase UI
-- INSERT INTO storage.buckets (id, name, public) VALUES ('profile-assets', 'profile-assets', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-thumbnails', 'project-thumbnails', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('certificates', 'certificates', true);
