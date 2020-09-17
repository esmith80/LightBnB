SELECT properties.*, AVG(rating) as average_rating
FROM property_reviews
JOIN properties ON property_id = properties.id
WHERE city = 'Vancouver'
GROUP BY properties.id
HAVING AVG(rating) >= 4
ORDER BY cost_per_night asc;


