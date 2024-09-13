#!/bin/bash

# Navigate to the frontend folder, install dependencies, and run npm start
cd frontend
echo "Installing dependencies for frontend..."
npm install
echo "Starting frontend..."
npm start &

# Navigate to the backend folder, install dependencies, and run npm start
cd ../backend
echo "Installing dependencies for backend..."
npm install
echo "Starting backend..."
npm start &

# Wait for both processes to finish
wait

echo "Frontend and backend are running."