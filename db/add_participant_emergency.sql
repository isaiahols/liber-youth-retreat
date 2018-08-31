insert into participant_emergency
    (participant_id, emergency_id)
values
    ($1, $2)
returning *;