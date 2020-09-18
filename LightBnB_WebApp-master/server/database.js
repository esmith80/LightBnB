
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb',
  port: 5432
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
    SELECT * FROM users
    WHERE email = $1;
    `, [email])
    .then(res => {
    return res.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
  }
  exports.getUserWithEmail = getUserWithEmail;
  
/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
    SELECT * FROM users
    WHERE id = $1;
    `, [id])
    .then(res => {
    return res.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [user.name, user.email, user.password])
    .then(res => {
    return res.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT reservations.*, properties.*, AVG(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.end_date < NOW()::DATE 
  AND reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date asc
  LIMIT $2;  
  `, [guest_id, limit])
  .then(res => res.rows)
  .catch(err => console.error('query error', err.stack));
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  
  const { city, minimum_price_per_night: minPrice, maximum_price_per_night: maxPrice, minimum_rating: minRating } = options; 
  let notFirstParam = false;
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;
   //are there any parameters at all? add WHERE
   if (city || minPrice || maxPrice || minRating) {
     queryString += `WHERE `;
   }

  //check for each option, add necessary params and WHERE clause
  if (city) {
    queryParams.push(`%${city}%`);
    queryString += `city LIKE $${queryParams.length} `;
    notFirstParam = true;
  }
  
  if (minPrice) {
    queryParams.push(Number(minPrice));
    notFirstParam ? queryString += `AND `: null;           
    queryString += `cost_per_night >= $${queryParams.length} `;
    notFirstParam = true;
  }

  if (maxPrice) {
    queryParams.push(Number(maxPrice));
    notFirstParam ? queryString += `AND `: null;           
    queryString += `cost_per_night <= $${queryParams.length} `;
    notFirstParam = true;
  }

  if (minRating) {
    queryParams.push(Number(minRating));
    notFirstParam ? queryString += `AND `: null;           
    queryString += `rating >= $${queryParams.length} `;
    notFirstParam = true;
  }
  
  // add the limit
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => console.error('query error', err.stack));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool.query(`
    INSERT INTO properties (
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url, 
      cost_per_night, 
      street, 
      city, 
      province, 
      post_code, 
      country, 
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `, [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url,  property.cost_per_night,  property.street,  property.city,  property.province,  property.post_code,  property.country,  property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms ])
    .then(res => {
    return res.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
}
exports.addProperty = addProperty;
