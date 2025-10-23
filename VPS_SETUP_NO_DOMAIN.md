# Hướng dẫn Setup VPS Ubuntu 20.04 không có Domain

## 🔑 Bước 1: Lấy SSH Key từ VPS

### 1.1 Kết nối VPS qua Console/Web Terminal
- Đăng nhập vào VPS provider (DigitalOcean, AWS, Vultr, etc.)
- Mở Console/Web Terminal
- Hoặc sử dụng SSH client nếu đã có key

### 1.2 Tạo SSH Key Pair trên VPS
```bash
# Tạo SSH key pair
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Nhấn Enter để chấp nhận đường dẫn mặc định
# Nhấn Enter để không đặt passphrase (hoặc đặt passphrase nếu muốn)

# Xem public key
cat ~/.ssh/id_rsa.pub

# Xem private key
cat ~/.ssh/id_rsa
```

### 1.3 Copy SSH Keys
```bash
# Copy public key để add vào GitHub
cat ~/.ssh/id_rsa.pub

# Copy private key để add vào GitHub Secrets
cat ~/.ssh/id_rsa
```

## 🐳 Bước 2: Setup Docker trên VPS

### 2.1 Cập nhật hệ thống
```bash
sudo apt update && sudo apt upgrade -y
```

### 2.2 Cài đặt Docker
```bash
# Cài đặt Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Thêm user vào group docker
sudo usermod -aG docker $USER

# Khởi động lại session
exit
# Đăng nhập lại
```

### 2.3 Cài đặt Docker Compose
```bash
# Cài đặt Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Kiểm tra cài đặt
docker --version
docker-compose --version
```

## 📁 Bước 3: Clone và Setup Repository

### 3.1 Clone repository
```bash
# Tạo thư mục
sudo mkdir -p /var/www
sudo chown $USER:$USER /var/www

# Clone repository
cd /var/www
git clone https://github.com/your-username/portfolio_nghiapd.git
cd portfolio_nghiapd
```

### 3.2 Cấu hình cho không có domain
```bash
# Tạo file .env.local
cat > .env.local << EOF
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
EOF
```

## 🌐 Bước 4: Cấu hình Nginx cho IP Address

### 4.1 Cập nhật Nginx config
```bash
# Sửa file nginx config
nano nginx/conf.d/portfolio.conf
```

Thay thế nội dung file `nginx/conf.d/portfolio.conf`:
```nginx
# Portfolio Application Nginx Configuration - IP Only

upstream portfolio_backend {
    server portfolio-app:3000;
    keepalive 32;
}

# HTTP server (no SSL for IP address)
server {
    listen 80;
    server_name _;  # Accept any hostname/IP
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Main application
    location / {
        proxy_pass http://portfolio_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://portfolio_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Cache static files
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # CV file handling
    location /cv/ {
        proxy_pass http://portfolio_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Security for PDF files
        add_header Content-Disposition "attachment";
        add_header X-Content-Type-Options "nosniff";
    }

    # API rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://portfolio_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://portfolio_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        access_log off;
    }

    # Deny access to sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

### 4.2 Cập nhật docker-compose.yml
```bash
# Sửa docker-compose.yml để không cần SSL
nano docker-compose.yml
```

Thay thế nội dung:
```yaml
version: '3.8'

services:
  portfolio-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: portfolio_nghiapd
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    volumes:
      - ./public/cv:/app/public/cv:ro
    networks:
      - portfolio-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  nginx:
    image: nginx:alpine
    container_name: portfolio_nginx
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
    depends_on:
      - portfolio-app
    networks:
      - portfolio-network

networks:
  portfolio-network:
    driver: bridge
```

## 🚀 Bước 5: Deploy Application

### 5.1 Build và chạy containers
```bash
# Build và start containers
docker-compose up -d --build

# Kiểm tra trạng thái
docker-compose ps

# Xem logs
docker-compose logs -f
```

### 5.2 Kiểm tra ứng dụng
```bash
# Kiểm tra health
curl http://localhost:3000/api/health

