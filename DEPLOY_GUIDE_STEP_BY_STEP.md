# 🚀 Hướng dẫn Deploy Portfolio Website từ A-Z

## 📋 Tổng quan các bước:

1. **Chuẩn bị VPS** - Cài đặt Docker, Docker Compose
2. **Cấu hình GitHub Secrets** - SSH keys cho CI/CD
3. **Setup Repository trên VPS** - Clone code
4. **Deploy Website** - Chạy containers
5. **Kiểm tra kết quả** - Test website

---

## 🎯 BƯỚC 1: CHUẨN BỊ VPS

### 1.1 Kết nối VPS
```bash
# Từ máy tính của bạn
ssh root@YOUR_VPS_IP
# hoặc mở Console/Web Terminal từ VPS provider
```

### 1.2 Cài đặt Docker
```bash
# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Cài đặt Docker
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### 1.3 Cài đặt Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 1.4 Test Docker
```bash
docker --version
docker-compose --version
```

---

## 🔑 BƯỚC 2: CẤU HÌNH GITHUB SECRETS

### 2.1 Tạo SSH Key trên VPS
```bash
# Tạo SSH key
ssh-keygen -t rsa -b 4096 -C "portfolio@vps" -f ~/.ssh/id_rsa -N ""

# Xem private key (copy toàn bộ)
cat ~/.ssh/id_rsa

# Xem public key
cat ~/.ssh/id_rsa.pub
```

### 2.2 Thêm GitHub Secrets
1. Vào GitHub Repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** và thêm:

```
VPS_HOST = YOUR_VPS_IP
VPS_USERNAME = root
VPS_SSH_KEY = paste-private-key-here
VPS_PORT = 22
```

---

## 📁 BƯỚC 3: SETUP REPOSITORY TRÊN VPS

### 3.1 Tạo thư mục
```bash
sudo mkdir -p /var/www
sudo chown $USER:$USER /var/www
```

### 3.2 Clone repository
```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/portfolio_nghiapd.git
cd portfolio_nghiapd
```

---

## 🚀 BƯỚC 4: DEPLOY WEBSITE

### 4.1 Build và start containers
```bash
cd /var/www/portfolio_nghiapd
docker-compose up -d --build
```

### 4.2 Kiểm tra containers
```bash
# Xem trạng thái
docker-compose ps

# Xem logs
docker-compose logs -f
```

---

## ✅ BƯỚC 5: KIỂM TRA KẾT QUẢ

### 5.1 Test website
```bash
# Test local
curl http://localhost:3000

# Test từ bên ngoài
curl http://YOUR_VPS_IP:3000
```

### 5.2 Mở website
- Truy cập: `http://YOUR_VPS_IP:3000`
- Health check: `http://YOUR_VPS_IP:3000/api/health`

---

## 🔄 BƯỚC 6: CI/CD TỰ ĐỘNG

### 6.1 Push code lên GitHub
```bash
# Từ máy tính của bạn
git add .
git commit -m "Update portfolio"
git push origin main
```

### 6.2 GitHub Actions sẽ tự động:
- Build application
- Deploy lên VPS
- Restart containers

---

## 🆘 TROUBLESHOOTING

### Lỗi thường gặp:

#### 1. "Permission denied"
```bash
sudo chown -R $USER:$USER /var/www/portfolio_nghiapd
```

#### 2. "Docker not found"
```bash
sudo systemctl start docker
sudo usermod -aG docker $USER
# Logout và login lại
```

#### 3. "Port already in use"
```bash
sudo netstat -tulpn | grep :3000
sudo kill -9 PID
```

#### 4. "Container not starting"
```bash
docker-compose logs
docker-compose down
docker-compose up -d --build
```

---

## 📋 CHECKLIST CUỐI CÙNG

- [ ] VPS đã được setup
- [ ] Docker đã được cài đặt
- [ ] GitHub Secrets đã được cấu hình
- [ ] Repository đã được clone
- [ ] Containers đang chạy
- [ ] Website accessible
- [ ] CI/CD hoạt động

---

## 🎯 KẾT QUẢ CUỐI CÙNG

- ✅ **Website**: `http://YOUR_VPS_IP:3000`
- ✅ **Health Check**: `http://YOUR_VPS_IP:3000/api/health`
- ✅ **Auto Deploy**: Mỗi khi push code lên GitHub
- ✅ **Monitoring**: Containers tự động restart nếu crash
