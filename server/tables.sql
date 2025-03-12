USE ecommerce;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS product_category;

CREATE TABLE product_category(
    category_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    category_type VARCHAR(255),
    category_description VARCHAR(500)
);

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    imageUrl VARCHAR(255),
    category INT,
    FOREIGN KEY (category) REFERENCES product_category(category_id)
);