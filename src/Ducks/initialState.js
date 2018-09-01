module.exports = {
    participant: {
        participant_id: 'a',
        first_name: 'b',
        last_name: 'c',
        birthday: '1992-06-05',
        email: 'sadf',
        gender: 'male',
        photo: 'asdfasdf',
        size: 'S',
        health_card_num: '1234-1234-1234',
        dietary_concerns: 'Blank',
        medical_concerns: 'Blank',
        comments: 'None',
        email_updates: true,
        order_books: true,
        display_profile: true,
    },
    guardian: {
        first_name: 'r',
        last_name: 'e',
        email: 's',
        phone: '123123',
        phone_2: '123123'

    },
    emergency: {
        emergency_id: '',
        first_name: 'gf',
        last_name: 'fd',
        email: 'ds',
        phone: '432-5432',
    },
    attendee: {
        group_id: 'education',
        waver_P_signed: false,
        waver_Y_signed: false,
        medical_waver_signed: false,
        register_date: new Date(),
        camp_id: 1,
        participant_id: '',
    },
    user: {},
    usersGuardians: [],
    usersEmergency: [],
    usersParticipants: []
}