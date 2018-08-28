insert into participants
    (first_name, last_name, birthday, gender)
values
    ($1, $2, $3, $4)
returning *;