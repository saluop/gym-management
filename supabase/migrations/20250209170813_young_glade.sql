/*
  # Initial Schema for Gym Management App

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `email` (text)
      - `full_name` (text)
      - `created_at` (timestamp)
      - `membership_type` (text)
    
    - `exercises`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `difficulty` (text)
      - `target_muscle` (text)
      
    - `member_exercises`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, foreign key)
      - `exercise_id` (uuid, foreign key)
      - `sets` (integer)
      - `reps` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  membership_type text DEFAULT 'basic'
);

-- Create exercises table
CREATE TABLE exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  difficulty text CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  target_muscle text NOT NULL
);

-- Create member_exercises table
CREATE TABLE member_exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  exercise_id uuid REFERENCES exercises(id) ON DELETE CASCADE,
  sets integer DEFAULT 3,
  reps integer DEFAULT 10,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_exercises ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Exercises policies
CREATE POLICY "Exercises are viewable by authenticated users"
  ON exercises FOR SELECT
  TO authenticated
  USING (true);

-- Member exercises policies
CREATE POLICY "Users can view own exercises"
  ON member_exercises FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can insert own exercises"
  ON member_exercises FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- Insert some default exercises
INSERT INTO exercises (name, description, difficulty, target_muscle) VALUES
  ('Push-ups', 'Basic push-up movement', 'beginner', 'chest'),
  ('Pull-ups', 'Basic pull-up movement', 'intermediate', 'back'),
  ('Squats', 'Basic squat movement', 'beginner', 'legs'),
  ('Deadlifts', 'Basic deadlift movement', 'intermediate', 'back'),
  ('Bench Press', 'Basic bench press movement', 'intermediate', 'chest');