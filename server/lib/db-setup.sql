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
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS friends CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS chat_members CASCADE;
DROP TABLE IF EXISTS chat_rooms CASCADE;

DROP TABLE IF EXISTS otps CASCADE;

-- Create the 'users' table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(200) UNIQUE NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  photo TEXT DEFAULT 'https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg',
  banner_photo TEXT DEFAULT 'https://picsum.photos/800/400',
  about TEXT DEFAULT 'Welcome to my coffee adventure! I''m on a never-ending quest to explore the world of coffee. From trying unique beans to experimenting with brewing methods, I''m here to share my passion for all things caffeine. Join me on this aromatic journey, and let''s raise our cups to the wonderful world of coffee!',
  private BOOLEAN NOT NULL DEFAULT false,
  otp BOOLEAN NOT NULL DEFAULT false
);

-- Create the 'locations' table
CREATE TABLE locations (
  place_id VARCHAR(200) PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create the 'favorites' table
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  location_id VARCHAR(200)  NOT NULL
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
  location_id VARCHAR(200)  NOT NULL
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

-- Create the 'otps' table
CREATE TABLE otps (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  otp INTEGER NOT NULL
);

------------------------------------------------------
-- MOCK DATA
------------------------------------------------------

-- MOCK DATA FOR THE 'users' TABLE
INSERT INTO users (username, email, password, photo, banner_photo, about, private, otp)
VALUES
  ('coffee_lover1', 'coffee_lover1@example.com', '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK', 'https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg', 'https://picsum.photos/800/400', 'Welcome to my coffee adventure! I am on a never-ending quest to explore the world of coffee. From trying unique beans to experimenting with brewing methods, I am here to share my passion for all things caffeine. Join me on this aromatic journey, and let us raise our cups to the wonderful world of coffee!', false, false),
  ('espresso_master', 'espresso_master@example.com', '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK', 'https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg', 'https://picsum.photos/800/400', 'Passionate espresso lover with a knack for latte art. Follow my journey as I turn every cup into a canvas of creativity.', false, false),
  ('java_junkie', 'java_junkie@example.com', '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK', 'https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg', 'https://picsum.photos/800/400', 'Exploring the world of coffee, one bean at a time. Join me on my caffeine-fueled adventures and discover the magic in every cup.', false, false),
  ('mocha_master', 'mocha@example.com', '$2b$10$THU.Ge2UKkMA2jLpdPIk4uYZbNdX5awOqtupWvN1vF8dqx6FCsKZK', 'https://i.imgur.com/IAsu8Yc.jpg', 'https://images.unsplash.com/photo-1632584125454-f48693ec9861?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80', 'Diving deep into the art of coffee brewing. From pour-overs to siphon methods, I am here to unravel the secrets of a perfect brew.', false, false);

-- MOCK DATA FOR THE 'locations' TABLE
INSERT INTO locations (place_id, name)
VALUES
  ('ChIJ8yR2pKf2wokRC3eGQ4qQZt0', 'Buunni Coffee - Pinehurst'),
  ('ChIJQwtmq3v2wokRNOjx5cEBhXg', 'Manhattanville Coffee'),
  ('ChIJg03sPoTzwokRZ0bd2e2Tl2s', 'Kingsbridge Coffee Shop'),
  ('ChIJvxJ3sJT3wokRbCh_6ad44bc', 'Corner Cafe'),
  ('ChIJi3aeTej2wokRtXxeevkeI9s', 'Caffe Bene'),
  ('ChIJTWtemFH0wokReg6sI_hPtGI', 'Prospect Coffee Shop');

-- MOCK DATA FOR THE 'favorites' TABLE
INSERT INTO favorites (user_id, location_id)
VALUES
  (1, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  (2, 'ChIJQwtmq3v2wokRNOjx5cEBhXg'),
  (3, 'ChIJg03sPoTzwokRZ0bd2e2Tl2s'),
  (4, 'ChIJvxJ3sJT3wokRbCh_6ad44bc'),
  (2, 'ChIJQwtmq3v2wokRNOjx5cEBhXg'),
  (2, 'ChIJg03sPoTzwokRZ0bd2e2Tl2s'),
  (2, 'ChIJvxJ3sJT3wokRbCh_6ad44bc'),
  (2, 'ChIJi3aeTej2wokRtXxeevkeI9s'),
  (3, 'ChIJg03sPoTzwokRZ0bd2e2Tl2s'),
  (3, 'ChIJvxJ3sJT3wokRbCh_6ad44bc'),
  (3, 'ChIJi3aeTej2wokRtXxeevkeI9s'),
  (3, 'ChIJTWtemFH0wokReg6sI_hPtGI'),
  (4, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  (4, 'ChIJvxJ3sJT3wokRbCh_6ad44bc'),
  (4, 'ChIJi3aeTej2wokRtXxeevkeI9s'),
  (4, 'ChIJTWtemFH0wokReg6sI_hPtGI');

-- MOCK DATA FOR THE 'reviews' TABLE
INSERT INTO reviews (title, body, created_at, updated_at, rating, user_id, location_id)
VALUES
  ('Amazing Coffee!', 'I had the most amazing coffee at Buunni Coffee - Pinehurst. The flavor was exceptional, and the atmosphere was cozy. Highly recommended!', '2023-09-16 10:00:00', '2023-09-16 10:30:00', 5, 1, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('Great Experience', 'Manhattanville Coffee never disappoints! I enjoyed a delightful cup of coffee and friendly service. It''s my go-to place for coffee.', '2023-09-16 11:00:00', '2023-09-16 11:45:00', 4, 1, 'ChIJQwtmq3v2wokRNOjx5cEBhXg'),
  ('Loved the Ambiance', 'Corner Cafe has a fantastic ambiance, but the coffee was average. Still, I''d visit again for the cozy atmosphere.', '2023-09-16 12:00:00', '2023-09-16 12:30:00', 3, 1, 'ChIJvxJ3sJT3wokRbCh_6ad44bc'),
  ('Decent Coffee', 'Caffe Bene serves decent coffee. It''s a good spot to grab a quick cup of joe.', '2023-09-16 13:00:00', '2023-09-16 13:45:00', 3, 1, 'ChIJi3aeTej2wokRtXxeevkeI9s'),
  ('Friendly Staff', 'Prospect Coffee Shop has the friendliest staff. The coffee is good, and the service is top-notch!', '2023-09-16 14:00:00', '2023-09-16 14:30:00', 4, 1, 'ChIJTWtemFH0wokReg6sI_hPtGI'),
  ('Not Impressed', 'I had high hopes for Kingsbridge Coffee Shop, but the coffee was disappointing. The atmosphere was decent, though.', '2023-09-16 15:00:00', '2023-09-16 15:45:00', 2, 1, 'ChIJg03sPoTzwokRZ0bd2e2Tl2s'),
  ('Excellent Brew', 'Manhattanville Coffee never disappoints! Their coffee is consistently excellent, and the staff is friendly and knowledgeable.', '2023-09-16 10:00:00', '2023-09-16 10:30:00', 5, 2, 'ChIJQwtmq3v2wokRNOjx5cEBhXg'),
  ('A Coffee Gem', 'Corner Cafe is a hidden gem. The coffee is top-notch, and the ambiance is perfect for a quiet afternoon.', '2023-09-16 11:00:00', '2023-09-16 11:45:00', 5, 2, 'ChIJvxJ3sJT3wokRbCh_6ad44bc'),
  ('Average Experience', 'Kingsbridge Coffee Shop provided an average coffee experience. The service was slow, and the coffee was mediocre.', '2023-09-16 12:00:00', '2023-09-16 12:30:00', 3, 2, 'ChIJg03sPoTzwokRZ0bd2e2Tl2s'),
  ('Not My Favorite', 'Caffe Bene is not my favorite coffee spot. The coffee is decent, but I expected more.', '2023-09-16 13:00:00', '2023-09-16 13:45:00', 3, 2, 'ChIJi3aeTej2wokRtXxeevkeI9s'),
  ('Cozy Place', 'Prospect Coffee Shop is a cozy spot to enjoy a cup of coffee. The staff is friendly, and the coffee is good.', '2023-09-16 14:00:00', '2023-09-16 14:30:00', 4, 2, 'ChIJTWtemFH0wokReg6sI_hPtGI'),
  ('Disappointing', 'Buunni Coffee - Pinehurst was a disappointment. The coffee lacked flavor, and the ambiance was not inviting.', '2023-09-16 15:00:00', '2023-09-16 15:45:00', 2, 2, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('Decent Coffee', 'Caffe Bene serves decent coffee. It''s a good spot to grab a quick cup of joe.', '2023-09-16 10:00:00', '2023-09-16 10:30:00', 3, 3, 'ChIJi3aeTej2wokRtXxeevkeI9s'),
  ('Friendly Staff', 'Prospect Coffee Shop has the friendliest staff. The coffee is good, and the service is top-notch!', '2023-09-16 11:00:00', '2023-09-16 11:45:00', 4, 3, 'ChIJTWtemFH0wokReg6sI_hPtGI'),
  ('Not Impressed', 'I had high hopes for Kingsbridge Coffee Shop, but the coffee was disappointing. The atmosphere was decent, though.', '2023-09-16 12:00:00', '2023-09-16 12:30:00', 2, 3, 'ChIJg03sPoTzwokRZ0bd2e2Tl2s'),
  ('Excellent Brew', 'Manhattanville Coffee never disappoints! Their coffee is consistently excellent, and the staff is friendly and knowledgeable.', '2023-09-16 13:00:00', '2023-09-16 13:45:00', 5, 3, 'ChIJQwtmq3v2wokRNOjx5cEBhXg'),
  ('A Coffee Gem', 'Corner Cafe is a hidden gem. The coffee is top-notch, and the ambiance is perfect for a quiet afternoon.', '2023-09-16 14:00:00', '2023-09-16 14:30:00', 5, 3, 'ChIJvxJ3sJT3wokRbCh_6ad44bc'),
  ('Average Experience', 'Kingsbridge Coffee Shop provided an average coffee experience. The service was slow, and the coffee was mediocre.', '2023-09-16 15:00:00', '2023-09-16 15:45:00', 3, 3, 'ChIJg03sPoTzwokRZ0bd2e2Tl2s'),
  ('Loved the Ambiance', 'Corner Cafe has a fantastic ambiance, but the coffee was average. Still, I''d visit again for the cozy atmosphere.', '2023-09-16 10:00:00', '2023-09-16 10:30:00', 3, 4, 'ChIJvxJ3sJT3wokRbCh_6ad44bc'),
  ('Amazing Coffee!', 'I had the most amazing coffee at Buunni Coffee - Pinehurst. The flavor was exceptional, and the atmosphere was cozy. Highly recommended!', '2023-09-16 11:00:00', '2023-09-16 11:45:00', 5, 4, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('Great Experience', 'Manhattanville Coffee never disappoints! I enjoyed a delightful cup of coffee and friendly service. It''s my go-to place for coffee.', '2023-09-16 12:00:00', '2023-09-16 12:30:00', 4, 4, 'ChIJQwtmq3v2wokRNOjx5cEBhXg'),
  ('Decent Coffee', 'Caffe Bene serves decent coffee. It''s a good spot to grab a quick cup of joe.', '2023-09-16 13:00:00', '2023-09-16 13:45:00', 3, 4, 'ChIJi3aeTej2wokRtXeeee'),
  ('Not My Favorite', 'Caffe Bene is not my favorite coffee spot. The coffee is decent, but I expected more.', '2023-09-16 14:00:00', '2023-09-16 14:30:00', 3, 4, 'ChIJi3aeTej2wokRtXxeevkeI9s'),
  ('Disappointing', 'Buunni Coffee - Pinehurst was a disappointment. The coffee lacked flavor, and the ambiance was not inviting.', '2023-09-16 15:00:00', '2023-09-16 15:45:00', 2, 4, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('Great Experience', 'Manhattanville Coffee never disappoints! I enjoyed a delightful cup of coffee and friendly service. It''s my go-to place for coffee.', '2023-09-16 11:00:00', '2023-09-16 11:45:00', 4, 1, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('Loved the Ambiance', 'Corner Cafe has a fantastic ambiance, but the coffee was average. Still, I''d visit again for the cozy atmosphere.', '2023-09-16 12:00:00', '2023-09-16 12:30:00', 3, 1, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('Decent Coffee', 'Caffe Bene serves decent coffee. It''s a good spot to grab a quick cup of joe.', '2023-09-16 13:00:00', '2023-09-16 13:45:00', 3, 1, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('Friendly Staff', 'Prospect Coffee Shop has the friendliest staff. The coffee is good, and the service is top-notch!', '2023-09-16 14:00:00', '2023-09-16 14:30:00', 4, 1, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('Not Impressed', 'I had high hopes for Kingsbridge Coffee Shop, but the coffee was disappointing. The atmosphere was decent, though.', '2023-09-16 15:00:00', '2023-09-16 15:45:00', 2, 1, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('Excellent Brew', 'Manhattanville Coffee never disappoints! Their coffee is consistently excellent, and the staff is friendly and knowledgeable.', '2023-09-16 10:00:00', '2023-09-16 10:30:00', 5, 2, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('A Coffee Gem', 'Corner Cafe is a hidden gem. The coffee is top-notch, and the ambiance is perfect for a quiet afternoon.', '2023-09-16 11:00:00', '2023-09-16 11:45:00', 5, 2, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('Average Experience', 'Kingsbridge Coffee Shop provided an average coffee experience. The service was slow, and the coffee was mediocre.', '2023-09-16 12:00:00', '2023-09-16 12:30:00', 3, 2, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('Not My Favorite', 'Caffe Bene is not my favorite coffee spot. The coffee is decent, but I expected more.', '2023-09-16 13:00:00', '2023-09-16 13:45:00', 3, 2, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0'),
  ('Cozy Place', 'Prospect Coffee Shop is a cozy spot to enjoy a cup of coffee. The staff is friendly, and the coffee is good.', '2023-09-16 14:00:00', '2023-09-16 14:30:00', 4, 2, 'ChIJ8yR2pKf2wokRC3eGQ4qQZt0');

-- MOCK DATA FOR THE 'reviews_photos' TABLE
INSERT INTO reviews_photos (photo_url, review_id)
VALUES
  ('https://picsum.photos/800/400', 1),
  ('https://picsum.photos/800/400', 4),
  ('https://picsum.photos/800/400', 6),
  ('https://picsum.photos/800/400', 8),
  ('https://picsum.photos/800/400', 10),
  ('https://picsum.photos/800/400', 12),
  ('https://picsum.photos/800/400', 14),
  ('https://picsum.photos/800/400', 16),
  ('https://picsum.photos/800/400', 18),
  ('https://picsum.photos/800/400', 20),
  ('https://picsum.photos/800/400', 22),
  ('https://picsum.photos/800/400', 24),
  ('https://picsum.photos/800/400', 26);

-- MOCK DATA FOR 'friends' TABLE
INSERT INTO friends (friend_id, user_id)
VALUES
  (1, 2),
  (2, 1),
  (1, 4),
  (4, 1),
  (3, 4),
  (4, 3),
  (2, 4),
  (4, 2),
  (1, 3),
  (3, 1);

-- MOCK DATA FOR THE 'chat_rooms' TABLE
INSERT INTO chat_rooms (chat_name)
VALUES
  ('Coffee Lovers Chat'),
  ('Espresso Enthusiasts'),
  ('Latte Enthusiasts'),
  ('Cappuccino Fans'),
  ('Expresso Heads 5 Lyfe');

-- MOCK DATA FOR THE 'chat_members' TABLE
INSERT INTO chat_members (room_id, user_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (2, 4),
  (2, 3),
  (3, 3),
  (3, 4),
  (4, 1),
  (4, 2),
  (4, 4),
  (5, 3),
  (5, 4);

-- MOCK DATA FOR THE 'messages' TABLE
INSERT INTO messages (message_text, message_user, created_at, updated_at, room_id)
VALUES
  ('Hello, coffee lovers!', 1, '2023-09-16 10:00:00', '2023-09-16 10:00:00', 1),
  ('Hi there!', 2, '2023-09-16 10:05:00', '2023-09-16 10:05:00', 1),
  ('Espresso is the best!', 2, '2023-09-16 10:10:00', '2023-09-16 10:10:00', 1),
  ('I love lattes!', 3, '2023-09-16 10:15:00', '2023-09-16 10:15:00', 1),
  ('Cappuccino art is amazing!', 1, '2023-09-16 10:20:00', '2023-09-16 10:20:00', 1),
  ('Espresso all day, every day!', 4, '2023-09-16 10:25:00', '2023-09-16 10:25:00', 1),
  ('I agree, cappuccinos are great!', 2, '2023-09-16 10:30:00', '2023-09-16 10:30:00', 1),
  ('Let''s meet for coffee soon.', 3, '2023-09-16 10:35:00', '2023-09-16 10:35:00', 1),
  ('Sure, I''m up for it!', 1, '2023-09-16 10:40:00', '2023-09-16 10:40:00', 1),
  ('Count me in too!', 4, '2023-09-16 10:45:00', '2023-09-16 10:45:00', 1),
  ('I just tried a new coffee blend, it''s fantastic!', 3, '2023-09-16 11:00:00', '2023-09-16 11:00:00', 2),
  ('What''s the blend? Tell me more!', 2, '2023-09-16 11:05:00', '2023-09-16 11:05:00', 2),
  ('Latte art is an art form!', 4, '2023-09-16 11:15:00', '2023-09-16 11:15:00', 2),
  ('I agree, I love creating latte art!', 3, '2023-09-16 11:20:00', '2023-09-16 11:20:00', 2),
  ('Cappuccino foam should be like silk!', 4, '2023-09-16 11:30:00', '2023-09-16 11:30:00', 2),
  ('Definitely! The texture is everything.', 2, '2023-09-16 11:35:00', '2023-09-16 11:35:00', 2),
  ('Has anyone tried the new espresso blend at Espresso Heads 5 Lyfe?', 3, '2023-09-16 11:45:00', '2023-09-16 11:45:00', 5),
  ('Not yet, but I heard it''s amazing!', 3, '2023-09-16 11:50:00', '2023-09-16 11:50:00', 5),
  ('I tried it last week, it''s definitely worth a try!', 3, '2023-09-16 11:55:00', '2023-09-16 11:55:00', 5),
  ('This is a message in Espresso Enthusiasts!', 2, '2023-09-16 12:00:00', '2023-09-16 12:00:00', 2),
  ('Another message in Espresso Enthusiasts!', 4, '2023-09-16 12:05:00', '2023-09-16 12:05:00', 2),
  ('A latte message in Latte Enthusiasts!', 3, '2023-09-16 12:10:00', '2023-09-16 12:10:00', 3),
  ('Enjoying lattes here!', 4, '2023-09-16 12:15:00', '2023-09-16 12:15:00', 3),
  ('Cappuccinos rule in Cappuccino Fans!', 1, '2023-09-16 12:20:00', '2023-09-16 12:20:00', 4),
  ('Cappuccino time!', 2, '2023-09-16 12:25:00', '2023-09-16 12:25:00', 4),
  ('Espresso talk in Espresso Heads 5 Lyfe!', 4, '2023-09-16 12:30:00', '2023-09-16 12:30:00', 5),
  ('I love Espresso Heads 5 Lyfe!', 3, '2023-09-16 12:35:00', '2023-09-16 12:35:00', 5);