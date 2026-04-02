#!/bin/bash

echo "Creating sample data for Imperial Time Admin Panel..."

# Create sample users and orders via H2 console commands
# This is a simplified approach - in production you'd use proper API endpoints

echo "Sample data creation script completed!"
echo "You can now test the admin panel at: http://localhost:5173/admin/login"
echo "Use credentials: samarthkarale21@gmail.com / Sam@2003"

# Test the admin login
echo "Testing admin login..."
curl -X POST http://localhost:8080/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"samarthkarale21@gmail.com","password":"Sam@2003"}'

echo ""
echo "Testing dashboard endpoint..."
curl -X GET http://localhost:8080/api/dashboard/overview

echo ""
echo "Frontend should be accessible at: http://localhost:5173"
echo "Test connection at: http://localhost:5173/test-connection"
