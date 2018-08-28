insert into users
    (name, email, user_pic, auth0_id, admin_type)
values($1, $2, $3, $4, $5)
returning *;