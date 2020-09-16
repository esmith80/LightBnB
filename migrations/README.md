### lightbnb

# Notes on database schema

Foreign keys in property_reviews table, I omitted ON DELETE CASCADE for:

1) guest_id - if a user leaves the service, their review is still useful to other users - this value can't be null, so I left it;

2) reservation_id - if a user makes a reservation, is told by the owner that 
they should cancel or something happens that makes them cancel before they actually
stay there, they may want to leave a review explaining a review about the owner

Note that I left in the ON DELETE CASCADE for property_id since if there is no property, 
reviews are of no value. I would implement something to remove the entire property_review record at this point.

I made the message optional (about the rating they left).