# Kiểm tra từ bên ngoài (thay YOUR_VPS_IP)
curl http://YOUR_VPS_IP/api/health
```

## 🔧 Bước 6: Cấu hình GitHub Actions

### 6.1 Tạo GitHub Secrets
Vào GitHub Repository > Settings > Secrets and variables > Actions:

```
VPS_HOST=YOUR_VPS_IP
VPS_USERNAME=root  # hoặc username của bạn
VPS_SSH_KEY=paste-private-key-here
VPS_PORT=22
```

### 6.2 Cập nhật GitHub Actions workflow
```bash
# Sửa file GitHub Actions
nano .github/workflows/deploy.yml
```

Cập nhật phần deploy:
```yaml
    - name: Deploy to VPS
      uses: appleboy/ssh-action@v1.0.3
      with:
        host: ${{ secrets.VPS_HOST }}
        username: ${{ secrets.VPS_USERNAME }}
        key: ${{ secrets.VPS_SSH_KEY }}
        port: ${{ secrets.VPS_PORT }}
        script: |
          cd /var/www/portfolio_nghiapd
          git pull origin main
          docker-compose down
          docker-compose up -d --build
          docker system prune -f
```

## 🔥 Bước 7: Cấu hình Firewall

### 7.1 Mở ports cần thiết
```bash
# Cài đặt UFW
sudo ufw enable

# Mở ports
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS (nếu có domain sau này)

# Kiểm tra status
sudo ufw status
```

## 📊 Bước 8: Monitoring và Maintenance

### 8.1 Tạo script monitoring
```bash
# Tạo script kiểm tra
cat > check-status.sh << 'EOF'
#!/bin/bash
echo "=== Portfolio Application Status ==="
echo "Date: $(date)"
echo ""

echo "Docker Containers:"
docker-compose ps
echo ""

echo "Application Health:"
curl -s http://localhost:3000/api/health | jq .
echo ""

echo "Nginx Status:"
curl -s http://localhost/health
echo ""

echo "Disk Usage:"
df -h
echo ""

echo "Memory Usage:"
free -h
echo ""

echo "Docker Images:"
docker images
EOF

chmod +x check-status.sh
```

### 8.2 Tạo cron job để monitor
```bash
# Tạo cron job
crontab -e

# Thêm dòng sau để check mỗi 5 phút
*/5 * * * * cd /var/www/portfolio_nghiapd && ./check-status.sh >> /var/log/portfolio-monitor.log
```

## 🎯 Bước 9: Test Deployment

### 9.1 Test local
```bash
# Test trên VPS
curl http://localhost:3000
curl http://localhost/health
```

### 9.2 Test từ bên ngoài
```bash
# Test từ máy khác (thay YOUR_VPS_IP)
curl http://YOUR_VPS_IP
curl http://YOUR_VPS_IP/health
```

### 9.3 Test GitHub Actions
- Push code lên GitHub
- Kiểm tra Actions tab
- Xem logs deployment

## 🔧 Troubleshooting

### Lỗi thường gặp:

1. **Permission denied**
   ```bash
   sudo chown -R $USER:$USER /var/www/portfolio_nghiapd
   ```

2. **Port đã được sử dụng**
   ```bash
   sudo netstat -tulpn | grep :80
   sudo netstat -tulpn | grep :3000
   ```

3. **Container không start**
   ```bash
   docker-compose logs portfolio-app
   docker-compose down && docker-compose up -d --build
   ```

4. **Nginx không hoạt động**
   ```bash
   docker-compose logs nginx
   docker-compose restart nginx
   ```

## 🎉 Kết quả

Sau khi hoàn thành, website sẽ chạy tại:
- **Local**: http://localhost:3000
- **Public**: http://YOUR_VPS_IP
- **Health Check**: http://YOUR_VPS_IP/api/health

## 📝 Lưu ý quan trọng:

1. **Không có SSL**: Vì không có domain, không thể setup SSL certificate
2. **IP Address**: Website sẽ chạy trên IP address thay vì domain
3. **Security**: Đảm bảo firewall được cấu hình đúng
4. **Backup**: Thường xuyên backup code và data

## 🔄 Cập nhật sau này:

Khi có domain, chỉ cần:
1. Cập nhật `nginx/conf.d/portfolio.conf` với domain
2. Setup SSL certificate với Let's Encrypt
3. Cập nhật DNS records
4. Thêm HTTPS vào docker-compose.yml
