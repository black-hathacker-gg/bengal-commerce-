-- ==============================================================================
-- BENGAL COMMERCE / BENGALFRESH — SUPABASE POSTGRESQL SCHEMA
-- ==============================================================================
-- Copy and run this script inside your Supabase project's SQL Editor (supabase.com)
-- It will automatically provision the tables, RLS security policies, and initial seed data.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_bn TEXT,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    category_slug TEXT NOT NULL,
    weight TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    old_price NUMERIC(10, 2) NOT NULL,
    rating NUMERIC(2, 1) DEFAULT 4.8,
    reviews INTEGER DEFAULT 0,
    badge_text TEXT,
    discount TEXT,
    points_text TEXT,
    image_url TEXT NOT NULL,
    batch_id TEXT,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. FEFO INVENTORY BATCHES TABLE (Cold-Chain Warehouse & POS)
CREATE TABLE IF NOT EXISTS public.batches (
    batch_id TEXT PRIMARY KEY,
    sku TEXT NOT NULL,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    supplier TEXT NOT NULL,
    expiry_date DATE NOT NULL,
    days_remaining_text TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('safe', 'warning', 'critical')),
    discount_badge TEXT,
    cost_price NUMERIC(10, 2) NOT NULL,
    sell_price NUMERIC(10, 2) NOT NULL,
    stock_qty INTEGER NOT NULL DEFAULT 0,
    reserved_qty INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ORDERS TABLE (Dhaka Express & POS Sales)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    hub TEXT NOT NULL DEFAULT 'Dhanmondi Hub #04',
    payment_method TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'in_transit',
    current_step INTEGER DEFAULT 4,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    author TEXT NOT NULL,
    initials TEXT,
    location TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. DHAKA HUBS TABLE
CREATE TABLE IF NOT EXISTS public.hubs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    temp TEXT NOT NULL DEFAULT '4.2°C',
    status TEXT NOT NULL DEFAULT 'Active'
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hubs ENABLE ROW LEVEL SECURITY;

-- Allow public read of products, hubs, batches, and reviews
CREATE POLICY "Public products viewable by all" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public hubs viewable by all" ON public.hubs FOR SELECT USING (true);
CREATE POLICY "Public batches viewable by all" ON public.batches FOR SELECT USING (true);
CREATE POLICY "Public reviews viewable by all" ON public.reviews FOR SELECT USING (true);

-- Allow public checkout order placement and review submission
CREATE POLICY "Public can insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view own orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public can submit verified reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- Allow POS staff to update/insert batches
CREATE POLICY "Staff can insert batches" ON public.batches FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can update batches" ON public.batches FOR UPDATE USING (true);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================
INSERT INTO public.hubs (id, name, address, temp, status)
VALUES
    ('dhanmondi', 'Dhanmondi Hub #04', 'Road 27, Dhanmondi, Dhaka 1209', '4.2°C', 'Active (Cold Vault Ready)'),
    ('gulshan', 'Gulshan-2 Avenue Hub', 'Avenue Center, Gulshan-2, Dhaka 1212', '3.8°C', 'Active (Express Hub)'),
    ('uttara', 'Uttara Sector 11 Hub', 'Sector 11 Flagship, Uttara 1230', '4.0°C', 'Active (Northern Hub)'),
    ('mirpur', 'Mirpur-10 Express Hub', 'Mirpur-10 Roundabout, Dhaka 1216', '4.5°C', 'Active')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, name_bn, brand, category, category_slug, weight, price, old_price, rating, reviews, badge_text, discount, points_text, image_url, batch_id, in_stock)
VALUES
    ('pran-milk-1l', 'Pran UHT Full Cream Milk 1L', 'প্রাণ ইউএইচটি ফুল ক্রিম দুধ ১ লিটার', 'Pran Dairy Ltd.', 'Dairy & Chilled', 'dairy', '1 Litre', 95.0, 120.0, 4.8, 142, 'Fresh Batch · 184d Expiry', '21% OFF', '+10 Pts', '/src/assets/images/bengal_milk_carton_1792138091407.jpg', 'BNG-2024-089', true),
    ('radhuni-mustard-500ml', 'Radhuni Pure Mustard Oil 500ml', 'রাধুনি খাঁটি সরিষার তেল ৫০০ মি.লি.', 'Square Consumer Products', 'Edible Oils & Ghee', 'oils', '500 ml', 195.0, 210.0, 4.9, 89, '100% Cold Pressed', 'Save ৳ 15', '+20 Pts', '/src/assets/images/bengal_mustard_oil_1792138091764.jpg', 'BNG-2024-094', true),
    ('farm-fresh-eggs-12', 'Farm Fresh Organic Brown Eggs (12 pcs)', 'ফার্ম ফ্রেশ অর্গানিক ডিম (১২টি)', 'CP Bangladesh Farm', 'Dairy & Chilled', 'dairy', '1 Dozen (12 Eggs)', 155.0, 175.0, 4.8, 260, 'Daily Morning Harvest', '12% OFF', '+15 Pts', '/src/assets/images/bengal_organic_eggs_1792138091131.jpg', 'BNG-2024-130', true),
    ('ispahani-tea-100s', 'Ispahani Mirzapore Tea Bags 100s', 'ইস্পাহানি মির্জাপুর টি ব্যাগ ১০০টি', 'M. M. Ispahani Ltd.', 'Tea & Beverages', 'tea', '200g (100 Bags)', 285.0, 310.0, 4.9, 204, 'Fresh Sreemangal Blend', 'Fresh Blend', '+25 Pts', '/src/assets/images/bengal_darjeeling_tea_1792138092609.jpg', 'BNG-2024-118', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.batches (batch_id, sku, product_name, category, location, supplier, expiry_date, days_remaining_text, status, discount_badge, cost_price, sell_price, stock_qty, reserved_qty)
VALUES
    ('BNG-2024-089', 'PRN-MLK-01', 'Pran UHT Full Cream Milk 1L', 'Dairy & Chilled / Cold Vault A2', 'Dhanmondi Vault', 'Pran Dairy Ltd', '2026-10-12', '184 days left', 'safe', 'FEFO Queue #1', 78.0, 95.0, 42, 6),
    ('BNG-2024-094', 'RDH-MST-50', 'Radhuni Pure Mustard Oil 500ml', 'Edible Oil / Shelf 4A', 'Aisle 4', 'Square Consumer', '2026-11-28', '228 days left', 'safe', 'FEFO Queue #2', 165.0, 195.0, 140, 12),
    ('BNG-2024-130', 'CP-EGG-12', 'Farm Fresh Organic Brown Eggs 12s', 'Dairy & Chilled / Cold Vault B1', 'Chilled Section', 'CP Bangladesh Farm', '2025-04-18', '7 days left (Urgent FEFO)', 'critical', 'Flash Clearance 25% Off', 130.0, 155.0, 28, 2)
ON CONFLICT (batch_id) DO NOTHING;
