module.exports = {
    giveSessionData: (req, res) => {
        let info = req.session;
        res.status(200).send(info)
    },
    registerPart1: async (req, res) => {
        const { first_name, last_name, birthday, gender } = req.body

        let camper = await req.app.get('db').register_part1([first_name, last_name, birthday, gender])
        res.status(200).send(camper)
    },
    addG: async (req, res) => {


        const { first_name, last_name, email, phone, phone_2 } = req.body;
        const db = req.app.get('db')

        let guardian = await db.add_guardian(first_name, last_name, email, phone, phone_2)
        res.status(200).send(guardian)
    },
    addEC: async (req, res) => {
        const {
            first_name,
            last_name,
            email,
            phone
        } = req.body;
        const db = req.app.get('db')

        let emergency = await db.add_emergency_contact(first_name, last_name, email, phone)
        res.status(200).send(emergency)
    },
    addGAndEC: async (req, res) => {
        const {
            guardian: {
                first_name: g_first,
                last_name: g_last,
                email: g_email,
                phone: g_phone,
                phone_2: g_phone_2,
            },
            emergency: {
                first_name: e_first,
                last_name: e_last,
                email: e_email,
                phone: e_phone
            }
        } = req.body;
        const db = req.app.get('db')
        let guardian = await db.add_guardian([g_first, g_last, g_email, g_phone, g_phone_2])

        let emergency = await db.add_emergency_contact([e_first, e_last, e_email, e_phone])
        res.status(200).send({ guardian, emergency })
    },
    addParticipant: async (req, res) => {

    },
    registerParticipant: async (req, res) => {
        const {
            body: {
                guardian: {
                    first_name: g_first,
                    last_name: g_last,
                    email: g_email,
                    phone: g_phone,
                    phone_2: g_phone_2
                },
                emergency: {
                    first_name: e_first,
                    last_name: e_last,
                    email: e_email,
                    phone: e_phone
                },
                participant: {
                    first_name: p_first,
                    last_name: p_last,
                    birthday: p_birthday,
                    email: p_email,
                    gender: p_gender,
                    photo: p_photo,
                    size: p_size,
                    health_card_num: p_hcn,
                    dietary_concerns: p_dc,
                    medical_concerns: p_mc,
                    comments: p_c,
                    email_updates: p_eu,
                    order_books: p_ob,
                    display_profile: p_dp
                },
                attendee: {
                    group_id,
                    waver_p_signed,
                    waver_y_signed,
                    medical_waver_signed,
                    register_date,
                    camp_id: camp
                }
            },
            session: {
                user: {
                    user_id 
                } =1
            }
        } = req;


        // const { user_id } = req.session.user;
        const db = req.app.get('db')
        let guardian = await db.add_guardian([g_first, g_last, g_email, g_phone, g_phone_2])

        const g_id = guardian[0].guardian_id;

        let emergency = await db.add_emergency_contact([e_first, e_last, e_email, e_phone]);

        const e_id = emergency[0].emergency_id
        // // // I WANT TO BE ABLE TO USE PROMISE.ALL() TO SEND THESE BOTH OFF AT THE SAME TIME
        
        let participant = await db.add_participant([p_first, p_last, p_birthday, p_email, p_gender, p_photo, p_size, p_hcn, p_dc, p_mc, p_c, p_eu, p_ob, p_dp, g_id, user_id]);
        
        const p_id = participant[0].participant_id
        
        let attendee = await db.add_attendee([group_id, waver_p_signed, waver_y_signed, medical_waver_signed, register_date, camp, p_id])
        
        let emergencyContPart = await db.add_participant_emergency([p_id, e_id])
        // // // I WANT TO BE ABLE TO USE PROMISE.ALL() TO SEND THESE BOTH OFF AT THE SAME TIME

        res.status(200).send({ guardian, emergency, participant, attendee, emergencyContPart })
    }

}

// Saving order:
//      ([guardians, emergency_contact])
//      participants
//     ([attendants, participant_emergency])