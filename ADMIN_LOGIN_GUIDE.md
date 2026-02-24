# Admin Panel Setup & Login Guide

## 🚀 Quick Start

### Step 1: Start the Backend Server
```bash
cd /Users/samarthdattatraykarale/imperial-time/backend
mvn spring-boot:run
```

You should see messages like:
```
✓ Default admin user created successfully!
  Email: samarthkarale21@gmail.com
  Password: Sam@2003
```

### Step 2: Start the Frontend Server (in another terminal)
```bash
cd /Users/samarthdattatraykarale/imperial-time
npm run dev
```

### Step 3: Access Admin Panel
1. Go to: `http://localhost:5173/admin/login`
2. Enter credentials:
   - **Email**: `samarthkarale21@gmail.com`
   - **Password**: `Sam@2003`
3. Click "Login to Admin Panel"
4. You'll be redirected to the dashboard

---

## 🔧 If Login Still Fails

### Option A: Manual Admin Initialization (Recommended)
If the admin user wasn't created, you can manually initialize it:

```bash
# While backend is running, open a new terminal and run:
curl -X POST http://localhost:8080/api/admin/initialize
```

Response should be:
```json
{
  "message": "Admin user initialized successfully",
  "email": "samarthkarale21@gmail.com",
  "password": "Sam@2003"
}
```

Then try logging in again.

### Option B: Check Backend Logs
Make sure you see this in the backend console:
```
✓ Default admin user created successfully!
  Email: samarthkarale21@gmail.com
  Password: Sam@2003
```

If you see:
```
✓ Admin user already exists
```
Then the user was already created - try login again.

### Option C: Check Admin API Health
```bash
curl http://localhost:8080/api/admin/health
```

Should return: `Admin API is running`

### Option D: Database Check
Access H2 Console to verify admin was created:
1. Go to: `http://localhost:8080/h2-console`
2. Click "Connect" (no password needed)
3. Run query: `SELECT * FROM admins;`

You should see one row with your admin user.

### Option E: Frontend Console Check
Open browser DevTools (F12) → Console tab
- Check for network errors when you click Login
- Check if request goes to `http://localhost:8080/api/admin/login`
- Verify response status (should be 200 for success, 401 for invalid credentials)

---

## 📝 Admin Login Details

| Field | Value |
|-------|-------|
| Email | samarthkarale21@gmail.com |
| Password | Sam@2003 |
| Role | ADMIN |
| Status | Active |

---

## 🔐 Security Updates

The login system now uses:
- **BCrypt Password Encryption** - Passwords are hashed, not stored as plain text
- **Spring Security** - Proper authentication framework
- **CORS Configuration** - Cross-Origin Requests allowed for seamless frontend-backend communication

---

## 🌐 API Endpoints

### Admin Login
```
POST /api/admin/login
Content-Type: application/json

Request Body:
{
  "email": "samarthkarale21@gmail.com",
  "password": "Sam@2003"
}

Response (Success):
{
  "id": 1,
  "email": "samarthkarale21@gmail.com",
  "firstName": "Samarth",
  "lastName": "Karale",
  "role": "ADMIN",
  "token": "admin_token_1"
}

Response (Failure):
HTTP 401 Unauthorized
"Invalid email or password"
```

### Initialize Admin (Manual)
```
POST /api/admin/initialize

Response:
{
  "message": "Admin user initialized successfully",
  "email": "samarthkarale21@gmail.com",
  "password": "Sam@2003"
}
```

### Health Check
```
GET /api/admin/health

Response:
"Admin API is running"
```

---

## 📊 Dashboard Access

Once logged in, you can access:
- **Dashboard Overview** - `/admin/dashboard`
  - Total Revenue
  - Total Orders
  - Total Customers
  - Watches Sold
  - Recent Orders (last 10)
  - Loyal Customers (top 5)

---

## 🐛 Troubleshooting Checklist

- [ ] Backend is running (`mvn spring-boot:run`)
- [ ] Frontend is running (`npm run dev`)
- [ ] Accessing correct URL: `http://localhost:5173/admin/login`
- [ ] Using correct email: `samarthkarale21@gmail.com`
- [ ] Using correct password: `Sam@2003`
- [ ] No typos in email/password
- [ ] Backend logs show "Default admin user created successfully"
- [ ] Network tab in DevTools shows successful response (200) from login endpoint
- [ ] Ports 8080 (backend) and 5173 (frontend) are not blocked

---

## 📞 Need Help?

1. **Check the browser console** (F12 → Console) for JavaScript errors
2. **Check the backend logs** for Java exceptions
3. **Test the API directly**:
   ```bash
   curl -X POST http://localhost:8080/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"email":"samarthkarale21@gmail.com","password":"Sam@2003"}'
   ```
4. **Verify database**:
   - Access H2 Console: `http://localhost:8080/h2-console`
   - Query: `SELECT password FROM admins WHERE email = 'samarthkarale21@gmail.com';`
   - Password should be a long BCrypt hash (not "Sam@2003")

---

## ✅ Everything Working?

If you successfully logged in:
- ✅ You'll see the Admin Dashboard
- ✅ You can view total revenue, orders, and customers
- ✅ You can see recent orders and loyal customers
- ✅ You can logout anytime

**Enjoy your admin panel! 🎉**
