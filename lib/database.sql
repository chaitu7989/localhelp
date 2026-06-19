-- =============================================
-- LocalHelp Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. PROFILES (customers + providers + admin)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  phone text unique not null,
  role text not null default 'customer', -- 'customer' | 'provider' | 'admin'
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- 2. PROVIDERS (extra details for service providers)
create table providers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade unique not null,
  category text not null,
  area text not null,
  experience text,
  price_range text,
  description text,
  rating decimal(2,1) default 0,
  total_reviews int default 0,
  available boolean default true,
  approved boolean default false,
  upi_id text,
  created_at timestamp with time zone default now()
);

-- 3. BOOKINGS (every service booking)
create table bookings (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references profiles(id) not null,
  provider_id uuid references providers(id) not null,
  category text not null,
  problem_description text not null,
  scheduled_date date not null,
  scheduled_time time not null,
  address text not null,
  latitude decimal(10,8),
  longitude decimal(11,8),
  status text default 'pending',
  -- pending | accepted | on_the_way | arrived | in_progress | completed | cancelled
  amount decimal(10,2),
  commission decimal(10,2),
  payment_status text default 'unpaid',
  -- unpaid | paid | released | refunded
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 4. REVIEWS (customer ratings after job done)
create table reviews (
  id uuid default gen_random_uuid() primary key,
  booking_id uuid references bookings(id) unique not null,
  customer_id uuid references profiles(id) not null,
  provider_id uuid references providers(id) not null,
  rating int check (rating between 1 and 5) not null,
  comment text,
  created_at timestamp with time zone default now()
);

-- 5. PROVIDER LOCATIONS (real-time tracking)
create table provider_locations (
  id uuid default gen_random_uuid() primary key,
  provider_id uuid references providers(id) unique not null,
  latitude decimal(10,8) not null,
  longitude decimal(11,8) not null,
  updated_at timestamp with time zone default now()
);

-- 6. NOTIFICATIONS
create table notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) not null,
  title text not null,
  message text not null,
  type text, -- 'booking' | 'payment' | 'review' | 'system'
  read boolean default false,
  created_at timestamp with time zone default now()
);

-- =============================================
-- SECURITY: Row Level Security (RLS)
-- =============================================

alter table profiles enable row level security;
alter table providers enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;
alter table provider_locations enable row level security;
alter table notifications enable row level security;

-- Profiles: users can read all, only update own
create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- Providers: everyone can view approved providers
create policy "Anyone can view approved providers"
  on providers for select using (approved = true);

create policy "Providers can update own profile"
  on providers for update using (auth.uid() = user_id);

create policy "Providers can insert own profile"
  on providers for insert with check (auth.uid() = user_id);

-- Bookings: customers see own, providers see assigned
create policy "Customers can view own bookings"
  on bookings for select using (auth.uid() = customer_id);

create policy "Providers can view assigned bookings"
  on bookings for select using (
    auth.uid() = (select user_id from providers where id = provider_id)
  );

create policy "Customers can create bookings"
  on bookings for insert with check (auth.uid() = customer_id);

create policy "Providers and customers can update booking status"
  on bookings for update using (
    auth.uid() = customer_id or
    auth.uid() = (select user_id from providers where id = provider_id)
  );

-- Reviews: everyone can read
create policy "Reviews are public"
  on reviews for select using (true);

create policy "Customers can write reviews"
  on reviews for insert with check (auth.uid() = customer_id);

-- Provider locations: everyone can view (for tracking)
create policy "Anyone can view provider locations"
  on provider_locations for select using (true);

create policy "Providers can update own location"
  on provider_locations for update using (
    auth.uid() = (select user_id from providers where id = provider_id)
  );

create policy "Providers can insert own location"
  on provider_locations for insert with check (
    auth.uid() = (select user_id from providers where id = provider_id)
  );

-- Notifications: users see own only
create policy "Users see own notifications"
  on notifications for select using (auth.uid() = user_id);

-- =============================================
-- Enable Realtime for live tracking
-- =============================================
alter publication supabase_realtime add table provider_locations;
alter publication supabase_realtime add table bookings;
alter publication supabase_realtime add table notifications;
