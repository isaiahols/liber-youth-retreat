update guardians
    set first_name = $1, 
    last_name = $2, 
    email = $3, 
    phone = $4, 
    phone_2 = $5
where guardian_id = $6
returning *;