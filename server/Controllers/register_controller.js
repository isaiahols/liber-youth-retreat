module.exports = {
    giveSessionData: (req, res) => {
        let info = req.session;
        res.status(200).send(info)
    },
    getParticipant: (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.session.user;

        db.get_participant([user_id])
            .then(resp => {
                res.status(200).send(resp)
            })

    },
    getGuardian: (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.session.user;

        db.get_guardian_by_id([user_id])
            .then(resp => {
                res.status(200).send(resp)
            })
    },
    getEmergency: (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.session.user;

        db.get_user_emergency([user_id])
            .then(resp => {
                res.status(200).send(resp)
            })
    },
    getCamps: (req, res) => {
        const db = req.app.get('db');
        db.get_camps().then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            res.status(500).send(err)
        })

    },

    registerParticipant: async (req, res) => {
        const {
            body: {
                guardian: {
                    guardian_id = 0,
                    first_name: g_first,
                    last_name: g_last,
                    email: g_email,
                    phone: g_phone,
                    phone_2: g_phone_2
                },
                emergency: {
                    emergency_id = 0,
                    first_name: e_first,
                    last_name: e_last,
                    email: e_email,
                    phone: e_phone
                },
                participant: {
                    participant_id = 0,
                    first_name: p_first,
                    last_name: p_last,
                    birthday: p_birthday,
                    email: p_email,
                    gender: p_gender,
                    photo: p_photo,
                    size: p_size,
                    health_card_num: p_hcn,
                    dietary_concerns: p_dc = 'Nothing to Worry About',
                    medical_concerns: p_mc = 'Nothing to Worry About',
                    comments: p_c = 'Not Going to Comment',
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
                } = 1
            }
        } = req;

        const db = req.app.get('db')

        // // // UPDATING OR CREATING GUARDIAN // // //
        let guardian;
        if (guardian_id) {
            guardian = await db.update_guardian([g_first, g_last, g_email, g_phone, g_phone_2, guardian_id])
                .catch(err => console.log(err));

        } else {
            guardian = await db.add_guardian([g_first, g_last, g_email, g_phone, g_phone_2])
                .catch(err => console.log(err));
        }

        const g_id = guardian[0].guardian_id;


        // // // UPDATING OR CREATING EMERGENCY_CONTACT // // //
        let emergency;
        if (emergency_id) {
            emergency = await db.update_emergency([e_first, e_last, e_email, e_phone, emergency_id])
                .catch(err => console.log(err));

        } else {
            emergency = await db.add_emergency_contact([e_first, e_last, e_email, e_phone])
                .catch(err => console.log(err));

        }

        const e_id = emergency[0].emergency_id


        // // // UPDATING OR CREATING PARTICIPANT // // //
        let participant;
        if (participant_id) {

            participant = await db.update_participant([p_first, p_last, p_birthday, p_email, p_gender, p_photo, p_size, p_hcn, p_dc, p_mc, p_c, p_eu, p_ob, p_dp, g_id, user_id, participant_id]).catch(err => console.log(err));
        } else {
            participant = await db.add_participant([p_first, p_last, p_birthday, p_email, p_gender, p_photo, p_size, p_hcn, p_dc, p_mc, p_c, p_eu, p_ob, p_dp, g_id, user_id]).catch(err => console.log(err));
        }

        const p_id = participant[0].participant_id

        let attendee = await db.add_attendee([group_id, waver_p_signed, waver_y_signed, medical_waver_signed, register_date, camp, p_id]).catch(err => console.log(err))

        const a_id = attendee[0].attendee_id

        let emergencyContPart = await db.add_participant_emergency([p_id, e_id, a_id])
        // // // I WANT TO BE ABLE TO USE PROMISE.ALL() TO SEND THESE BOTH OFF AT THE SAME TIME

        res.status(200).send({ guardian, emergency, participant, attendee, emergencyContPart })
    }

}

// Saving order:
//      ([guardians, emergency_contact])
//      participants
//     ([attendants, participant_emergency])