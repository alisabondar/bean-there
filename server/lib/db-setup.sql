-- UNCOMMENT TO RESTART DATABASE;
DROP DATABASE beanthere;

-- Create the 'beanthere' database if it doesn't exist
CREATE DATABASE beanthere;

-- Connect to the 'beanthere' database
\c beanthere

-- Drop tables if they exist
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS reviews_photos CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS wishlists CASCADE;
DROP TABLE IF EXISTS friends CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS chat_members CASCADE;
DROP TABLE IF EXISTS chat_rooms CASCADE;

-- Create the 'users' table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(200) UNIQUE NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  photo TEXT,
  banner_photo TEXT,
  about TEXT DEFAULT 'Hi there! I''m a coffee lover who enjoys savoring each cup to the fullest.',
  private BOOLEAN NOT NULL DEFAULT false
);

-- Create the 'locations' table
CREATE TABLE locations (
  place_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create the 'wishlist' table
CREATE TABLE wishlists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  visited INTEGER NOT NULL,
  location_id INTEGER NOT NULL
);

-- Create the 'reviews' table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  created_at timestamp,
  updated_at timestamp,
  rating INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  location_id INTEGER NOT NULL
);

-- Create the 'reviews_photos' table
CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY,
  photo_url TEXT NOT NULL,
  review_id INTEGER
);

-- Create the 'friends' table
CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  friend INTEGER NOT NULL,
  user_id INTEGER NOT NULL
);

-- Create the 'chat_rooms' table
CREATE TABLE chat_rooms (
  id SERIAL PRIMARY KEY,
  chat_name VARCHAR(200) NOT NULL
);

-- Create the 'chat_members' table
CREATE TABLE chat_members (
  id SERIAL PRIMARY KEY,
  room_id INTEGER,
  user_id INTEGER
);

-- Create the 'messages' table with DATE for createdAt
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  message_text TEXT NOT NULL,
  message_user INTEGER NOT NULL,
  created_at timestamp,
  updated_at timestamp,
  room_id INTEGER
);

------------------------------------------------------
-- MOCK DATA
------------------------------------------------------

--- Mock data for the 'users' table
INSERT INTO users (username, email, password, photo, banner_photo, about, private)
VALUES
  ('coffee_lover1', 'coffee1@example.com', 'password1', 'https://picsum.photos/900/400', 'https://picsum.photos/900/400', 'Hi there! I''m a coffee lover who enjoys savoring each cup to the fullest.', false),
  ('espresso_enthusiast', 'espresso@example.com', 'password2', 'https://picsum.photos/900/400', NULL, 'Passionate about espresso and its unique flavors.', false),
  ('java_junkie', 'java@example.com', 'password3', 'https://picsum.photos/900/400', 'https://picsum.photos/900/400', 'Coffee and coding fuel my day!', false),
  ('caffeine_addict', 'caffeine@example.com', 'password4', 'https://picsum.photos/900/400', NULL, 'Caffeine is my lifeline.', false),
  ('mocha_master', 'mocha@example.com', 'password5', 'https://picsum.photos/900/400', 'https://picsum.photos/900/400', 'Mastering the art of mocha-making.', false),
  ('latte_lover', 'latte@example.com', 'password6', 'https://picsum.photos/900/400', NULL, 'Latte art enthusiast and coffee explorer.', false),
  ('cappuccino_crazy', 'cappuccino@example.com', 'password7', 'https://picsum.photos/900/400', 'https://picsum.photos/900/400', 'Cappuccinos are my guilty pleasure.', false),
  ('espresso_addict', 'espresso2@example.com', 'password8', 'https://picsum.photos/900/400', NULL, 'Addicted to the intense flavor of espresso.', false);

-- Mock data for the 'locations' table
INSERT INTO locations (place_id, name)
VALUES
  (451, 'Coffee Shop A'),
  (452, 'Coffee Shop B'),
  (453, 'Coffee Shop C'),
  (454, 'Coffee Shop D'),
  (900, 'Coffee Shop E'),
  (901, 'Coffee Shop F'),
  (902, 'Coffee Shop G'),
  (455, 'Coffee Shop H');

