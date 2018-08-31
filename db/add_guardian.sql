insert into guardians
    (first_name, last_name, email, phone, phone_2)
values
    ($1, $2, $3, $4, $5)
returning *;