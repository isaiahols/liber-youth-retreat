select ec.emergency_id, ec.first_name, ec.last_name, ec.email, ec.phone
from participants p
    join participant_emergency pe on p.participant_id = pe.participant_id
    join emergency_contacts ec on pe.emergency_id = ec.emergency_id
where p.user_id = $1;