insert into emergency_contacts
    (first_name, last_name, email, phone)
values
    ($1, $2, $3, $4)
returning *;