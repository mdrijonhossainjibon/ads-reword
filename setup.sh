#!/bin/bash

# Setup script for Ubuntu environment
echo "Starting project setup on Ubuntu..."

# Update package lists
echo "Updating package lists..."
sudo apt-get update

# Install Node.js and npm if not present
if ! command -v node &> /dev/null; then
    echo "Installing Node.js and npm..."
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install build essentials
echo "Installing build essentials..."
sudo apt-get install -y build-essential

# Install dependencies
echo "Installing project dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    cp .env.example .env.local
fi

# Build the project
echo "Building the project..."
npm run build

echo "Setup completed successfully!"
echo "You can now run 'npm run dev' to start the development server."
