# Imperial Time - Admin Panel Documentation

## Overview
The admin panel is a comprehensive management system for the Imperial Time luxury watch store, allowing administrators to monitor sales, manage orders, and track customer loyalty.

## Admin Panel Features

### 1. Admin Authentication
- **Login Page**: Secure admin login at `/admin/login`
- **Default Admin Credentials**:
  - Email: `samarthkarale21@gmail.com`
  - Password: `Sam@2003`
- Token-based session management with localStorage

### 2. Dashboard Overview
Access at `/admin/dashboard` after login

#### Key Metrics
- **Total Revenue**: Sum of all completed orders in INR
- **Total Orders**: Count of all orders in the system
- **Total Customers**: Count of unique customers who have made orders
- **Watches Sold**: Total units of watches sold across all orders

### 3. Recent Orders Management
- Display of the last 10 orders with:
  - Order ID
  - Customer name and email
  - Order amount in INR
  - Number of items in order
  - Order status (PENDING, COMPLETED, CANCELLED)
  - Order date
- Quick status overview with color-coded badges

### 4. Loyal Customers Section
- Top 5 most valuable customers displayed as cards
- Customer information includes:
  - Full name
  - Email address
  - Phone number
  - Total number of orders
  - Total amount spent (in INR)
  - Last order date
- Sorted by total spending (highest first)

## API Endpoints

### Admin Authentication
```
POST /api/admin/login
Content-Type: application/json

Request:
{
  "email": "samarthkarale21@gmail.com",
  "password": "Sam@2003"
}

Response:
{
  "id": 1,
  "email": "samarthkarale21@gmail.com",
  "firstName": "Samarth",
  "lastName": "Karale",
  "role": "ADMIN",
  "token": "admin_token_1"
}
```

### Dashboard Overview
```
GET /api/dashboard/overview

Response:
{
  "totalRevenue": 150000.00,
  "totalOrders": 45,
  "totalCustomers": 25,
  "totalWatchesSold": 62,
  "recentOrders": [...],
  "loyalCustomers": [...]
}
```

### Get All Orders
```
GET /api/dashboard/orders

Response:
[
  {
    "id": 1,
    "userId": 5,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "totalAmount": 5000.00,
    "status": "COMPLETED",
    "createdAt": 1708693200000,
    "itemCount": 2
  },
  ...
]
```

### Get Orders by Status
```
GET /api/dashboard/orders/status/{status}
Example: GET /api/dashboard/orders/status/COMPLETED

Response:
[
  {
    "id": 1,
    "userId": 5,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "totalAmount": 5000.00,
    "status": "COMPLETED",
    "createdAt": 1708693200000,
    "itemCount": 2
  },
  ...
]
```

### Get Order by ID
```
GET /api/dashboard/orders/{orderId}
Example: GET /api/dashboard/orders/1

Response:
{
  "id": 1,
  "userId": 5,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "totalAmount": 5000.00,
  "status": "COMPLETED",
  "createdAt": 1708693200000,
  "itemCount": 2
}
```

### Get Loyal Customers
```
GET /api/dashboard/loyal-customers?limit=5

Response:
[
  {
    "userId": 5,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNumber": "+91-9876543210",
    "totalOrders": 12,
    "totalSpent": 85000.00,
    "lastOrderDate": 1708693200000
  },
  ...
]
```

## Backend Components

### Models
- **Admin**: Admin user entity with authentication credentials
- **Order**: Orders placed by customers with status tracking
- **OrderItem**: Individual items within an order
- **Cart**: Shopping cart for users
- **CartItem**: Items in a shopping cart
- **User**: Customer user entity
- **Watch**: Watch product entity

### Repositories
- **AdminRepository**: CRUD operations for admin users
- **OrderRepository**: Specialized queries for order analytics
- **CartRepository**: Cart management queries
- **UserRepository**: User management queries
- **WatchRepository**: Product queries

### Services
- **AdminService**: Admin authentication and user management
- **DashboardService**: Analytics and reporting calculations

### Controllers
- **AdminController**: Admin login endpoint
- **DashboardController**: All dashboard and analytics endpoints

### Configuration
- **DataInitializer**: Automatically creates the default admin user on application startup

## Frontend Components

### AdminLogin.jsx
- Login form for admin panel access
- Email and password fields
- Token storage in localStorage
- Demo credentials display
- Error handling

### AdminDashboard.jsx
- Main dashboard view after successful login
- Displays all metrics and statistics
- Recent orders table
- Loyal customers section
- Logout functionality

## Security Features
- Token-based authentication
- Admin credentials stored securely
- CORS enabled for API calls
- Session management via localStorage

## Accessing the Admin Panel
1. Navigate to `http://localhost:3000/admin/login`
2. Enter credentials:
   - Email: `samarthkarale21@gmail.com`
   - Password: `Sam@2003`
3. Click "Login to Admin Panel"
4. You will be redirected to the dashboard
5. View all analytics, orders, and customer data

## Technologies Used
- **Backend**: Spring Boot 3.2.0, Java 21 LTS, Spring Data JPA, Lombok
- **Frontend**: React 18, React Router, CSS3
- **Database**: H2 Database (Development), MySQL (Production Ready)
- **Build**: Maven 3.9.11

## Future Enhancements
- Download revenue reports as PDF/Excel
- Export customer data
- Order status update functionality
- Customer communication tools
- Advanced filtering and search
- Real-time notifications
- Charts and graph visualizations
