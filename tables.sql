-- Active: 1668782086461@@127.0.0.1@3306@truckapp_web

CREATE TABLE IF NOT EXISTS users_web (
    user_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    user_name VARCHAR(64) NOT NULL
);



