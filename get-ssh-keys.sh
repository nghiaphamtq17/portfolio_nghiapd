#!/bin/bash

# Simple script to get SSH keys from VPS
# Usage: ./get-ssh-keys.sh

echo "=== SSH Key Generator for VPS ==="
echo ""

# Check if SSH key already exists
if [ -f ~/.ssh/id_rsa ]; then
    echo "SSH key already exists!"
    echo ""
    echo "=== SSH PUBLIC KEY (Add to GitHub) ==="
    cat ~/.ssh/id_rsa.pub
    echo ""
    echo "=== SSH PRIVATE KEY (Add to GitHub Secrets) ==="
    cat ~/.ssh/id_rsa
    echo ""
else
    echo "Generating new SSH key pair..."
    ssh-keygen -t rsa -b 4096 -C "portfolio@vps" -f ~/.ssh/id_rsa -N ""
    echo ""
    echo "SSH key generated successfully!"
    echo ""
    echo "=== SSH PUBLIC KEY (Add to GitHub) ==="
    cat ~/.ssh/id_rsa.pub
    echo ""
    echo "=== SSH PRIVATE KEY (Add to GitHub Secrets) ==="
    cat ~/.ssh/id_rsa
    echo ""
fi

# Get VPS IP
VPS_IP=$(curl -s ifconfig.me)
echo "=== VPS INFORMATION ==="
echo "VPS IP Address: $VPS_IP"
echo "Username: $USER"
echo "Port: 22"
echo ""

echo "=== GITHUB SECRETS TO ADD ==="
echo "VPS_HOST=$VPS_IP"
echo "VPS_USERNAME=$USER"
echo "VPS_SSH_KEY=$(cat ~/.ssh/id_rsa)"
echo "VPS_PORT=22"
echo ""

echo "=== NEXT STEPS ==="
echo "1. Copy the SSH PUBLIC KEY and add it to your GitHub account"
echo "2. Copy the GitHub Secrets above and add them to your repository"
echo "3. Run the VPS setup script: ./vps-setup.sh"
echo ""
