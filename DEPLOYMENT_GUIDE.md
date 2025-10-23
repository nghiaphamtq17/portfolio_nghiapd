# Hướng dẫn Deploy Portfolio Next.js lên VPS

## 📋 Yêu cầu hệ thống

- **VPS**: Ubuntu 20.04+ hoặc CentOS 8+
- **RAM**: Tối thiểu 2GB (khuyến nghị 4GB+)
- **Storage**: Tối thiểu 20GB
- **Domain**: Có domain name trỏ về VPS (tùy chọn)

## 🚀 Bước 1: Chuẩn bị VPS

### 1.1 Kết nối SSH vào VPS
```bash
ssh root@your-vps-ip
# hoặc
ssh username@your-vps-ip
```

### 1.2 Cập nhật hệ thống
```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS/RHEL
sudo yum update -y
```

### 1.3 Tạo user mới (khuyến nghị)
```bash
# Tạo user mới
sudo adduser deploy
sudo usermod -aG sudo deploy

# Chuyển sang user mới
su - deploy
```

## 🐳 Bước 2: Cài đặt Docker và Docker Compose

### 2.1 Cài đặt Docker
```bash
# Cài đặt Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Thêm user vào group docker
sudo usermod -aG docker $USER

# Khởi động lại session
exit
ssh deploy@your-vps-ip
```

### 2.2 Cài đặt Docker Compose
```bash
# Cài đặt Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Kiểm tra cài đặt
docker --version
docker-compose --version
```

## 📁 Bước 3: Clone Repository

### 3.1 Clone code từ GitHub
```bash
# Tạo thư mục cho ứng dụng
sudo mkdir -p /var/www
sudo chown $USER:$USER /var/www

# Clone repository
cd /var/www
git clone https://github.com/your-username/portfolio_nghiapd.git
cd portfolio_nghiapd
```

### 3.2 Cấu hình Git (nếu cần)
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

## 🔧 Bước 4: Cấu hình Ứng dụng

### 4.1 Cấu hình Next.js cho Production
Tạo file `next.config.ts`:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  images: {
    domains: ['localhost'],
  },
  env: {
    NODE_ENV: 'production',
  },
}

module.exports = nextConfig
```

### 4.2 Cấu hình Environment Variables
Tạo file `.env.local`:
```bash
# Production Environment Variables
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## 🌐 Bước 5: Cấu hình Domain và SSL

### 5.1 Cấu hình DNS
Trỏ domain về VPS:
```
A    your-domain.com        -> VPS_IP
A    www.your-domain.com    -> VPS_IP
```

### 5.2 Cài đặt SSL Certificate
```bash
# Cài đặt Certbot
sudo apt install certbot python3-certbot-nginx -y

# Tạo SSL certificate
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# Tự động gia hạn
sudo crontab -e
# Thêm dòng:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

### 5.3 Cập nhật Nginx Configuration
Sửa file `nginx/conf.d/portfolio.conf`:
```nginx
# Thay đổi domain
server_name your-domain.com www.your-domain.com;

# Cập nhật SSL certificate path
ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
```

## 🚀 Bước 6: Deploy Ứng dụng

### 6.1 Sử dụng Deploy Script
```bash
# Cấp quyền thực thi
chmod +x deploy.sh

# Cài đặt dependencies
./deploy.sh install

# Setup SSL
./deploy.sh ssl

# Deploy ứng dụng
./deploy.sh deploy
```

### 6.2 Deploy thủ công
```bash
# Build và chạy containers
docker-compose up -d --build

# Kiểm tra trạng thái
docker-compose ps
docker-compose logs -f
```

## 🔍 Bước 7: Kiểm tra và Monitoring

### 7.1 Kiểm tra ứng dụng
```bash
# Kiểm tra containers
docker-compose ps

# Xem logs
docker-compose logs portfolio-app

# Kiểm tra health
curl http://localhost:3000/api/health
```

### 7.2 Cấu hình Firewall
```bash
# Ubuntu/Debian
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# CentOS/RHEL
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## 🔄 Bước 8: Cấu hình CI/CD với GitHub Actions

### 8.1 Tạo GitHub Secrets
Vào GitHub Repository > Settings > Secrets and variables > Actions:

```
VPS_HOST=your-vps-ip
VPS_USERNAME=deploy
VPS_SSH_KEY=your-private-ssh-key
VPS_PORT=22
```

### 8.2 SSH Key Setup
```bash
# Tạo SSH key pair trên local machine
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Copy public key lên VPS
ssh-copy-id deploy@your-vps-ip

# Copy private key vào GitHub Secrets
cat ~/.ssh/id_rsa
```

## 📊 Bước 9: Monitoring và Maintenance

### 9.1 Setup Log Rotation
```bash
sudo tee /etc/logrotate.d/portfolio > /dev/null <<EOF
/var/log/portfolio_nghiapd/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 deploy deploy
}
EOF
```

### 9.2 Setup Backup
```bash
# Tạo script backup
sudo tee /usr/local/bin/backup-portfolio.sh > /dev/null <<EOF
#!/bin/bash
BACKUP_DIR="/var/backups/portfolio_nghiapd"
DATE=\$(date +%Y%m%d_%H%M%S)
tar -czf \$BACKUP_DIR/backup_\$DATE.tar.gz /var/www/portfolio_nghiapd
find \$BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete
EOF

sudo chmod +x /usr/local/bin/backup-portfolio.sh

# Tạo cron job backup hàng ngày
sudo crontab -e
# Thêm dòng:
# 0 2 * * * /usr/local/bin/backup-portfolio.sh
```

## 🛠️ Troubleshooting

### Lỗi thường gặp:

1. **Container không start**
   ```bash
   docker-compose logs portfolio-app
   docker-compose down && docker-compose up -d --build
   ```

2. **SSL Certificate lỗi**
   ```bash
   sudo certbot renew --dry-run
   sudo systemctl reload nginx
   ```

3. **Permission denied**
   ```bash
   sudo chown -R $USER:$USER /var/www/portfolio_nghiapd
   ```

4. **Port đã được sử dụng**
   ```bash
   sudo netstat -tulpn | grep :80
   sudo netstat -tulpn | grep :443
   ```

## 📞 Support

Nếu gặp vấn đề, hãy kiểm tra:
- Logs: `docker-compose logs -f`
- Status: `docker-compose ps`
- Health: `curl http://localhost:3000/api/health`

## 🎉 Hoàn thành!

Sau khi hoàn thành tất cả các bước, website của bạn sẽ được deploy tại:
- **HTTP**: http://your-domain.com
- **HTTPS**: https://your-domain.com

Website sẽ tự động deploy mỗi khi bạn push code lên branch `main`!
