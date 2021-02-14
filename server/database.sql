CREATE DATABASE websitewithposts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    username VARCHAR(20),
    email VARCHAR(50) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE post(
    post_id SERIAL PRIMARY KEY NOT NULL,
    --set email to 50 to remove long possibly fake emails.
    --can change the length at a later date
    user_id UUID references users(user_id),
    description VARCHAR(255) NOT NULL,
    datetime TIMESTAMPTZ NOT NULL
);
--currently implementing only a 2 layer tree
--may change later if more depth is wanted/needed
--====================--
--example
--post
--  reply
--  reply
--===================--
--*******************--
--example of alternative
--post
--  reply
--      reply
--      reply
--          reply
--  reply
--*******************--
CREATE TABLE reply(
    reply_id SERIAL PRIMARY KEY NOT NULL,
    parent_id INTEGER references post(post_id) NOT NULL,
    user_id UUID references users(user_id) NOT NULL,
    description VARCHAR(255) NOT NULL,
    datetime TIMESTAMPTZ NOT NULL
);

-- ALTER TABLE users
-- ADD CONSTRAINT check_email_min_len check (length(email) >= 10),
-- ADD CONSTRAINT check_password_min_len check (length(password) >= 6);