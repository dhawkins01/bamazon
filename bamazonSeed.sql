DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quanity INT,
    PRIMARY KEY (item_id)
)

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Bluetooth Speaker", "Electronics", 24.99, 100)

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Laptop", "Electronics", 800.00, 15)

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Samsung Galaxy S10", "Phones", 899.99, 25)

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Picture Frame", "Home Goods", 9.99, 50)

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Dodge Dakota", "Automobiles", 10000.45, 5)

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Pen", "Office Supplies", 1.99, 940)
