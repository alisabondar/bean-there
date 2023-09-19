-- SQLBook: Code
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
  photo TEXT DEFAULT 'https://picsum.photos/200/200',
  banner_photo TEXT DEFAULT 'https://picsum.photos/800/400',
  about TEXT DEFAULT 'Welcome to my coffee adventure! I''m on a never-ending quest to explore the world of coffee. From trying unique beans to experimenting with brewing methods, I''m here to share my passion for all things caffeine. Join me on this aromatic journey, and let''s raise our cups to the wonderful world of coffee!',
  private BOOLEAN NOT NULL DEFAULT false
);

-- Create the 'locations' table
CREATE TABLE locations (
  place_id VARCHAR(200) PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create the 'wishlist' table
CREATE TABLE wishlists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  visited BOOLEAN NOT NULL,
  wishlisted BOOLEAN NOT NULL,
  location_id VARCHAR(200) NOT NULL
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
  location_id VARCHAR(200) NOT NULL
);

-- Create the 'reviews_photos' table
CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY,
  photo_url TEXT NOT NULL,
  review_id INTEGER NOT NULL
);

-- Create the 'friends' table
CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  friend_id INTEGER NOT NULL,
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
  ('coffee_lover1', 'coffee1@example.com', '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK', 'https://picsum.photos/200/200', 'https://picsum.photos/900/400', 'Hi there! I''m a coffee lover who enjoys savoring each cup to the fullest.', false),
  ('espresso_enthusiast', 'espresso@example.com', '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK', 'https://picsum.photos/200/200', NULL, 'Passionate about espresso and its unique flavors.', false),
  ('java_junkie', 'java@example.com', '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK', 'https://picsum.photos/200/200', 'https://picsum.photos/900/400', 'Coffee and coding fuel my day!', false),
  ('caffeine_addict', 'caffeine@example.com', '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK', 'https://picsum.photos/200/200', NULL, 'Caffeine is my lifeline.', false),
  ('mocha_master', 'mocha@example.com', '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK', 'https://picsum.photos/200/200', 'https://picsum.photos/900/400', 'Mastering the art of mocha-making.', false),
  ('latte_lover', 'latte@example.com', '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK', 'https://picsum.photos/200/200', NULL, 'Latte art enthusiast and coffee explorer.', false),
  ('cappuccino_crazy', 'cappuccino@example.com', '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK', 'https://picsum.photos/200/200', 'https://picsum.photos/900/400', 'Cappuccinos are my guilty pleasure.', false),
  ('espresso_addict', 'espresso2@example.com', '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK', 'https://picsum.photos/200/200', NULL, 'Addicted to the intense flavor of espresso.', false);

-- Mock data for the 'locations' table
INSERT INTO locations (place_id, name)
VALUES
  ('451', 'Coffee Shop A'),
  ('452', 'Coffee Shop B'),
  ('453', 'Coffee Shop C'),
  ('454', 'Coffee Shop D'),
  ('900', 'Coffee Shop E'),
  ('901', 'Coffee Shop F'),
  ('902', 'Coffee Shop G'),
  ('455', 'Coffee Shop H');

-- Mock data for the 'wishlists' table
INSERT INTO wishlists (user_id, visited, wishlisted, location_id)
VALUES
  (1, true, true, '455'),
  (2, true, false, '455'),
  (1, true, true, '900'),
  (4, false, true, '455'),
  (5, true, false, '901'),
  (6, true, true, '902'),
  (7, true, true, '452'),
  (1, false, false, '452');


