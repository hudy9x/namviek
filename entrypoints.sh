#!/bin/sh

# This script is used to start the application.

echo "Starting application..."

echo "Running yarn generate2..."
yarn generate2
echo "yarn generate2 completed."

echo "Running yarn pushdb2..."
yarn pushdb2
echo "yarn pushdb2 completed."

echo "Running yarn seed2 user..."
yarn seed2 user
echo "yarn seed2 completed."

echo "Running backend and frontend.."
yarn backend &
yarn frontend
