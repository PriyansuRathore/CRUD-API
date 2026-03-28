create table users (
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    created_at timestamp default current_timestamp, 
);