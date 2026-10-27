-- Run in Supabase dashboard → SQL Editor
create table joshab_bookings (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  date text not null,
  service text not null,
  notes text,
  created_at timestamp with time zone default now()
);

-- Patient data: keep the table closed to the public anon key.
-- The API route writes with the service role key, which bypasses RLS.
alter table joshab_bookings enable row level security;
