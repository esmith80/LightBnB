

-- need users first as nothing depends on them
INSERT INTO users (name, email, password)
VALUES ('Jon Finkleman', 'jon@adxq.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rose McGrath', 'rose@adxq.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Gerri Quanamocci', 'gerri@adxq.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


-- second I need properties
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'Modern Style - Comfortable', 'description', 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?cs=srgb&dl=pexels-pixasquare-1115804.jpg&fm=jpg', 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?cs=srgb&dl=pexels-mark-mccammon-1080696.jpg&fm=jpg', 219, 3, 3, 5, 'United States', 'Orange Country Drive', 'Anaheim', 'California', '92551'),
(2, 'Spacious - Ideal for family', 'description', 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 199, 3, 3, 5, 'United States', '29 Pine Bud Road', 'Ashville', 'North Carolina', '33213'), 
(3, 'Mountain Getaway - Rustic Character Home', 'description', 'https://images.pexels.com/photos/314937/pexels-photo-314937.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'https://images.pexels.com/photos/3965563/pexels-photo-3965563.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 159, 1, 1, 3, 'Canada', '12 Forest Drive', 'Terrace', 'British Columbia', 'V0F 2G4');

-- third, reservations
INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2020-02-11', '2020-02-26'),
(2, 2, '2019-11-04', '2019-12-01'),
(3, 3, '2020-01-01', '2020-01-14');


-- fourth, property reviews
INSERT INTO property_reviews (guest_id, property_id, reservation_id, message, rating) 
VALUES (1, 1, 1, 'Great house - did not want to leave!', 9),
(2, 2, 2, 'Quiet neighborhood - good place to relax but far drive to amenities.', 8),
(3, 3, 3, 'Rustic and lots of character - owners were friendly and checked in on us.', 7);



