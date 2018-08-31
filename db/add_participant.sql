insert into participants
    (first_name, last_name,birthdate, gender,email,size,health_card_num,photo,dietary_concerns,medical_concerns,comments,email_updates,order_books,display_profile,guardian_id,user_id)
values
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    returning *;