# Booking Service Microservice API Documentation

## Base URL
```
http://localhost:{PORT}/bookings
```

## Authentication
The service uses JWT tokens stored in cookies for authentication. All protected endpoints require a valid JWT token.

### JWT Cookie Requirements
```
Cookie Name: jwt
HttpOnly: true
```

## Endpoints

### 1. Make a Booking
**POST** `/bookings/makeABooking`

Creates a new booking for a room.

#### Authentication
Requires valid JWT token in cookie

#### Request
```json
{
  "user_name": "string",
  "room_id": "number",
  "start_date": "date",
  "end_date": "date"
}
```

#### Response
- **200 OK**
```json
{
  "message": "Booking Successful"
}
```
- **400 Bad Request**
```json
{
  "message": "Error: Booking not created"
}
```
- **401 Unauthorized**
```json
{
  "message": "No token found"
}
```
- **500 Internal Server Error**
```json
{
  "message": "Error creating the booking"
}
```

### 2. Delete Booking
**DELETE** `/bookings/deleteBookings`

Deletes a booking for a specific user and room.

#### Authentication
Requires valid JWT token in cookie

#### Request
```json
{
  "user_name": "string",
  "room_id": "number"
}
```

#### Response
- **200 OK**
```json
{
  "message": "Booking successfully deleted"
}
```
- **400 Bad Request**
```json
{
  "message": "booking_id or user_name is required"
}
```
- **404 Not Found**
```json
{
  "message": "No bookings found for {user_name}"
}
```
- **500 Internal Server Error**
```json
{
  "message": "Internal server error"
}
```

### 3. Get All User Bookings
**GET** `/bookings/allBookings`

Retrieves all bookings for a specific user.

#### Authentication
Requires valid JWT token in cookie

#### Request
```json
{
  "user_name": "string"
}
```

#### Response
- **200 OK**
```json
{
  "bookings": [
    {
      "booking_id": "number",
      "room_id": "number",
      "start_date": "date",
      "end_date": "date",
      "status": "string"
    }
  ]
}
```
- **400 Bad Request**
```json
{
  "message": "user_name is required"
}
```
- **404 Not Found**
```json
{
  "message": "No bookings found for {user_name}"
}
```
- **500 Internal Server Error**
```json
{
  "message": "Internal Server error"
}
```

### 4. Update Booking Status
**PUT** `/bookings/updateBookings`

Updates the status of a booking.

#### Request
```json
{
  "status": "string",
  "room_id": "number"
}
```

#### Validation
- `status` must be one of: `['pending', 'cancelled', 'confirmed']`

#### Response
- **200 OK**
```json
{
  "message": "Booking status updated successfully"
}
```
- **400 Bad Request**
```json
{
  "message": "Invalid status. Status must be: 'pending', 'cancelled', or 'confirmed'."
}
```
- **404 Not Found**
```json
{
  "message": "booking_id not found"
}
```
- **500 Internal Server Error**
```json
{
  "message": "Internal server error"
}
```

## Message Queue Integration

### RabbitMQ Producer
Sends room status updates to `booking_queue`

#### Message Format
```json
{
  "status": "string",
  "room_id": "number"
}
```


## Environment Variables
```
PORT=<port_number>
JWT_SECRET=<jwt_secret_key>
RABBITMQ_URL=amqp://localhost
LOGIN_SERVICE_URL=http://localhost:4000
```
