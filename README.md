# 🕰️ Imperial Time — Full Stack Luxury Watch E-Commerce

> A complete full-stack e-commerce web application for a luxury watch brand — built with React + Spring Boot + MySQL. Deployed live on Vercel (frontend) and Render (backend) with Aiven cloud MySQL.

---

## 🔗 Live Links

| Service | URL |
|---|---|
| 🌐 Frontend (Production) | https://imperial-time.vercel.app |
| ⚙️ Backend API | https://imperial-time-backend.onrender.com/api |
| 🔐 Admin Panel | https://imperial-time.vercel.app/admin/login |
| 💊 Health Check | https://imperial-time-backend.onrender.com/api/admin/health |

---

## 🧱 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI Framework |
| Vite | 6 | Build tool & dev server |
| React Router DOM | 6 | Client-side routing |
| Context API | built-in | Global state (Auth, Cart) |
| CSS Modules | — | Component-scoped styling |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 21 (LTS) | Language |
| Spring Boot | 3.4.5 | Framework |
| Spring Security | 6 | Auth & CORS |
| Spring Data JPA | — | ORM layer |
| Hibernate | — | JPA implementation |
| BCrypt | — | Password hashing |
| Lombok | — | Boilerplate reduction |
| Maven | 3.9.6 | Build tool |

### Database & Infrastructure
| Service | Technology | Purpose |
|---|---|---|
| Aiven | MySQL 8 | Cloud database |
| Render | Docker | Backend hosting |
| Vercel | CDN + Serverless | Frontend hosting |
| UptimeRobot | Monitoring | Backend keep-alive (ping every 5 min) |

---

## 📁 Project Structure

```
imperial-time/
├── Dockerfile                    # Root-level Docker (used by Render)
├── vercel.json                   # Vercel SPA routing config
├── vite.config.js                # Vite bundler config
├── package.json                  # Frontend dependencies
├── .env                          # Local env vars (VITE_API_BASE_URL)
│
├── src/                          # React frontend source
│   ├── main.jsx                  # App entry point
│   ├── App.jsx                   # Root component
│   ├── routes/
│   │   └── AppRoutes.jsx         # All route definitions
│   ├── context/
│   │   ├── AuthContext.jsx       # User auth global state
│   │   └── CartContext.jsx       # Shopping cart global state
│   ├── services/
│   │   └── api.js                # All API calls (fetch wrappers)
│   ├── pages/
│   │   ├── Home.jsx              # Homepage
│   │   ├── Collections.jsx       # Watch listing + filters
│   │   ├── WatchDetails.jsx      # Single watch detail page
│   │   ├── CartPage.jsx          # Cart page
│   │   ├── Checkout.jsx          # Checkout + UPI payment
│   │   ├── PaymentSuccess.jsx    # Post-payment success
│   │   ├── OrderSuccess.jsx      # Order placed confirmation
│   │   ├── Account.jsx           # User account + order history
│   │   └── Reviews.jsx           # Reviews page
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminLogin.jsx    # Admin login page
│   │   │   ├── AdminLogin.css    
│   │   │   ├── AdminDashboard.jsx # Admin panel (Dashboard + Watch Mgmt)
│   │   │   └── AdminDashboard.css
│   │   ├── auth/
│   │   │   ├── Login.jsx         # User login
│   │   │   └── Register.jsx      # User registration
│   │   ├── home/
│   │   │   ├── HeroSection.jsx   # Landing hero
│   │   │   ├── FeaturedWatches.jsx
│   │   │   ├── CollectionSection.jsx
│   │   │   ├── BrandStory.jsx
│   │   │   ├── SignatureShowcase.jsx
│   │   │   └── PromotionalSection.jsx
│   │   ├── watches/
│   │   │   ├── WatchCard.jsx     # Individual watch card
│   │   │   ├── WatchGrid.jsx     # Grid of watch cards
│   │   │   └── WatchFilter.jsx   # Brand/price filters
│   │   ├── cart/
│   │   │   ├── Cart.jsx          # Cart drawer/modal
│   │   │   └── CartItem.jsx      # Individual cart item
│   │   ├── checkout/
│   │   │   └── UPIPayment.jsx    # UPI payment form
│   │   └── common/
│   │       ├── Navbar.jsx        # Top navigation
│   │       ├── Footer.jsx        # Site footer
│   │       ├── Button.jsx        # Reusable button
│   │       └── Loader.jsx        # Loading spinner
│   └── assets/
│       └── images/               # 19 watch product images
│
└── backend/                      # Spring Boot backend source
    ├── pom.xml                   # Maven dependencies
    └── src/main/java/com/imperialtime/
        ├── ImperialTimeApplication.java   # Entry point
        ├── config/
        │   ├── SecurityConfig.java        # CORS + BCrypt config
        │   └── DataInitializer.java       # Seeds admin on startup
        ├── model/                         # JPA Entities (DB tables)
        │   ├── User.java
        │   ├── Admin.java
        │   ├── Watch.java
        │   ├── Cart.java
        │   ├── CartItem.java
        │   ├── Order.java
        │   └── OrderItem.java
        ├── repository/                    # Spring Data JPA repos
        │   ├── UserRepository.java
        │   ├── AdminRepository.java
        │   ├── WatchRepository.java
        │   ├── CartRepository.java
        │   └── OrderRepository.java
        ├── service/                       # Business logic
        │   ├── AdminService.java
        │   ├── OrderService.java
        │   └── DashboardService.java
        ├── controller/                    # REST API endpoints
        │   ├── AdminController.java
        │   ├── UserController.java
        │   ├── WatchController.java
        │   ├── OrderController.java
        │   └── DashboardController.java
        └── dto/                           # Request/Response objects
            ├── AdminLoginRequest.java
            ├── AdminResponse.java
            ├── UserLoginRequest.java
            ├── UserResponse.java
            ├── CreateOrderRequest.java
            ├── OrderItemRequest.java
            ├── OrderDTO.java
            ├── CustomerDTO.java
            ├── DashboardResponse.java
            └── SalesPoint.java
```

