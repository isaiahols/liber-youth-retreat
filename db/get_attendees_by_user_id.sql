select * 
from attendants a
join participants p on a.participant_id = p.participant_id
join camps c on a.camp_id = c.camp_id
where p.user_id = $1;