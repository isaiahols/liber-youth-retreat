drop table if exists mailing_list;
drop table if exists participant_emergency;
drop table if exists feedback;
drop table if exists emergency_contacts;
drop table if exists participants;
drop table if exists guardians;
drop table if exists attendents;
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
    "doc" text,
    "date" date
);

CREATE TABLE "camps"
(
    "camp_id" serial primary key,
    "start_date" date,
    "end_date" date,
    "description" text
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
    "birthdate" date,
    "gender" varchar(20),
    "participant_email" varchar(120),
    "t_shirt_size" varchar(20),
    "health_card_num" varchar(30),
    "participant_photo" text,
    "dietary_concerns" text,
    "medical_concerns" text,
    "comments" text,
    "email_updates" integer,
    "order_books" varchar(20),
    "display_profile" integer,
    "guardian_id" integer references guardians(guardian_id),
    "user_id" integer references users(user_id)
);

CREATE TABLE "attendents"
(
    "attendee_id" serial primary key,
    "group" varchar(120),
    "waver_signed" integer,
    "register_date" date not null default current_date,
    "camp_id" integer references camps(camp_id),
    "participant_id" integer references participants(participant_id)
);

CREATE TABLE "emergency_contacts"
(
    "emergency_id" serial primary key,
    "name" varchar(120),
    "number" varchar(15)
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
    "emergency_id" integer references emergency_contacts(emergency_id)
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
    (start_date, end_date, description)
values
    ('2018-08-19', '2018-08-21', 'great camp for learning'),
    ('2018-08-22', '2018-08-25', 'great camp about education');


select *
from camps;