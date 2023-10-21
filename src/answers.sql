
-- PROBLEM 1 
cupcakes=# SELECT * FROM customers ORDER BY email DESC;

-- PROBLEM 2
SELECT id FROM orders WHERE customer_id IN(SELECT id FROM customers WHERE fname = 'Elizabeth' AND lname = 'Crocker');


-- PROBLEM 3
SELECT SUM(num_cupcakes) AS sum FROM orders WHERE processed = "f"
-- REMEBER THE SINGLE QUOTES


-- PROBLEM 4
SELECT cupcakes.name, 
SUM(CASE WHEN orders.num_cupcakes IS NULL THEN 0 ELSE orders.num_cupcakes END) AS sum
FROM cupcakes
LEFT JOIN orders ON cupcakes.id = orders.cupcake_id
GROUP BY cupcakes.name
ORDER BY cupcakes.name;


-- PROBLEM 5

SELECT
    customers.email,
    SUM(orders.num_cupcakes) AS total
FROM
    customers
JOIN
    orders ON customers.id = orders.customer_id
WHERE
    orders.processed = 't'
GROUP BY
    customers.email
ORDER BY
    total DESC;

-- PROBLEM 6
SELECT DISTINCT
    customers.fname AS first_name,
    customers.lname AS last_name,
    customers.email
FROM
    customers
JOIN
    orders ON customers.id = orders.customer_id
JOIN
    cupcakes ON orders.cupcake_id = cupcakes.id
WHERE
    orders.processed = 't'
    AND cupcakes.name = 'funfetti';