module.exports = {
    participant: {
        participant_id: '',
        first_name: '',
        last_name: '',
        birthday: '',
        email: '',
        gender: '',
        photo: '',
        size: '',
        health_card_num: '',
        dietary_concerns: '',
        medical_concerns: '',
        comments: '',
        email_updates: true,
        order_books: true,
        display_profile: true,
    },
    guardian: {
        camp_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        phone_2: ''

    },
    emergency: {
        emergency_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    },
    user: {},
    usersGuardians: [],
    usersEmergency: [],
    usersParticipants: [],
    attendants: {
        group: '',
        waver_P_signed: '',
        waver_Y_signed: '',
        medical_waver_signed: '',
        register_date: '',
        camp_id: '',
        participant_id: '',
    }
}