---

## 🗄️ Database Schema

**Database:** MySQL 8 (Aiven Cloud)
**ORM:** Hibernate with `ddl-auto=update` (auto-creates/migrates tables)

### Tables Overview

```
┌─────────────┐       ┌──────────────┐       ┌─────────────────┐
│   users     │──1:1─▶│    carts     │──1:N─▶│   cart_items    │
└─────────────┘       └──────────────┘       └────────┬────────┘
      │                                                │
      │ 1:N                                            │ N:1
      ▼                                                ▼
┌─────────────┐       ┌──────────────┐       ┌─────────────────┐
│   orders    │──1:N─▶│ order_items  │──N:1─▶│     watches     │
└─────────────┘       └──────────────┘       └─────────────────┘

┌─────────────┐
│   admins    │   (completely separate from users)
└─────────────┘
```

### Table: `users`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | Auto-increment |
| email | VARCHAR UNIQUE | Login identifier |
| password | VARCHAR | BCrypt hashed |
| firstName | VARCHAR | |
| lastName | VARCHAR | |
| phoneNumber | VARCHAR | nullable |
| address | VARCHAR | nullable |
| city | VARCHAR | nullable |
| country | VARCHAR | nullable |
| zipCode | VARCHAR | nullable |
| active | BOOLEAN | Soft delete flag |
| createdAt | BIGINT | Epoch milliseconds |
| updatedAt | BIGINT | Epoch milliseconds |

### Table: `watches`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | Auto-increment |
| name | VARCHAR | Product name |
| sku | VARCHAR UNIQUE | Stock Keeping Unit |
| description | VARCHAR(1000) | |
| price | DECIMAL | |
| brand | VARCHAR | nullable |
| model | VARCHAR | nullable |
| color | VARCHAR | nullable |
| material | VARCHAR | nullable |
| movement | VARCHAR | (Automatic/Quartz etc.) |
| warranty | INT | Years |
| stock | INT | Inventory count |
| rating | DOUBLE | Default 0.0 |
| reviews | INT | Review count |
| imageUrl | VARCHAR | |
| active | BOOLEAN | Soft delete flag |
| createdAt | BIGINT | Epoch ms |
| updatedAt | BIGINT | Epoch ms |

