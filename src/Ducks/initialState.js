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
        camp_id: 0,
        participant_id: '',
        self_register: false
    },
    user: {},
    usersGuardians: [],
    usersEmergency: [],
    usersParticipants: [],
    groups: [
        {
            group_id: 1,
            title: 'character',
            ages: '12-14',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fugiat amet natus eveniet quisquam possimus.'
        },
        {
            group_id: 2,
            title: 'education',
            ages: '15-16',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fugiat amet natus eveniet quisquam possimus.'
        },
        {
            group_id: 3,
            title: 'mission',
            ages: '17-18',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fugiat amet natus eveniet quisquam possimus.'
        }
    ],
    camps: [],
    costTable: {
        camp1: 44433,
        camp2: 23412
    }
}