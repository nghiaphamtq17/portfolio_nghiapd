#!/bin/bash

# Script để lấy SSH keys cho GitHub Secrets
# Chạy script này trên VPS để lấy thông tin cần thiết

echo "🔑 SSH Keys cho GitHub Secrets"
echo "=============================="
echo ""

# Kiểm tra SSH key có tồn tại không
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "❌ SSH key chưa tồn tại!"
    echo "Tạo SSH key mới..."
    ssh-keygen -t rsa -b 4096 -C "portfolio@vps" -f ~/.ssh/id_rsa -N ""
    echo "✅ SSH key đã được tạo!"
    echo ""
fi

# Lấy VPS IP
VPS_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ipinfo.io/ip 2>/dev/null || echo "YOUR_VPS_IP")

echo "📋 Thông tin GitHub Secrets:"
echo "============================="
echo ""
echo "1. VPS_HOST = $VPS_IP"
echo "2. VPS_USERNAME = $USER"
echo "3. VPS_PORT = 22"
echo ""
echo "4. VPS_SSH_KEY = (copy nội dung bên dưới)"
echo "----------------------------------------"
cat ~/.ssh/id_rsa
echo "----------------------------------------"
echo ""

echo "📝 Hướng dẫn thêm vào GitHub:"
echo "============================="
echo "1. Vào GitHub Repository > Settings > Secrets and variables > Actions"
echo "2. Click 'New repository secret'"
echo "3. Thêm từng secret với tên và giá trị như trên"
echo ""

echo "🧪 Test SSH connection:"
echo "======================"
echo "ssh -i ~/.ssh/id_rsa $USER@$VPS_IP"
echo ""

echo "✅ Hoàn thành! Bây giờ bạn có thể cấu hình GitHub Secrets."