### Table: `carts`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | |
| user_id | BIGINT FK | → users.id |
| active | BOOLEAN | |
| createdAt | BIGINT | |
| updatedAt | BIGINT | |

### Table: `cart_items`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | |
| cart_id | BIGINT FK | → carts.id |
| watch_id | BIGINT FK | → watches.id |
| quantity | INT | |
| priceAtAdded | DECIMAL | **Price snapshot** at time of adding |
| createdAt | BIGINT | |
| updatedAt | BIGINT | |

### Table: `orders`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | |
| user_id | BIGINT FK | → users.id |
| status | VARCHAR | PENDING / COMPLETED / CANCELLED / DELIVERED |
| totalAmount | DECIMAL | |
| shippingAddress | VARCHAR | |
| billingAddress | VARCHAR | |
| paymentMethod | VARCHAR | e.g. "UPI - user@upi" |
| trackingNumber | VARCHAR | nullable |
| createdAt | BIGINT | |
| updatedAt | BIGINT | |

### Table: `order_items`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | |
| order_id | BIGINT FK | → orders.id |
| watch_id | BIGINT FK | → watches.id |
| quantity | INT | |
| priceAtOrdered | DECIMAL | **Price snapshot** at time of ordering |
| createdAt | BIGINT | |

### Table: `admins`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | |
| email | VARCHAR UNIQUE | |
| password | VARCHAR | BCrypt hashed |
| firstName | VARCHAR | |
| lastName | VARCHAR | |
| phoneNumber | VARCHAR | nullable |
| role | VARCHAR | Default: "ADMIN" |
| active | BOOLEAN | |
| createdAt | BIGINT | |
| updatedAt | BIGINT | |

---

## 🔌 REST API Reference

**Base URL:** `https://imperial-time-backend.onrender.com/api`

### 👤 User APIs — `/api/users`

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| POST | `/users/register` | Register new user | `{ email, password, firstName, lastName, phoneNumber }` |
| POST | `/users/login` | User login | `{ email, password }` |
| GET | `/users/{id}` | Get user by ID | — |
| GET | `/users/email/{email}` | Get user by email | — |

### 🔐 Admin APIs — `/api/admin`

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| POST | `/admin/login` | Admin login | `{ email, password }` |
| POST | `/admin/initialize` | Seed default admin | — |
| GET | `/admin/health` | Health check | — |

### ⌚ Watch APIs — `/api/watches`

| Method | Endpoint | Description | Params |
|---|---|---|---|
| GET | `/watches` | All watches | — |
| GET | `/watches/paged` | Paginated watches | `?page=0&size=12&sortBy=createdAt&sortDir=desc` |
| GET | `/watches/active` | Active watches only | — |
| GET | `/watches/{id}` | Single watch | — |
| GET | `/watches/search` | Search by name | `?query=rolex` |
| GET | `/watches/brand/{brand}` | Filter by brand | — |
| POST | `/watches` | Create watch (admin) | Watch object |
| PUT | `/watches/{id}` | Update watch (admin) | Watch object |
| DELETE | `/watches/{id}` | Delete watch (admin) | — |

### 🛒 Order APIs — `/api/orders`

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| POST | `/orders/create` | Place new order | `{ userId, items[], totalAmount, shippingAddress, upiId }` |
| GET | `/orders/{orderId}` | Get order by ID | — |
| GET | `/orders/user/{userId}` | Get all orders of a user | — |
| PUT | `/orders/{orderId}/cancel` | Cancel order (within 5 days) | — |

### 📊 Dashboard APIs — `/api/dashboard`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/dashboard/overview` | Stats: revenue, orders, customers, watches sold + recent orders + loyal customers |
| GET | `/dashboard/orders` | All orders list |
| GET | `/dashboard/orders/{orderId}` | Single order details |
| GET | `/dashboard/orders/status/{status}` | Orders filtered by status |
| GET | `/dashboard/loyal-customers` | Top customers (`?limit=5`) |
| GET | `/dashboard/sales/week` | Weekly sales data (`?weeks=4`) |
| GET | `/dashboard/sales/month` | Monthly sales data (`?months=6`) |

