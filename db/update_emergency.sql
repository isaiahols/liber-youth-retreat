update emergency_contacts
    set first_name = $1, 
    last_name = $2, 
    email =$3, 
    phone =$4
where emergency_id = $5
returning *;