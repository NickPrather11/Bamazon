CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL auto_increment,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INT(10),
    PRIMARY KEY(item_id)
);

SELECT * FROM products;

-- Populate table with initial items --

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
    ("Telefunken M60 SDC Omni Pair", "Pro-Audio", 1000, 4),
    ("Moog Sub37", "Synthesizers", 1200, 9),
    ("Fender 1968 Mint Green Stratocaster Double-Coil Bridge Pickup ", "Guitars", 2850, 1),
    ("Frank Zappa & The Mothers - Live at the Filmore 1971", "Vinyl", 14, 6),
    ("Frank Zappa & The Mothers of Invention - We're Only In It For The Money", "Vinyl", 18, 3),
    ("Frank Zappa & The Mothers of Invention - Burnt Weeny Sandwich", "Vinyl", 12, 2),
    ("Frank Zappa - Lumpy Gravy", "Vinyl", 20, 2),
    ("API 2500 Audio Compressor", "Pro-Audio", 800, 5),
    ("a pair of shoes", "Clothing", 2400, 1),
    ("Rainbow Trout", "Live Animals", 20, 500);