---

## 🧭 Frontend Routes

| Route | Component | Access |
|---|---|---|
| `/` | `Home` or `Login` | Redirects to Login if not authenticated |
| `/login` | `Login` | Public |
| `/register` | `Register` | Public |
| `/collections` | `Collections` | Public |
| `/watch/:id` | `WatchDetails` | Public |
| `/reviews` | `Reviews` | Public |
| `/cart` | `CartPage` | Authenticated |
| `/checkout` | `Checkout` | Authenticated |
| `/payment-success` | `PaymentSuccess` | Post-payment |
| `/order-success` | `OrderSuccess` | Post-order |
| `/account` | `Account` | Authenticated |
| `/admin/login` | `AdminLogin` | Public |
| `/admin/dashboard` | `AdminDashboard` | Admin token required |

---

## 🔒 Authentication Flow

### User Authentication
```
Register → BCrypt hash password → Save to users table
Login    → Match BCrypt hash    → Return UserResponse (id, email, name)
         → Store in localStorage & AuthContext
```

### Admin Authentication
```
Login    → Match BCrypt hash against admins table
         → Return token: "admin_token_{id}"
         → Store adminToken + adminUser in localStorage
Dashboard → Check adminToken in localStorage → Show dashboard or redirect to login
```

> **Note:** Token is a simple string (`admin_token_1`). No JWT used — suitable for this scale. For production upgrade, implement JWT.

---

## 🛍️ User Journey (Flow)

```
1. Register / Login
        ↓
2. Browse Home → Collections → Filter by Brand/Price
        ↓
3. Click Watch → WatchDetails Page
        ↓
4. Add to Cart (CartContext updates globally)
        ↓
5. Go to Cart → Review items
        ↓
6. Checkout → Enter shipping info + UPI ID
        ↓
7. Confirm Payment → POST /orders/create
        ↓
8. PaymentSuccess → OrderSuccess page
        ↓
9. Account page → View order history
        ↓
10. Cancel order (within 5 days)
```

---

## 🛠️ Admin Panel Features

### Dashboard Tab
- **Total Revenue** — Sum of all COMPLETED orders
- **Total Orders** — Count of all orders
- **Total Customers** — Unique registered users
- **Watches Sold** — Total units sold across all orders
- **Recent Orders** — Last 10 orders with status badges
- **Loyal Customers** — Top 5 by total spend

### Watch Management Tab
- View all watches in a table (image, name, brand, price, stock, status)
- **Inline Edit** — Click ✏️ Edit → fields become inputs → 💾 Save
- **Toggle Stock** — Mark In Stock / Out of Stock instantly
- **Delete Watch** — Permanent delete with confirmation prompt

---

## ⚙️ Environment Variables

### Frontend (Vercel)
```
VITE_API_BASE_URL=https://imperial-time-backend.onrender.com/api
```

### Backend (Render)
```
DATABASE_URL=jdbc:mysql://mysql-1f2258af-samarthkarale21-b651.a.aivencloud.com:17500/defaultdb?useSSL=true&requireSSL=true&serverTimezone=UTC
DATABASE_USERNAME=avnadmin
DATABASE_PASSWORD=<your-aiven-password>
PORT=8084
```

---

## 🐳 Docker Configuration

```dockerfile
# Stage 1: Build with Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY backend/pom.xml .
RUN mvn dependency:go-offline -q
COPY backend/src ./src
RUN mvn clean package -DskipTests -q

# Stage 2: Run with lightweight JRE
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/imperial-time-backend-1.0.0.jar app.jar
EXPOSE 8084
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Multi-stage build** — Maven build container is discarded, only final JRE image is deployed (~200MB vs ~500MB).

---

## 🚀 Local Development Setup

### Prerequisites
- Java 21
- Maven 3.9+
- Node.js 18+
- MySQL 8 running locally

### Backend
```bash
# Start MySQL locally
brew services start mysql

# Set up local DB
mysql -u root -p
CREATE DATABASE imperialdb;
CREATE USER 'imperialuser'@'localhost' IDENTIFIED BY 'Sam@2003';
GRANT ALL ON imperialdb.* TO 'imperialuser'@'localhost';

