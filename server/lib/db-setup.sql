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
DROP TABLE IF EXISTS friends CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS chat_members CASCADE;
DROP TABLE IF EXISTS chat_rooms CASCADE;

-- Create the 'users' table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  photo TEXT NOT NULL,
  banner_photo TEXT,
  about TEXT NOT NULL,
  private BOOLEAN NOT NULL DEFAULT false
);

-- Create the 'locations' table
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  location_place_id INTEGER NOT NULL
);

-- Create the 'reviews' table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  created_at DATE,
  updated_at DATE,
  rating INTEGER NOT NULL,
  location_id INTEGER
);

-- Create the 'reviews_photos' table
CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY,
  photo_url TEXT NOT NULL,
  review_id INTEGER
);

-- Create the 'wishlist' table
CREATE TABLE location_wishlists (
  id SERIAL PRIMARY KEY,
  location_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  visited INTEGER DEFAULT 0
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
  created_at DATE,
  updated_at DATE,
  room_id INTEGER
);

------------------------------------------------------
-- MOCK DATA
------------------------------------------------------

-- Insert data into the 'users' table
INSERT INTO users (username, email, password, photo, banner_photo, about, private)
VALUES
  ('user1', 'user1@example.com', 'password1', 'user1.jpg', 'banner1.jpg', 'About user1', false),
  ('user2', 'user2@example.com', 'password2', 'user2.jpg', 'banner2.jpg', 'About user2', true),
  ('user3', 'user3@example.com', 'password3', 'user3.jpg', 'banner3.jpg', 'About user3', false),
  ('user4', 'user4@example.com', 'password4', 'user4.jpg', 'banner4.jpg', 'About user4', false),
  ('user5', 'user5@example.com', 'password5', 'user5.jpg', 'banner5.jpg', 'About user5', true),
  ('user6', 'user6@example.com', 'password6', 'user6.jpg', 'banner6.jpg', 'About user6', false);

-- Insert data into the 'locations' table
INSERT INTO locations (location_place_id)
VALUES
  (12345),
  (54321),
  (67890),
  (98765),
  (45678),
  (13579);

-- Insert data into the 'reviews' table
INSERT INTO reviews (title, body, created_at, updated_at, rating, location_id)
VALUES
  ('Great coffee shop', 'I love this place!', '2023-09-16', '2023-09-16', 5, 1),
  ('Average experience', 'Could be better', '2023-09-15', '2023-09-15', 3, 2),
  ('Awesome location', 'Highly recommended', '2023-09-14', '2023-09-14', 4, 1),
  ('Excellent cafe', 'Top-notch quality coffee!', '2023-09-17', '2023-09-17', 5, 2),
  ('Cozy atmosphere', 'Perfect for a rainy day', '2023-09-18', '2023-09-18', 4, 3),
  ('Mediocre experience', 'Needs improvement', '2023-09-19', '2023-09-19', 2, 2),
  ('Hidden gem', 'A fantastic discovery', '2023-09-20', '2023-09-20', 5, 1);

-- Insert data into the 'reviews_photos' table
INSERT INTO reviews_photos (photo_url, review_id)
VALUES
  ('photo1.jpg', 1),
  ('photo2.jpg', 2),
  ('photo3.jpg', 3),
  ('photo4.jpg', 4),
  ('photo5.jpg', 5),
  ('photo6.jpg', 6),
  ('photo7.jpg', 7);

-- Insert data into the 'location_wishlists' table
INSERT INTO location_wishlists (location_id, user_id, visited)
VALUES
  (1, 1, 1),
  (2, 1, 0),
  (3, 2, 0),
  (2, 3, 0),
  (3, 3, 0),
  (1, 2, 1),
  (3, 1, 1);

-- Insert data into the 'friends' table
INSERT INTO friends (friend, user_id)
VALUES
  (2, 1),
  (3, 1),
  (4, 1),
  (5, 1),
  (6, 2),
  (1, 3);

-- Insert data into the 'chat_rooms' table
INSERT INTO chat_rooms (chat_name)
VALUES
  ('Coffee Lovers'),
  ('Travel Enthusiasts'),
  ('Tech Enthusiasts');

-- Insert data into the 'chat_members' table
INSERT INTO chat_members (room_id, user_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (3, 3);

-- Insert data into the 'messages' table
INSERT INTO messages (message_text, message_user, created_at, updated_at, room_id)
VALUES
  ('Hello, coffee lovers!', 1, '2023-09-16', '2023-09-16', 1),
  ('Hi there!', 2, '2023-09-16', '2023-09-16', 1),
  ('I just returned from a great trip!', 2, '2023-09-16', '2023-09-16', 2),
  ('Any recommendations for a new smartphone?', 3, '2023-09-18', '2023-09-18', 3),
  ('The latest model from X brand is great!', 3, '2023-09-19', '2023-09-19', 3),
  ('Favorite food spots in town?', 1, '2023-09-17', '2023-09-17', 1),
  ('I love trying new cuisines!', 2, '2023-09-17', '2023-09-17', 1),
  ('Just got back from a mountain hike!', 2, '2023-09-18', '2023-09-18', 2);

