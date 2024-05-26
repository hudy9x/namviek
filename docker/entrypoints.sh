#!/bin/sh

# This script is used to start the application.

echo "Starting application..."

# Check if Prisma commands have already been executed
if [ ! -f "/app/.prisma_initialized" ]; then
  echo "Running yarn generate2..."
  yarn generate2
  echo "yarn generate2 completed."

  echo "Running yarn pushdb2..."
  yarn pushdb2
  echo "yarn pushdb2 completed."

  echo "Running yarn seed2 user..."
  yarn seed2 user
  echo "yarn seed2 completed."

  # Create a marker file to indicate that Prisma commands have been executed
  touch /app/.prisma_initialized
else
  echo "Prisma initialization already done, skipping..."
fi
