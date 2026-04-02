-- ============================================================
--  Imperial Time — Full Database Setup
--  Run this file once to set up everything from scratch
--  Usage: mysql -u root -pSam@2003 < database.sql
-- ============================================================

-- 1. Create & select database
CREATE DATABASE IF NOT EXISTS imperialdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'imperialuser'@'localhost' IDENTIFIED BY 'Sam@2003';
GRANT ALL PRIVILEGES ON imperialdb.* TO 'imperialuser'@'localhost';
FLUSH PRIVILEGES;

USE imperialdb;

-- ============================================================
--  TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    email      VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name  VARCHAR(100) NOT NULL,
    phone      VARCHAR(20),
    address    VARCHAR(500),
    role       VARCHAR(50) DEFAULT 'USER',
    created_at BIGINT
);

CREATE TABLE IF NOT EXISTS admins (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    email        VARCHAR(255) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    first_name   VARCHAR(100),
    last_name    VARCHAR(100),
    phone_number VARCHAR(20),
    role         VARCHAR(50) DEFAULT 'ADMIN',
    active       BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS watches (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    sku         VARCHAR(100) UNIQUE,
    description TEXT,
    price       DECIMAL(10,2) NOT NULL,
    brand       VARCHAR(100),
    model       VARCHAR(100),
    color       VARCHAR(50),
    material    VARCHAR(100),
    movement    VARCHAR(100),
    warranty    INT DEFAULT 5,
    stock       INT DEFAULT 0,
    rating      DOUBLE DEFAULT 4.5,
    reviews     INT DEFAULT 0,
    image_url   VARCHAR(500),
    active      BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS orders (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id      BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status       VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    address      VARCHAR(500),
    phone        VARCHAR(20),
    payment_method VARCHAR(50),
    created_at   BIGINT NOT NULL,
    updated_at   BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items (
    id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id  BIGINT NOT NULL,
    watch_id  BIGINT NOT NULL,
    quantity  INT NOT NULL,
    price     DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (watch_id) REFERENCES watches(id)
);

-- ============================================================
--  SEED DATA — Admin
-- ============================================================
-- Password is BCrypt hash of: Sam@2003
INSERT IGNORE INTO admins (email, password, first_name, last_name, phone_number, role, active)
VALUES ('samarthkarale21@gmail.com',
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPkRHMmxVum',
        'Samarth', 'Karale', '+91-9000000000', 'ADMIN', TRUE);

-- ============================================================
--  SEED DATA — Watches
-- ============================================================
INSERT IGNORE INTO watches (name, sku, description, price, brand, model, color, material, movement, warranty, stock, rating, reviews, image_url, active) VALUES
('Rolex Submariner',          'RLX-SUB-001', 'Luxury timepiece from Rolex - Submariner',           48000, 'Rolex',           'Submariner',    'Black',  'Oyster Steel',    'Automatic',    5, 5, 4.5, 10, '/images/watch1.png',  TRUE),
('Rolex Daytona',             'RLX-DAY-002', 'Luxury timepiece from Rolex - Daytona',              46000, 'Rolex',           'Daytona',       'Silver', 'Oyster Steel',    'Automatic',    5, 3, 4.5, 10, '/images/watch2.png',  TRUE),
('Rolex Datejust',            'RLX-DAT-003', 'Luxury timepiece from Rolex - Datejust',             42000, 'Rolex',           'Datejust',      'Gold',   'Yellow Gold',     'Automatic',    5, 4, 4.5, 10, '/images/watch3.png',  TRUE),
('Omega Seamaster',           'OMG-SEA-001', 'Luxury timepiece from Omega - Seamaster',            38000, 'Omega',           'Seamaster',     'Blue',   'Stainless Steel', 'Automatic',    5, 6, 4.5, 10, '/images/watch4.png',  TRUE),
('Omega Speedmaster',         'OMG-SPD-002', 'Luxury timepiece from Omega - Speedmaster',          44000, 'Omega',           'Speedmaster',   'Silver', 'Stainless Steel', 'Manual',       5, 4, 4.5, 10, '/images/watch5.png',  TRUE),
('TAG Heuer Monaco',          'TAG-MON-001', 'Luxury timepiece from TAG Heuer - Monaco',           35000, 'TAG Heuer',       'Monaco',        'Blue',   'Titanium',        'Automatic',    5, 2, 4.5, 10, '/images/watch6.png',  TRUE),
('Patek Philippe Aquanaut',   'PTE-AQU-001', 'Luxury timepiece from Patek Philippe - Aquanaut',   49000, 'Patek Philippe',  'Aquanaut',      'Black',  'Rubber',          'Automatic',    5, 1, 4.5, 10, '/images/watch7.png',  TRUE),
('Patek Philippe Nautilus',   'PTE-NAU-002', 'Luxury timepiece from Patek Philippe - Nautilus',   47500, 'Patek Philippe',  'Nautilus',      'Blue',   'Stainless Steel', 'Automatic',    5, 1, 4.5, 10, '/images/watch8.png',  TRUE),
('Audemars Piguet Royal Oak', 'AP-ROY-001',  'Luxury timepiece from Audemars Piguet - Royal Oak', 45000, 'Audemars Piguet', 'Royal Oak',     'Silver', 'Stainless Steel', 'Automatic',    5, 1, 4.5, 10, '/images/watch9.png',  TRUE),
('IWC Portugieser',           'IWC-PRT-001', 'Luxury timepiece from IWC - Portugieser',           39000, 'IWC',             'Portugieser',   'Silver', 'Stainless Steel', 'Automatic',    5, 3, 4.5, 10, '/images/watch10.png', TRUE),
('Cartier Ballon Bleu',       'CRT-BLB-001', 'Luxury timepiece from Cartier - Ballon Bleu',       33000, 'Cartier',         'Ballon Bleu',   'Silver', 'Stainless Steel', 'Automatic',    5, 5, 4.5, 10, '/images/watch11.png', TRUE),
('Longines HydroConquest',    'LNG-HYD-001', 'Luxury timepiece from Longines - HydroConquest',    22000, 'Longines',        'HydroConquest', 'Black',  'Ceramic',         'Automatic',    5, 8, 4.5, 10, '/images/watch12.png', TRUE),
('Tudor Black Bay',           'TDT-BKB-001', 'Luxury timepiece from Tudor - Black Bay',           27000, 'Tudor',           'Black Bay',     'Black',  'Stainless Steel', 'Automatic',    5, 4, 4.5, 10, '/images/watch13.png', TRUE),
('Zenith Chronomaster',       'ZEN-CHR-001', 'Luxury timepiece from Zenith - Chronomaster',       31000, 'Zenith',          'Chronomaster',  'Silver', 'Stainless Steel', 'Automatic',    5, 2, 4.5, 10, '/images/watch14.png', TRUE),
('Breitling Navitimer',       'BRG-NAV-001', 'Luxury timepiece from Breitling - Navitimer',       36500, 'Breitling',       'Navitimer',     'Black',  'Stainless Steel', 'Automatic',    5, 3, 4.5, 10, '/images/watch15.png', TRUE),
('Grand Seiko Spring Drive',  'GSG-SPR-001', 'Luxury timepiece from Grand Seiko - Spring Drive',  43000, 'Grand Seiko',     'Spring Drive',  'Silver', 'Titanium',        'Spring Drive', 5, 2, 4.5, 10, '/images/watch16.png', TRUE);

-- ============================================================
--  DONE
-- ============================================================
SELECT 'Imperial Time database setup complete!' AS status;
SELECT COUNT(*) AS total_watches FROM watches;
