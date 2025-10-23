# 🚨 Sửa lỗi VPS Ubuntu Focal và Docker Installation

## ❌ Các lỗi hiện tại:

1. **Ubuntu Focal đã end-of-life** - VPS đang dùng Ubuntu 20.04 cũ
2. **Docker installation thất bại** - `docker-model-plugin` không tồn tại
3. **Git clone thất bại** - Không thể đọc username từ GitHub
4. **Repository không được clone** - Thư mục không tồn tại

## ✅ Cách sửa:

### Phương án 1: Setup thủ công trên VPS (khuyến nghị)

```bash
# Kết nối VPS
ssh root@YOUR_VPS_IP

# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker manually
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index
sudo apt-get update

# Install Docker
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create directory and clone repository
sudo mkdir -p /var/www
sudo chown $USER:$USER /var/www
cd /var/www
git clone https://github.com/YOUR_USERNAME/portfolio_nghiapd.git

# Test Docker
docker --version
docker-compose --version
```

### Phương án 2: Sử dụng script setup

```bash
# Trên VPS
wget https://raw.githubusercontent.com/YOUR_USERNAME/portfolio_nghiapd/main/vps-setup.sh
chmod +x vps-setup.sh
./vps-setup.sh all
```

### Phương án 3: GitHub Actions tự động (đã cập nhật)

- ✅ Workflow đã được cập nhật để xử lý Ubuntu Focal
- ✅ Docker installation đã được sửa
- ✅ Git clone đã được cải thiện với fallback SSH
- ✅ Error handling đã được thêm

## 🔧 Troubleshooting:

### Lỗi "Ubuntu Focal end-of-life":
- ✅ Workflow đã được cập nhật để xử lý Ubuntu Focal
- ✅ Sử dụng manual Docker installation thay vì get.docker.com

### Lỗi "docker-model-plugin not found":
- ✅ Đã loại bỏ package không tồn tại
- ✅ Chỉ cài đặt các package cần thiết

### Lỗi "could not read Username":
- ✅ Đã thêm fallback SSH clone
- ✅ Setup SSH agent và known_hosts

### Lỗi "No such file or directory":
- ✅ Đã thêm error handling
- ✅ Kiểm tra repository tồn tại trước khi cd

## 📋 Checklist:

- [ ] VPS đã được update
- [ ] Docker đã được cài đặt đúng cách
- [ ] Docker Compose đã được cài đặt
- [ ] Repository đã được clone
- [ ] Docker service đang chạy
- [ ] User có quyền truy cập Docker

## 🧪 Test:

```bash
# Kiểm tra Docker
docker --version
docker-compose --version

# Kiểm tra repository
ls -la /var/www/portfolio_nghiapd

# Test deployment
cd /var/www/portfolio_nghiapd
docker-compose up -d --build
```

## 🔄 Sau khi sửa:

1. Push code lên GitHub
2. Vào Actions tab
3. Xem workflow chạy
4. VPS sẽ được setup tự động với error handling tốt hơn
