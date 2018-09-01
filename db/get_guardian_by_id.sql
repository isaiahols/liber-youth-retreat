select g.first_name, g.last_name, g.email, g.phone, g.phone_2
from participants p
    join guardians g on p.guardian_id = g.guardian_id
where g.guardian_id = $1;