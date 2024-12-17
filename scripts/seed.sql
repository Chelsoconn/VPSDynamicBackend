DROP TABLE IF EXISTS user_email CASCADE;
DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,          
    name VARCHAR(30) NOT NULL,      
    age INTEGER NOT NULL             
);


CREATE TABLE user_email (
    id SERIAL PRIMARY KEY,          
    user_id INTEGER,                 
    email VARCHAR(50) NOT NULL,      
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);

INSERT INTO users (name, age) VALUES 
    ('Alice Johnson', 30),
    ('Bob Smith', 25),
    ('Charlie Brown', 40),
    ('Dana White', 35),
    ('Eva Green', 28);

INSERT INTO user_email (user_id, email) VALUES 
    (1, 'alice.johnson@example.com'),
    (2, 'bob.smith@example.com'),
    (3, 'charlie.brown@example.com'),
    (4, 'dana.white@example.com'),
    (5, 'eva.green@example.com');

