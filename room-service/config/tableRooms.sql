-- Crear base de datos de los rooms.

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255),
    capacity INTEGER,
    status VARCHAR(255) NOT NULL
);