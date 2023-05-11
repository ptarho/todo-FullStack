CREATE DATABASE todoapp;

CREATE TABLE todos (
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255),
  title VARCHAR(30),
  progress INT,
  date VARCHAR(300)
);

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  hashed_password VARCHAR(255)
);

INSERT INTO todos(id, user_email, title, progress, date)
VALUES('0', 'email@test.com', 'First todo', 10, 'Tue Mar 14 2023 12:10:51 GMT+0200 (Восточная Европа, стандартное время)');

SELECT * FROM todos;

DELETE FROM todos WHERE id='0';
