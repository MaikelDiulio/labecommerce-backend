-- Active: 1673882176043@@127.0.0.1@3306

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

 DROP TABLE users;
    
CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );
 DROP TABLE products;

 PRAGMA table_info ("users");

 PRAGMA table_info ("products");


INSERT INTO
    users (id, name, email, password)
VALUES
(
        "a001",
        "Fulano",
        "fulano@gmail.com",
        "321fulano"

    ), (
        "a002",
        "Ciclano",
        "ciclano@gmai.com",
        "cilcano123"
    ), (
        "a003",
        "Beltrano",
        "beltrano@gmail.com",
        "beltrano123"
    );


INSERT INTO
    products (id, name, price, description, image_url)
VALUES 
(
        "b001",
        "bolo de fuba",
        8.00,
        'food',
        "http://lorempixel.com.br/500/400/?1"

    ), (
        "b002",
        "bolo de milho",
        6.79,
        'food',
        "http://lorempixel.com.br/500/400/?1"
    ), (
        "b003",
        "bolo de mandioca",
        7.80,
        'food',
        "http://lorempixel.com.br/500/400/?1"

    );



SELECT *
FROM users;

SELECT *
FROM products;

SELECT *
FROM purchases;

-- Pesquisar produto por nome

-- mocke um termo de busca, por exemplo "monitor"
SELECT * FROM products WHERE name = 'bolo de fuba';
-- retorna o resultado baseado no termo de busca


-- Criar usuário

-- mocke um novo usuário
INSERT INTO
    users (id, email, password)
VALUES 
(
    "a004",
    "petrolina@gmail.com",
    "40028922"
);
-- insere o item mockado na tabela users

-- Create Product

-- mocke um novo produto
INSERT INTO
    products (id, name, price, category)
VALUES 
(
        "b004",
        "bolo de chocolate",
        10.00,
        'food'

    );
-- insere o item mockado na tabela products


-- Get Products by id
-- mocke uma id
-- busca baseada no valor mockado
SELECT * FROM products WHERE id = 'boo4';


-- Delete User by id
-- mocke uma id
-- delete a linha baseada no valor mockado
DELETE * FROM users WHERE id = "a004";

-- Delete Product by id
DELETE * FROM products WHERE id = "b004";


-- Edit User by id
-- mocke valores para editar um user
-- edite a linha baseada nos valores mockados
UPDATE users SET password = "555555" 
WHERE id = "a001";

-- Edit Product by id
-- mocke valores para editar um product
-- edite a linha baseada nos valores mockados
UPDATE products SET price = "7.00" 
WHERE id = "b002";

-- Get All Users
-- retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

-- Get All Products versão 1
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item

SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 1;

-- Get All Products versão 2
-- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo mockado em ordem crescente

SELECT * FROM products
WHERE price > 5 AND price < 10 
ORDER BY price ASC;


-- Criação da tabela de pedidos
-- nome da tabela: purchases
-- colunas da tabela:
-- id (TEXT, PK, único e obrigatório)
-- total_price (REAL e obrigatório)
-- paid (INTEGER e obrigatório)
-- delivered_at (TEXT e opcional)
-- buyer_id (TEXT, obrigatório e FK = referencia a coluna id da tabela users)
 CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT (DATETIME()) ,
    paid INTEGER DEFAULT (0) NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users (id)
 );

 DROP TABLE purchases;


--  Popule sua tabela de pedidos, criada no exercício anterior.
-- Por enquanto não se preocupe em adicionar produtos ao pedido, veremos isso na aula que vem.
-- Com isso em mente, crie um valor aleatório para o preço total do pedido.


-- a) Crie dois pedidos para cada usuário cadastrado
-- No mínimo 4 no total (ou seja, pelo menos 2 usuários diferentes) e devem iniciar com a data de entrega nula.

INSERT INTO purchases(id, buyer, total_price)
VALUES
('c01', 'a001', 8),
('c02', 'a002', 6.79),
('c03', 'a003',7.80),
('c04', 'a001', 8); 


SELECT * FROM purchases;

-- Crie a query de consulta utilizando junção para simular um endpoint de histórico de compras de um determinado usuário.
-- Mocke um valor para a id do comprador, ela deve ser uma das que foram utilizadas no exercício 2.

UPDATE purchases SET delivered_at = DATETIME('now')
WHERE id = 'c06'; 

SELECT * FROM users
INNER JOIN purchases
ON users.id = buyer_id
WHERE users.id = 'a03';



-- Criação da tabela de relações
-- nome da tabela: purchases_products
-- colunas da tabela:
-- purchase_id (TEXT e obrigatório, não deve ser único)
-- product_id (TEXT e obrigatório, não deve ser único)
-- quantity (INTEGER e obrigatório, não deve ser único)

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULl,
    FOREIGN KEY (product_id) REFERENCES products (id)
    FOREIGN KEY (purchase_id) REFERENCES purchases (id)

);

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
('c01', 'b001', 1),
('c02', 'b003', 1),
('c03', 'b001', 1),
('c04', 'b002', 1);

 DROP TABLE purchases_products;

SELECT
    purchases_products.product_id AS productId,
    purchases_products.purchase_id AS purchaseId,
    purchases_products.quantity,
    purchases.total_price,
    products.name
FROM purchases_products
RIGHT JOIN products
ON purchases_products.product_id = products.id
LEFT JOIN purchases
ON purchases_products.purchase_id = purchases.id;   


SELECT
    products.name,
    purchases_products.product_id AS productId,
    purchases_products.purchase_id AS purchaseId,
    purchases_products.quantity,
    purchases.total_price
FROM purchases_products
INNER JOIN products
ON purchases_products.product_id = products.id
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id;

 