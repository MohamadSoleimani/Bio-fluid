-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  main_image TEXT,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  status TEXT CHECK (status IN ('completed', 'in-progress', 'planned')) DEFAULT 'planned',
  start_date TEXT NOT NULL,
  end_date TEXT,
  collaborators TEXT[] DEFAULT '{}',
  publications TEXT[] DEFAULT '{}',
  github TEXT,
  demo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact submissions
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can read contact submissions (for admin)
CREATE POLICY "Only authenticated users can read contact submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create RLS policies for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read projects
CREATE POLICY "Anyone can read projects" ON projects
  FOR SELECT USING (true);

-- Only authenticated users can insert/update/delete projects (for admin)
CREATE POLICY "Only authenticated users can modify projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for projects table
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
