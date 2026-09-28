-- CHHABILAL CARDS DIGITAL BUSINESS PLATFORM DATABASE SCHEMA (POSTGRESQL / SUPABASE)

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'CUSTOMER', -- 'CUSTOMER', 'ADMIN', 'SUPER_ADMIN'
  business_name TEXT,
  gst_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  homepage_visible BOOLEAN DEFAULT TRUE,
  nav_visible BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  code TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL REFERENCES categories(slug),
  sub_category TEXT,
  theme TEXT,
  price_per_piece NUMERIC(10, 2) NOT NULL,
  min_order_quantity INT DEFAULT 100,
  discount_tiers JSONB,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  reviews_count INT DEFAULT 0,
  tags TEXT[],
  paper_type TEXT,
  gsm INT,
  dimensions TEXT,
  included_inserts INT,
  features TEXT[],
  is_best_seller BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  description TEXT,
  short_description TEXT,
  sample_available BOOLEAN DEFAULT TRUE,
  colors_available TEXT[],
  image_url TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  homepage_visible BOOLEAN DEFAULT TRUE,
  enquiry_enabled BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  business_name TEXT,
  gst_number TEXT,
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount_amount NUMERIC(10, 2) DEFAULT 0,
  estimated_tax NUMERIC(10, 2) DEFAULT 0,
  grand_total NUMERIC(10, 2) NOT NULL,
  order_status TEXT DEFAULT 'PENDING',
  payment_status TEXT DEFAULT 'PENDING',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ENQUIRIES CRM TABLE
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  enquiry_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  business_name TEXT,
  product_id TEXT,
  product_name TEXT,
  quantity INT DEFAULT 100,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'NEW',
  follow_up_date DATE,
  follow_up_notes TEXT,
  source TEXT DEFAULT 'WEBSITE_FORM',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. PROMOTIONS TABLE
CREATE TABLE IF NOT EXISTS promotions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  discount_value NUMERIC(10, 2) DEFAULT 0,
  category_slug TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  placement TEXT DEFAULT 'HERO',
  active BOOLEAN DEFAULT TRUE,
  priority INT DEFAULT 1,
  banner_text TEXT,
  cta_link TEXT
);

-- 7. WEBSITE SECTIONS CMS TABLE
CREATE TABLE IF NOT EXISTS website_sections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0
);

-- 8. BUSINESS SETTINGS TABLE
CREATE TABLE IF NOT EXISTS business_settings (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  business_name TEXT NOT NULL,
  legal_name TEXT,
  phone1 TEXT NOT NULL,
  phone2 TEXT,
  whatsapp_number TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  landmark TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  gst_number TEXT,
  hours TEXT,
  owner_email TEXT NOT NULL
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
