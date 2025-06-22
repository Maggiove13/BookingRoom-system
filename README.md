# BookingRoom System

Sistema de reservas de salas basado en arquitectura de microservicios desarrollado con Node.js y Express.

## 📋 Descripción del Proyecto

BookingRoom System es una aplicación distribuida que permite gestionar reservas de salas a través de múltiples microservicios independientes. El sistema incluye autenticación de usuarios, gestión de salas y un sistema completo de reservas con comunicación asíncrona mediante RabbitMQ.

## 🏗️ Arquitectura del Sistema

El proyecto está organizado como una arquitectura de microservicios con los siguientes componentes:

### Microservicios

1. **Login Service** (`login-service/`)
   - Autenticación y registro de usuarios
   - Gestión de JWT tokens
   - Interfaz web para login/registro
   - Puerto: 4000 (configurable)

2. **Room Service** (`room-service/`)
   - Gestión de salas disponibles
   - Actualización de estados de salas
   - Integración con RabbitMQ
   - Puerto: 3000 (configurable)

3. **Booking Service** (`booking-service/`)
   - Creación y gestión de reservas
   - Comunicación con otros servicios
   - Validación de disponibilidad
   - Puerto: 5000 (configurable)

### Estructura de Carpetas

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

## 📋 Contracts (Contratos de API)

Los **contracts** son especificaciones técnicas que definen las interfaces de comunicación de cada microservicio:

### ¿Qué son los Contracts?

Los contracts en este proyecto son documentos que especifican:
- **Endpoints disponibles**: URLs, métodos HTTP y parámetros
- **Formato de datos**: Estructura de peticiones y respuestas
- **Autenticación**: Requisitos de tokens JWT
- **Códigos de estado**: Respuestas de éxito y error
- **Validaciones**: Reglas de negocio y validación de datos

### Contracts Disponibles

1. **Login Service Contract** (`documents/login-service_contract.md`)
   - Endpoints de autenticación (`/api/login`, `/api/register`)
   - Rutas de páginas web (`/`, `/register`, `/admin`)
   - Gestión de JWT tokens via cookies HTTP-only

2. **Room Service Contract** (`documents/room-service_contract.md`)
   - Gestión de salas (`/rooms/add`, `/rooms/availableRoom`, `/rooms/updateRooms`)
   - Integración con RabbitMQ para actualizaciones de estado
   - Autenticación JWT requerida

3. **Booking Service Contract** (`documents/booking-service_contract.md`)
   - Gestión de reservas (`/bookings/makeABooking`, `/bookings/deleteBookings`)
   - Consulta de reservas (`/bookings/allBookings`)
   - Comunicación asíncrona con Room Service

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn
- PostgreSQL
- RabbitMQ (para comunicación entre servicios)

### Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd BookingRoom-system
```

### Instalación de Dependencias

1. **Instalar dependencias globales:**
```bash
npm install
```

2. **Instalar dependencias de cada microservicio:**
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

### Configuración de Variables de Entorno

Crear archivos `.env` en cada microservicio:

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

### Configuración de Base de Datos

1. Crear una base de datos PostgreSQL llamada `booking_db`
2. Ejecutar los scripts de creación de tablas (ubicados en cada carpeta `config/`)

### Configuración de RabbitMQ

1. Instalar RabbitMQ:
```bash
# Ubuntu/Debian
sudo apt-get install rabbitmq-server

# macOS
brew install rabbitmq

# Windows
# Descargar desde https://www.rabbitmq.com/download.html
```

2. Iniciar el servicio:
```bash
sudo systemctl start rabbitmq-server
```

## 🏃‍♂️ Ejecución del Sistema

### Opción 1: Ejecutar cada servicio individualmente

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

### Opción 2: Script de inicio automático

Crear un script `start.sh` en la raíz del proyecto:

```bash
#!/bin/bash
echo "Iniciando BookingRoom System..."

# Iniciar Login Service
cd login-service && npm run dev &
LOGIN_PID=$!

# Iniciar Room Service
cd ../room-service && node app.js &
ROOM_PID=$!

# Iniciar Booking Service
cd ../booking-service && node app.js &
BOOKING_PID=$!

echo "Servicios iniciados:"
echo "Login Service: http://localhost:4000"
echo "Room Service: http://localhost:3000"
echo "Booking Service: http://localhost:5000"

# Esperar a que terminen los procesos
wait $LOGIN_PID $ROOM_PID $BOOKING_PID
```

Hacer ejecutable y correr:
```bash
chmod +x start.sh
./start.sh
```

## 🌐 URLs de Acceso

Una vez ejecutado el sistema:

- **Aplicación Web**: http://localhost:4000
- **Panel de Administración**: http://localhost:4000/admin
- **API Login Service**: http://localhost:4000/api/
- **API Room Service**: http://localhost:3000/rooms/
- **API Booking Service**: http://localhost:5000/bookings/

## 🔧 Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT (JSON Web Tokens)
- **Comunicación Asíncrona**: RabbitMQ
- **Frontend**: HTML, CSS, JavaScript
- **Arquitectura**: Microservicios

## 📚 Documentación de APIs

Para información detallada sobre cada API, consulta los contracts en la carpeta `documents/`:

- [Login Service API](documents/login-service_contract.md)
- [Room Service API](documents/room-service_contract.md)
- [Booking Service API](documents/booking-service_contract.md)