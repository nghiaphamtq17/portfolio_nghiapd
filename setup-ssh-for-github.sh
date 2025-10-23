#!/bin/bash

# Script tự động setup SSH key cho GitHub Actions
# Chạy script này trên VPS

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to log messages
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1"
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO:${NC} $1"
}

echo "🔐 SSH Key Setup cho GitHub Actions"
echo "=================================="
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    warning "Đang chạy với quyền root. Khuyến nghị chạy với user thường."
fi

# Create .ssh directory if not exists
log "Tạo thư mục .ssh..."
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Generate SSH key if not exists
if [ ! -f ~/.ssh/id_rsa ]; then
    log "Tạo SSH key pair..."
    ssh-keygen -t rsa -b 4096 -C "portfolio@vps" -f ~/.ssh/id_rsa -N ""
    log "SSH key pair đã được tạo!"
else
    warning "SSH key đã tồn tại!"
fi

# Set correct permissions
log "Set permission cho SSH keys..."
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
chmod 700 ~/.ssh

# Add public key to authorized_keys
log "Add public key vào authorized_keys..."
if [ ! -f ~/.ssh/authorized_keys ]; then
    touch ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys
fi

# Check if public key already in authorized_keys
if ! grep -q "$(cat ~/.ssh/id_rsa.pub)" ~/.ssh/authorized_keys 2>/dev/null; then
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
    log "Public key đã được add vào authorized_keys!"
else
    warning "Public key đã có trong authorized_keys!"
fi

# Test SSH connection
log "Test SSH connection..."
if ssh -o StrictHostKeyChecking=no -o BatchMode=yes localhost exit 2>/dev/null; then
    log "✅ SSH connection test thành công!"
else
    warning "SSH connection test thất bại. Kiểm tra SSH service..."
    
    # Check SSH service
    if systemctl is-active --quiet ssh; then
        log "SSH service đang chạy"
    else
        error "SSH service không chạy. Khởi động SSH service..."
        sudo systemctl start ssh
        sudo systemctl enable ssh
    fi
fi

# Get VPS IP
VPS_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ipinfo.io/ip 2>/dev/null || echo "YOUR_VPS_IP")

echo ""
info "=== THÔNG TIN GITHUB SECRETS ==="
echo "================================"
echo ""
echo "VPS_HOST = $VPS_IP"
echo "VPS_USERNAME = $USER"
echo "VPS_PORT = 22"
echo ""
echo "VPS_SSH_KEY = (copy nội dung bên dưới)"
echo "----------------------------------------"
cat ~/.ssh/id_rsa
echo "----------------------------------------"
echo ""

echo "📝 HƯỚNG DẪN THÊM VÀO GITHUB:"
echo "=============================="
echo "1. Vào GitHub Repository > Settings > Secrets and variables > Actions"
echo "2. Click 'New repository secret'"
echo "3. Thêm từng secret với tên và giá trị như trên"
echo ""

echo "🧪 TEST SSH CONNECTION:"
echo "======================"
echo "ssh -i ~/.ssh/id_rsa $USER@$VPS_IP"
echo ""

echo "🔧 KIỂM TRA SSH SERVICE:"
echo "======================="
echo "sudo systemctl status ssh"
echo "sudo ufw status"
echo ""

echo "✅ SSH Key setup hoàn thành!"
echo "Bây giờ bạn có thể cấu hình GitHub Secrets."
