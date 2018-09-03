update participants
    set first_name = $1, 
    last_name = $2, 
    birthday = $3, 
    email = $4, 
    gender = $5, 
    photo = $6, 
    size = $7,
    health_card_num = $8, 
    dietary_concerns = $9, 
    medical_concerns = $10, 
    comments = $11, 
    email_updates = $12, 
    order_books = $13, 
    display_profile = $14, 
    guardian_id = $15, 
    user_id = $16
where participant_id = $17
returning *;