# Room Service Microservice API Documentation

## Base URL
```
http://localhost:{PORT}/rooms
```

## Server Configuration
The service is built using Express.js with the following middleware:
- JSON body parser
- Cookie parser
- Route handling for /rooms prefix

## Endpoints

### 1. Add New Room
**POST** `/rooms/add`

Adds a new room to the system.

#### Request
```json
{
  "type": "string",
  "capacity": "number",
  "status": "string"
}
```

#### Response
- **200 OK**
```json
{
  "message": "Room added successfully"
}
```
- **500 Internal Server Error**
```json
{
  "message": "Internal server error"
}
```

### 2. Get Available Rooms
**GET** `/rooms/availableRoom/`

Retrieves all available rooms.

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Response
- **200 OK**
```json
{
  "message": "There are available rooms",
  "responseAvailableRooms": [
    {
      "room_id": "number",
      "type": "string",
      "capacity": "number",
      "status": "string"
    }
  ]
}
```
- **404 Not Found**
```json
{
  "message": "Not available rooms"
}
```
- **500 Internal Server Error**
```json
{
  "message": "Error retrieving info about a room"
}
```

### 3. Update Room Status
**PUT** `/rooms/updateRooms/`

Updates the status of a specific room.

#### Request
```json
{
  "room_id": "number",
  "status": "string"
}
```

#### Validation
- `status` must be one of: `['available', 'not available']`

#### Response
- **200 OK**
```json
{
  "message": "Rooms status updated"
}
```
- **400 Bad Request**
```json
{
  "message": "Invalid status. Status must be: 'available' or 'not available'"
}
```
- **404 Not Found**
```json
{
  "message": "room_id not found"
}
```
- **500 Internal Server Error**
```json
{
  "message": "Internal server error"
}
```

## Message Queue Integration
### RabbitMQ Consumer
Listens on `booking_queue` for room status updates.

#### Message Format
```json
{
  "room_id": "number",
  "status": "string"
}
```

### Routes
All routes are prefixed with `/rooms`

## Environment Variables
```
PORT=<port_number>
RABBITMQ_URL=amqp://localhost
DB_CONNECTION_STRING=<database_connection_string>
```

## API Structure
```
/rooms
  ├── /add              POST  - Add new room
  ├── /availableRoom    GET   - Get available rooms
  └── /updateRooms      PUT   - Update room status
```

## Dependencies
- express: Web framework
- cookie-parser: Cookie parsing middleware
- amqplib: RabbitMQ client
- jsonwebtoken: JWT verification

## Security Features
- JWT verification for protected endpoints
- Request body parsing
- Cookie parsing
- Input validation for room status

## Integration Points
1. Authentication Service
   - JWT token verification
2. Booking Service
   - RabbitMQ message queue for status updates