-- MAVRIC Watches E-Commerce Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS mavric_watches CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mavric_watches;

-- 1. TABLE: users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. TABLE: brands
CREATE TABLE brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABLE: products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2) NOT NULL,
    discount_percentage INT DEFAULT 0,
    image_url VARCHAR(255),
    stock_quantity INT DEFAULT 0,
    brand_id INT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL
);

-- 4. TABLE: sliders
CREATE TABLE sliders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    title VARCHAR(200),
    description TEXT,
    link VARCHAR(255),
    order_position INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABLE: orders
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(100),
    delivery_address TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Cash on Delivery',
    status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. TABLE: order_items
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- 7. TABLE: cart (optional for registered users)
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@mavric.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample brands
INSERT INTO brands (name, logo_url, is_active) VALUES
('ROLEX', '/uploads/brands/rolex.png', true),
('OMEGA', '/uploads/brands/omega.png', true),
('PATEK PHILIPPE', '/uploads/brands/patek.png', true),
('TAG HEUER', '/uploads/brands/tag.png', true);

-- Insert sample products
INSERT INTO products (name, description, price, original_price, discount_percentage, image_url, stock_quantity, brand_id, is_active) VALUES
('Rolex Submariner', 'Iconic diving watch with oystersteel case', 850000.00, 950000.00, 10, '/uploads/products/rolex-submariner.jpg', 5, 1, true),
('Omega Speedmaster', 'The first watch on the moon', 650000.00, 720000.00, 10, '/uploads/products/omega-speedmaster.jpg', 8, 2, true),
('Patek Philippe Nautilus', 'Luxury sports watch', 3500000.00, 3800000.00, 8, '/uploads/products/patek-nautilus.jpg', 2, 3, true),
('TAG Heuer Carrera', 'Classic racing chronograph', 280000.00, 320000.00, 12, '/uploads/products/tag-carrera.jpg', 12, 4, true);

-- Insert sample sliders
INSERT INTO sliders (image_url, title, description, link, order_position, is_active) VALUES
('/uploads/sliders/slider1.jpg', 'Premium Collection', 'Discover our exclusive watch collection', '/products', 1, true),
('/uploads/sliders/slider2.jpg', 'Luxury Watches', 'Timeless elegance for every occasion', '/products', 2, true);