# Run backend
cd backend
mvn spring-boot:run
# Runs on http://localhost:8084
```

### Frontend
```bash
# Install dependencies
npm install

# Create .env file
echo "VITE_API_BASE_URL=http://localhost:8084/api" > .env

# Start dev server
npm run dev
# Runs on http://localhost:5173
```

### Admin Login (local)
- URL: `http://localhost:5173/admin/login`
- Email: `samarthkarale21@gmail.com`
- Password: `Sam@2003`

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                        USER                             │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTPS
                          ▼
┌─────────────────────────────────────────────────────────┐
│           VERCEL CDN (Frontend)                         │
│   React 19 + Vite  ·  imperial-time.vercel.app          │
│                                                         │
│  AuthContext ──── CartContext ──── AppRoutes            │
│  Pages: Home, Collections, WatchDetails,                │
│         Cart, Checkout, Account, Admin                  │
└─────────────────────────┬───────────────────────────────┘
                          │ REST API calls (fetch)
                          │ VITE_API_BASE_URL
                          ▼
┌─────────────────────────────────────────────────────────┐
│           RENDER (Backend — Docker)                     │
│   Spring Boot 3.4.5 · Java 21                           │
│   imperial-time-backend.onrender.com                    │
│                                                         │
│  Controllers ──── Services ──── Repositories            │
│  Admin | User | Watch | Order | Dashboard               │
│                                                         │
│  Spring Security (BCrypt + CORS)                        │
└─────────────────────────┬───────────────────────────────┘
                          │ HikariCP (pool size: 5)
                          │ SSL/TLS
                          ▼
┌─────────────────────────────────────────────────────────┐
│           AIVEN MySQL 8 (Cloud Database)                │
│   mysql-1f2258af-...aivencloud.com:17500                │
│                                                         │
│   users · admins · watches · carts                      │
│   cart_items · orders · order_items                     │
└─────────────────────────────────────────────────────────┘
                          ↑
              UptimeRobot pings /api/admin/health
              every 5 min (prevents Render sleep)
```

---

## 🎯 Key Design Decisions (Interview Points)

| Decision | Reason |
|---|---|
| **Price snapshot** in cart_items & order_items | If watch price changes later, old orders/cart won't be affected |
| **Soft delete** (`active=false`) | Data is never lost, audit trail maintained |
| **Epoch ms for timestamps** | Timezone-independent, easy sorting, no Date parsing issues |
| **Separate `admins` table** | Security — admins have different roles/permissions than users |
| **SKU unique constraint** | Real-world inventory standard, prevents duplicate products |
| **Multi-stage Docker build** | Smaller final image — build tools not shipped to production |
| **HikariCP pool size = 5** | Aiven free tier has connection limits |
| **`ddl-auto=update`** | Auto-creates/updates tables on deploy — no migration scripts needed for this scale |
| **CORS `origins = "*"`** | Allows both Vercel and localhost dev without config changes |
| **Context API (not Redux)** | App is small enough — Context is simpler, no extra dependency |

---

## 📦 Frontend API Service Structure (`src/services/api.js`)

```js
adminAPI      → /api/admin/*       (login, health, initialize)
userAPI       → /api/users/*       (register, login, getById)
watchAPI      → /api/watches/*     (getAll, paged, search, filter)
adminWatchAPI → /api/watches/*     (create, update, delete — with auth header)
orderAPI      → /api/orders/*      (create, getById, getByUser, cancel)
dashboardAPI  → /api/dashboard/*   (overview, orders, customers, sales)
salesAPI      → /api/dashboard/sales/* (weekly, monthly)
```

All calls use native `fetch()` — no Axios dependency.

---

## 📊 Order Status Lifecycle

```
[PENDING] ──▶ [COMPLETED]   (set immediately on payment success)
    │
    └──▶ [CANCELLED]   (user can cancel within 5 days)
              
[DELIVERED]   (future — can be set by admin)
[CANCELLED]   (terminal — cannot cancel a delivered order)
```

---

*Built by Samarth Karale · Imperial Time © 2025*
