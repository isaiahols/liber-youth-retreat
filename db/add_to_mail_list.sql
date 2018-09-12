insert into mailing_list
    (first_name, last_name, email)
values($1, $2, $3)
returning *;