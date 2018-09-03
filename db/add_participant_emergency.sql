insert into participant_emergency
    (participant_id, emergency_id, attendee_id)
values
    ($1, $2, $3)
returning *;