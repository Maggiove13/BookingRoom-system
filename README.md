# BookingRoom System

Room reservation system based on microservices architecture developed with Node.js and Express.

## Project Description

BookingRoom System is a distributed application that allows managing room reservations through multiple independent microservices. The system includes user authentication, room management, and a complete reservation system with asynchronous communication via RabbitMQ.

## System Architecture

The project is organized as a microservices architecture with the following components:

### Microservices

1. **Login Service** (`login-service/`)
   - User authentication and registration
   - JWT token management
   - Web interface for login/registration
   - Port: 4000 (configurable)

2. **Room Service** (`room-service/`)
   - Management of available rooms
   - Room status updates
   - Integration with RabbitMQ
   - Port: 3000 (configurable)

3. **Booking Service** (`booking-service/`)
   - Reservation creation and management
   - Communication with other services
   - Availability validation
   - Port: 5000 (configurable)

### Folder Structure

```
BookingRoom-system/
├── login-service/           # Microservicio de autenticación
│   ├── controllers/         # Controladores de autenticación
│   ├── middlewares/         # Middleware de autorización
│   ├── models/             # Modelos de datos
│   ├── pages/              # Páginas web estáticas
│   ├── public/             # Archivos estáticos (CSS, JS)
│   ├── config/             # Configuración de base de datos
│   └── app.js              # Servidor principal
├── room-service/           # Microservicio de gestión de salas
│   ├── controllers/        # Controladores de salas
│   ├── middlewares/        # Middleware de validación
│   ├── models/            # Modelos de datos
│   ├── routes/            # Rutas de la API
│   ├── config/            # Configuración de base de datos
│   └── app.js             # Servidor principal
├── booking-service/        # Microservicio de reservas
│   ├── controllers/        # Controladores de reservas
│   ├── middleware/         # Middleware de validación
│   ├── models/            # Modelos de datos
│   ├── routes/            # Rutas de la API
│   ├── config/            # Configuración de base de datos
│   └── app.js             # Servidor principal
├── documents/              # Contratos de API
│   ├── login-service_contract.md
│   ├── room-service_contract.md
│   └── booking-service_contract.md
├── package.json           # Dependencias compartidas
└── README.md              # Este archivo
```


## API Contracts

1. **Login Service Contract** (`documents/login-service_contract.md`)
   - Authentication endpoints (`/api/login`, `/api/register`)
   - Web page routes (`/`, `/register`, `/admin`)
   - JWT token management via HTTP-only cookies

2. **Room Service Contract** (`documents/room-service_contract.md`)
   - Room management (`/rooms/add`, `/rooms/availableRoom`, `/rooms/updateRooms`)
   - RabbitMQ integration for status updates
   - Requires JWT authentication

3. **Booking Service Contract** (`documents/booking-service_contract.md`)
   - Reservation management (`/bookings/makeABooking`, `/bookings/deleteBookings`)
   - Booking queries (`/bookings/allBookings`)
   - Asynchronous communication with Room Service

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL
- RabbitMQ (for inter-service communication)

### Clone the Repository

```bash
git clone <REPOSITORY_URL>
cd BookingRoom-system
```

### Install dependencies

1. **Install global dependencies:**
```bash
npm install
```

2. **Install dependencies for each microservice:**
```bash
# Login Service
cd login-service
npm install

# Room Service
cd ../room-service
npm install

# Booking Service
cd ../booking-service
npm install
```

### Environment Variable Configuration

Create .env files in each microservice:

#### login-service/.env
```env
LOGIN_PORT=4000
JWT_SECRET=tu_jwt_secret_aqui
JWT_EXPIRATION=1h
JWT_COOKIE_EXPIRES=1
DB_HOST=localhost
DB_PORT=5432
DB_NAME=booking_db
DB_USER=tu_usuario
DB_PASSWORD=tu_password
```

#### room-service/.env
```env
PORT=3000
RABBITMQ_URL=amqp://localhost
DB_HOST=localhost
DB_PORT=5432
DB_NAME=booking_db
DB_USER=tu_usuario
DB_PASSWORD=tu_password
```

#### booking-service/.env
```env
PORT=5000
JWT_SECRET=tu_jwt_secret_aqui
RABBITMQ_URL=amqp://localhost
LOGIN_SERVICE_URL=http://localhost:4000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=booking_db
DB_USER=tu_usuario
DB_PASSWORD=tu_password
```

### Database Setup:

1. Create a PostgreSQL database named `booking_db`
2. Run the table creation scripts located in each `config/` folder

### RabbitMQ Setup

1. Install RabbitMQ:
```bash
# Ubuntu/Debian
sudo apt-get install rabbitmq-server

# macOS
brew install rabbitmq

# Windows
# Download from https://www.rabbitmq.com/download.html
```

2. Start the service:
```bash
sudo systemctl start rabbitmq-server
```

## Running the System

### Run each service individually

```bash
# Terminal 1 - Login Service
cd login-service
npm run dev

# Terminal 2 - Room Service
cd room-service
node app.js

# Terminal 3 - Booking Service
cd booking-service
node app.js
```

## Access URLs

Once the system is running:

- **Web Application**: http://localhost:4000
- **Admin Panel**: http://localhost:4000/admin
- **Login Service API**: http://localhost:4000/api/
- **Room Service API**: http://localhost:3000/rooms/
- **Booking Service API**: http://localhost:5000/bookings/

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Asynchronous Communication**: RabbitMQ
- **Frontend**: HTML, CSS, JavaScript
- **Architecture**: Microservicios

## API Documentation

For detailed information about each API, see the contracts in the `documents/` folder:

- [Login Service API](documents/login-service_contract.md)
- [Room Service API](documents/room-service_contract.md)
- [Booking Service API](documents/booking-service_contract.md)