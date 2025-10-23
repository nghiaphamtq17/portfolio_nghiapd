#!/bin/bash

# Simple VPS setup script for portfolio
echo "🚀 Setting up portfolio deployment..."

# Install Docker if not exists
if ! command -v docker &> /dev/null; then
  echo "📦 Installing Docker..."
  sudo apt-get update
  sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt-get update
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io
  sudo usermod -aG docker $USER
fi

# Install Docker Compose if not exists
if ! command -v docker-compose &> /dev/null; then
  echo "📦 Installing Docker Compose..."
  sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi

# Create directory and clone repository
sudo mkdir -p /var/www
sudo chown $USER:$USER /var/www
cd /var/www

if [ ! -d "portfolio_nghiapd" ]; then
  echo "📥 Cloning repository..."
  git clone https://github.com/YOUR_USERNAME/portfolio_nghiapd.git
fi

cd portfolio_nghiapd

# Deploy
echo "🐳 Deploying containers..."
docker-compose down || true
docker-compose up -d --build

echo "✅ Deployment completed!"
echo "Website: http://YOUR_VPS_IP:3000"
docker-compose ps