-- Mock data for the 'wishlists' table
INSERT INTO wishlists (user_id, visited, location_id)
VALUES
  (1, 2, 455),
  (2, 1, 455),
  (1, 1, 900),
  (4, 1, 455),
  (5, 1, 901),
  (6, 1, 902),
  (7, 1, 452),
  (1, 2, 452);


-- Mock data for the 'reviews' table
INSERT INTO reviews (title, body, created_at, updated_at, rating, user_id, location_id)
VALUES
  ('Great Coffee', 'I love their coffee!', '2023-09-16 10:00:00', '2023-09-16 10:00:00', 5, 1, 451),
  ('Excellent Service', 'The service here is outstanding.', '2023-09-15 15:30:00', '2023-09-15 15:30:00', 4, 2, 452),
  ('Amazing Latte', 'The latte is simply amazing.', '2023-09-14 08:45:00', '2023-09-14 08:45:00', 5, 3, 900),
  ('Cappuccino Heaven', 'Their cappuccino is heavenly.', '2023-09-13 12:15:00', '2023-09-13 12:15:00', 4, 4, 900),
  ('Espresso Bliss', 'The espresso here is pure bliss.', '2023-09-12 17:30:00', '2023-09-12 17:30:00', 5, 5, 900),
  ('Mocha Delight', 'Their mocha is a delightful treat.', '2023-09-11 14:00:00', '2023-09-11 14:00:00', 4, 3, 902),
  ('Latte Lover', 'I adore their lattes!', '2023-09-10 09:30:00', '2023-09-10 09:30:00', 5, 3, 901),
  ('Cappuccino Craze', 'This place knows how to make cappuccinos.', '2023-09-09 16:45:00', '2023-09-09 16:45:00', 4, 8, 454);

-- Mock data for the 'reviews_photos' table
INSERT INTO reviews_photos (photo_url, review_id)
VALUES
  ('https://picsum.photos/800/400', 1),
  ('https://picsum.photos/800/400', 2),
  ('https://picsum.photos/800/400', 3),
  ('https://picsum.photos/800/400', 4),
  ('https://picsum.photos/800/400', 5),
  ('https://picsum.photos/800/400', 6),
  ('https://picsum.photos/800/400', 7),
  ('https://picsum.photos/800/400', 8);

-- Mock data for the 'friends' table
INSERT INTO friends (friend, user_id)
VALUES
  (2, 1),
  (1, 2),
  (3, 1),
  (4, 2),
  (5, 1),
  (6, 2),
  (7, 1),
  (8, 2);

-- Mock data for the 'chat_rooms' table
INSERT INTO chat_rooms (chat_name)
VALUES
  ('Coffee Lovers Chat'),
  ('Espresso Enthusiasts'),
  ('Latte Enthusiasts'),
  ('Cappuccino Fans');

-- Mock data for the 'chat_members' table
INSERT INTO chat_members (room_id, user_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (2, 3),
  (3, 4),
  (3, 5),
  (4, 6),
  (4, 7);

-- Mock data for the 'messages' table
INSERT INTO messages (message_text, message_user, created_at, updated_at, room_id)
VALUES
  ('Hello, coffee lovers!', 1, '2023-09-16 11:30:00', '2023-09-16 11:30:00', 1),
  ('Hi there!', 2, '2023-09-16 12:15:00', '2023-09-16 12:15:00', 1),
  ('Espresso is the best!', 2, '2023-09-15 09:45:00', '2023-09-15 09:45:00', 2),
  ('I love lattes!', 3, '2023-09-15 14:00:00', '2023-09-15 14:00:00', 3),
  ('Cappuccino time!', 4, '2023-09-14 16:30:00', '2023-09-14 16:30:00', 4),
  ('Mocha madness!', 5, '2023-09-14 10:45:00', '2023-09-14 10:45:00', 5),
  ('Hello, latte lovers!', 6, '2023-09-13 18:00:00', '2023-09-13 18:00:00', 6),
  ('Latte art is beautiful.', 7, '2023-09-13 22:30:00', '2023-09-13 22:30:00', 7);