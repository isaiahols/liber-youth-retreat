insert into attendants
    ( group_id, waver_p_signed, waver_y_signed, medical_waver_signed, register_date, camp_id,participant_id)
values
    ($1, $2, $3, $4, $5, $6, $7)
returning *;