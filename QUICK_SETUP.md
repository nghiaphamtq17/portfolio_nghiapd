# 🚀 Hướng dẫn nhanh: Setup VPS Ubuntu 20.04 không có Domain

## 📋 Yêu cầu
- VPS Ubuntu 20.04
- GitHub repository đã có code
- Quyền root/sudo trên VPS

## ⚡ Setup nhanh trong 5 phút

### Bước 1: Kết nối VPS
```bash
# Kết nối qua SSH hoặc Console của VPS provider
ssh root@YOUR_VPS_IP
# hoặc mở Console/Web Terminal từ VPS provider
```

### Bước 2: Tải và chạy script setup
```bash
# Tải script setup
wget https://raw.githubusercontent.com/your-username/portfolio_nghiapd/main/vps-setup.sh
chmod +x vps-setup.sh

# Chạy setup tự động
./vps-setup.sh all
```

### Bước 3: Lấy SSH keys
```bash
# Chạy script lấy SSH keys
chmod +x get-ssh-keys.sh
./get-ssh-keys.sh
```

### Bước 4: Cấu hình GitHub Secrets
1. Vào GitHub Repository > Settings > Secrets and variables > Actions
2. Thêm các secrets sau:
   ```
   VPS_HOST=YOUR_VPS_IP
   VPS_USERNAME=root
   VPS_SSH_KEY=paste-private-key-here
   VPS_PORT=22
   ```

### Bước 5: Test deployment
```bash
# Kiểm tra trạng thái
./vps-setup.sh status

# Test ứng dụng
curl http://YOUR_VPS_IP/api/health
```

## 🎯 Kết quả
- Website chạy tại: `http://YOUR_VPS_IP`
- Health check: `http://YOUR_VPS_IP/api/health`
- Tự động deploy khi push code lên GitHub

## 🔧 Commands hữu ích

```bash
# Xem trạng thái
./vps-setup.sh status

# Restart ứng dụng
docker-compose restart

# Xem logs
docker-compose logs -f

# Update code
git pull origin main
docker-compose up -d --build
```

## 🆘 Troubleshooting

### Lỗi permission denied
```bash
sudo chown -R $USER:$USER /var/www/portfolio_nghiapd
```

### Container không start
```bash
docker-compose logs
docker-compose down && docker-compose up -d --build
```

### Port đã được sử dụng
```bash
sudo netstat -tulpn | grep :80
sudo ufw status
```

## 📞 Support
Nếu gặp vấn đề, kiểm tra:
- Logs: `docker-compose logs -f`
- Status: `docker-compose ps`
- Health: `curl http://localhost:3000/api/health`
