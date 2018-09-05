drop table if exists mailing_list;
drop table if exists participant_emergency;
drop table if exists feedback;
drop table if exists emergency_contacts;
drop table if exists attendants;
drop table if exists participants;
drop table if exists guardians;
drop table if exists camps;
drop table if exists legal_docs;
drop table if exists users;

CREATE TABLE "users"
(
    "user_id" serial primary key,
    "name" varchar(120),
    "email" varchar(120),
    "user_pic" text,
    "auth0_id" text,
    "admin_type" text
);

CREATE TABLE "legal_docs"
(
    "legal_id" serial primary key,
    "title" text,
    "doc" text,
    "date" date
);

CREATE TABLE "camps"
(
    "camp_id" serial primary key,
    "start_date" date,
    "end_date" date,
    "description" text,
    "location" text,
    "title" text
);

CREATE TABLE "guardians"
(
    "guardian_id" serial primary key,
    "first_name" varchar(80),
    "last_name" varchar(80),
    "email" varchar(120),
    "phone" varchar(15),
    "phone_2" varchar(15)
);

CREATE TABLE "participants"
(
    "participant_id" serial primary key,
    "first_name" varchar(80),
    "last_name" varchar(80),
    "birthday" date,
    "gender" varchar(20),
    "email" varchar(120),
    "size" varchar(20),
    "health_card_num" varchar(30),
    "photo" text,
    "dietary_concerns" text,
    "medical_concerns" text,
    "comments" text,
    "email_updates" boolean,
    "order_books" boolean,
    "display_profile" boolean,
    "guardian_id" integer references guardians(guardian_id),
    "user_id" integer references users(user_id)
);

CREATE TABLE "attendants"
(
    "attendee_id" serial primary key,
    "group_id" varchar(120),
    "waver_p_signed" boolean,
    "waver_y_signed" boolean,
    "medical_waver_signed" boolean,
    "register_date" date not null default current_date,
    "camp_id" integer references camps(camp_id),
    "participant_id" integer references participants(participant_id)
);

CREATE TABLE "emergency_contacts"
(
    "emergency_id" serial primary key,
    "first_name" varchar(80),
    "last_name" varchar(80),
    "email" varchar(120),
    "phone" varchar(15)
);



CREATE TABLE "feedback"
(
    "feedback_id" serial primary key,
    "hear_about" text,
    "comments" text,
    "rating" integer,
    "participant_id" integer references participants(participant_id),
    "user_id" integer references users(user_id)
);


CREATE TABLE "participant_emergency"
(
    "participant_emergance_id" serial primary key,
    "participant_id" integer references participants(participant_id),
    "emergency_id" integer references emergency_contacts(emergency_id),
    "attendee_id" integer references attendants(attendee_id)
);





CREATE TABLE "mailing_list"
(
    "mail_id" serial primary key,
    "first_name" varchar(80),
    "last_name" varchar(80),
    "email" varchar(120),
    "user_id" integer references users(user_id)
);



insert into camps
    (start_date, end_date, description, location, title)
values
    ('2018-08-19', '2018-08-21', 'great camp for learning', 'Crowsnest Pass', 'Leader Servent'),
    ('2018-08-22', '2018-08-25', 'great camp about education', 'Bragg Creek', 'Love of Learning');

insert into guardians
    (first_name, last_name, email, phone, phone_2)
values
    ('John', 'Person', 'lots@email.email', '(123)321-4321', '098890-4321');


insert into participants
    (first_name, last_name,birthday, gender,email,size,health_card_num,photo,dietary_concerns,medical_concerns,comments,email_updates,order_books,display_profile,guardian_id,user_id)
values
    ('isaiah', 'oldson', '20 sept 2000', 'male', 'testing@test.email', 'XL', '123-321-123-321', 'https://picsum.photos/200/300?image=0', 'none', 'not a lot', 'nothing', true, true, true, 1, 1);



select *
from camps;

select *
from attendants a
    join participants p on a.participant_id = p.participant_id
    join participant_emergency pe on p.participant_id = pe.participant_id
    join emergency_contacts ec on pe.emergency_id = ec.emergency_id
where p.user_id = 1;

select *
from participants;