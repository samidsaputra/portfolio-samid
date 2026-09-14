-- ==========================================
-- 1. DROP EXISTING TABLES (Hanya jika perlu mengulang)
-- Hapus tanda komen (--) jika Anda ingin me-reset database dari awal
-- DROP TABLE IF EXISTS project_tech_stacks CASCADE;
-- DROP TABLE IF EXISTS tech_stacks CASCADE;
-- DROP TABLE IF EXISTS projects CASCADE;
-- DROP TABLE IF EXISTS experiences CASCADE;
-- DROP TABLE IF EXISTS profile CASCADE;
-- ==========================================

-- ==========================================
-- 2. CREATE TABLES
-- ==========================================

-- PROFILE TABLE (Single Row)
CREATE TABLE profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    tagline TEXT,
    about_text TEXT,
    photo_url TEXT,
    cv_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- PROJECTS TABLE
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    thumbnail_url TEXT,
    demo_url TEXT,
    github_url TEXT,
    ambient_color TEXT DEFAULT '#52525B', -- Default to Zinc 600
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TECH STACKS TABLE
CREATE TABLE tech_stacks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    icon_slug TEXT,
    category TEXT, -- 'frontend', 'backend', 'database', 'tools'
    display_order INTEGER DEFAULT 0
);

-- PROJECT_TECH_STACKS (Junction Table)
CREATE TABLE project_tech_stacks (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tech_stack_id INTEGER REFERENCES tech_stacks(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tech_stack_id)
);

-- EXPERIENCES TABLE
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL,
    institution TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- ==========================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tech_stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;


-- ==========================================
-- 4. CREATE RLS POLICIES
-- ==========================================

-- Policy: Publik boleh READ (SELECT) semua data
CREATE POLICY "Public profiles are viewable by everyone." ON profile FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone." ON projects FOR SELECT USING (true);
CREATE POLICY "Public tech_stacks are viewable by everyone." ON tech_stacks FOR SELECT USING (true);
CREATE POLICY "Public project_tech_stacks are viewable by everyone." ON project_tech_stacks FOR SELECT USING (true);
CREATE POLICY "Public experiences are viewable by everyone." ON experiences FOR SELECT USING (true);

-- Policy: Hanya user yang terautentikasi yang boleh INSERT/UPDATE/DELETE
-- Profile
CREATE POLICY "Authenticated users can insert profile" ON profile FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update profile" ON profile FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete profile" ON profile FOR DELETE USING (auth.role() = 'authenticated');

-- Projects
CREATE POLICY "Authenticated users can insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

-- Tech Stacks
CREATE POLICY "Authenticated users can insert tech_stacks" ON tech_stacks FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update tech_stacks" ON tech_stacks FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete tech_stacks" ON tech_stacks FOR DELETE USING (auth.role() = 'authenticated');

-- Project Tech Stacks
CREATE POLICY "Authenticated users can insert project_tech_stacks" ON project_tech_stacks FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update project_tech_stacks" ON project_tech_stacks FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete project_tech_stacks" ON project_tech_stacks FOR DELETE USING (auth.role() = 'authenticated');

-- Experiences
CREATE POLICY "Authenticated users can insert experiences" ON experiences FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update experiences" ON experiences FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete experiences" ON experiences FOR DELETE USING (auth.role() = 'authenticated');


-- ==========================================
-- 5. CREATE STORAGE BUCKET (Jika belum ada)
-- ==========================================

-- Insert bucket for project thumbnails (Ignore error if it already exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-thumbnails', 'project-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'project-thumbnails'
-- Public read access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'project-thumbnails');
-- Authenticated upload access
CREATE POLICY "Auth Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-thumbnails' AND auth.role() = 'authenticated');
-- Authenticated update access
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING (bucket_id = 'project-thumbnails' AND auth.role() = 'authenticated');
-- Authenticated delete access
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING (bucket_id = 'project-thumbnails' AND auth.role() = 'authenticated');
