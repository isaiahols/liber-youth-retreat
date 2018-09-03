module.exports = {
    participant: {
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
    attendee: {
        group_id: 'education',
        waver_P_signed: false,
        waver_Y_signed: false,
        medical_waver_signed: false,
        register_date: new Date(),
        camp_id: '2',
        participant_id: '',
    },
    user: {},
    usersGuardians: [],
    usersEmergency: [],
    usersParticipants: [],
    groups: {
        character: 'character',
        education: 'education',
        mission: 'mission'
    },
    camps: []
}