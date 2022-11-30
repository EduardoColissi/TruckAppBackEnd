-- Active: 1668782086461@@127.0.0.1@3306@truckapp_web

CREATE TABLE IF NOT EXISTS users_web (
    id VARCHAR(64) PRIMARY KEY UNIQUE,
    name VARCHAR(64) NOT NULL,
    cpf VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL
);


CREATE TABLE IF NOT EXISTS freights (
    id VARCHAR(64) PRIMARY KEY UNIQUE,
    titulo VARCHAR(64) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    valor VARCHAR(64) NOT NULL,
    prazo VARCHAR(64) NOT NULL,
    destino VARCHAR(64) NOT NULL,
    origem VARCHAR(64) NOT NULL,
    pontuacao VARCHAR(64) NOT NULL,
    data VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