-- Mock data for the 'reviews' table
INSERT INTO reviews (title, body, created_at, updated_at, rating, user_id, location_id)
VALUES
  ('Great Coffee', 'I love their coffee!', '2023-09-16 10:00:00', '2023-09-16 10:00:00', 5, 1, '451'),
  ('Excellent Service', 'The service here is outstanding.', '2023-09-15 15:30:00', '2023-09-15 15:30:00', 4, 2, '452'),
  ('Amazing Latte', 'The latte is simply amazing.', '2023-09-14 08:45:00', '2023-09-14 08:45:00', 5, 3, '900'),
  ('Cappuccino Heaven', 'Their cappuccino is heavenly.', '2023-09-13 12:15:00', '2023-09-13 12:15:00', 4, 4, '900'),
  ('Espresso Bliss', 'The espresso here is pure bliss.', '2023-09-12 17:30:00', '2023-09-12 17:30:00', 5, 5, '900'),
  ('Mocha Delight', 'Their mocha is a delightful treat.', '2023-09-11 14:00:00', '2023-09-11 14:00:00', 4, 3, '902'),
  ('Latte Lover', 'I adore their lattes!', '2023-09-10 09:30:00', '2023-09-10 09:30:00', 5, 3, '901'),
  ('Cappuccino Craze', 'This place knows how to make cappuccinos.', '2023-09-09 16:45:00', '2023-09-09 16:45:00', 4, 8, '454'),
   ('Another Great Coffee', 'This place consistently serves amazing coffee!', '2023-09-17 11:00:00', '2023-09-17 11:00:00', 5, 2, '451'),
  ('Terrible Experience', 'I''ve had enough of the terrible service here.', '2023-09-17 12:30:00', '2023-09-17 12:30:00', 1, 1, '452'),
  ('Incredible Latte', 'Their latte never fails to impress me.', '2023-09-17 14:15:00', '2023-09-17 14:15:00', 5, 4, '900'),
  ('Heavenly Cappuccino', 'I feel like I''m in cappuccino heaven every time I visit.', '2023-09-17 16:00:00', '2023-09-17 16:00:00', 5, 2, '454'),
  ('Blissful Espresso', 'I can''t resist the pure bliss of their espresso.', '2023-09-17 18:00:00', '2023-09-17 18:00:00', 5, 7, '901'),
  ('Disgusting Mocha', 'Their mocha is always a delightful treat for my taste buds, until today.', '2023-09-17 19:30:00', '2023-09-17 19:30:00', 1, 6, '902'),
  ('Lattes to Love', 'I''m a true latte lover, and this place never disappoints.', '2023-09-17 21:15:00', '2023-09-17 21:15:00', 5, 5, '455'),
  ('Cappuccino Magic', 'Their cappuccinos are pure magic.', '2023-09-17 22:45:00', '2023-09-17 22:45:00', 5, 8, '453');

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
  ('https://picsum.photos/800/400', 8),
  ('https://picsum.photos/800/400', 9),
  ('https://picsum.photos/800/400', 10),
  ('https://picsum.photos/800/400', 11);

-- Mock data for the 'friends' table
INSERT INTO friends (friend_id, user_id)
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
  ('Cappuccino Fans'),
  ('Expresso Heads 5 Lyfe');

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
  (4, 7),
  (5, 1),
  (5, 2),
  (5, 6);

-- Mock data for the 'messages' table
INSERT INTO messages (message_text, message_user, created_at, updated_at, room_id)
VALUES
  ('Hello, coffee lovers!', 1, '2023-09-16 11:30:00', '2023-09-16 11:30:00', 1),
  ('Hi there!', 2, '2023-09-16 12:15:00', '2023-09-16 12:15:00', 1),
  ('Espresso is the best!', 2, '2023-09-15 09:45:00', '2023-09-15 09:45:00', 2),
  ('I love lattes!', 3, '2023-09-15 14:00:00', '2023-09-15 14:00:00', 3),
  ('Cappuccino time!', 4, '2023-09-14 16:30:00', '2023-09-14 16:30:00', 4),
  ('Mocha madness!', 5, '2023-09-14 10:45:00', '2023-09-14 10:45:00', 3),
  ('Hello, latte lovers!', 6, '2023-09-13 18:00:00', '2023-09-13 18:00:00', 4),
  ('Latte art is beautiful.', 7, '2023-09-13 22:30:00', '2023-09-13 22:30:00', 4),
  ('I love lattes!', 1, '2023-09-15 14:00:00', '2023-09-15 14:00:00', 5),
  ('Adventure time!', 2, '2023-09-14 16:30:00', '2023-09-14 16:30:00', 5),
  ('Finn the human!', 1, '2023-09-14 10:45:00', '2023-09-14 10:45:00', 5),
  ('Jake the dog!', 2, '2023-09-13 18:00:00', '2023-09-13 18:00:00', 5),
  ('I like trains.', 6, '2023-09-13 22:30:00', '2023-09-13 22:30:00', 5);