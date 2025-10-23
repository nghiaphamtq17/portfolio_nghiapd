#!/bin/bash

# Quick Setup Script for VPS Ubuntu 20.04 (No Domain)
# Usage: ./vps-setup.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
VPS_IP=$(curl -s ifconfig.me)
APP_NAME="portfolio_nghiapd"
APP_DIR="/var/www/$APP_NAME"

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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to get user input
get_input() {
    read -p "$1: " input
    echo $input
}

# Function to generate SSH key
generate_ssh_key() {
    log "Generating SSH key pair..."
    
    if [ ! -f ~/.ssh/id_rsa ]; then
        ssh-keygen -t rsa -b 4096 -C "portfolio@vps" -f ~/.ssh/id_rsa -N ""
        log "SSH key pair generated successfully!"
    else
        warning "SSH key already exists!"
    fi
    
    echo ""
    info "=== SSH PUBLIC KEY (Add to GitHub) ==="
    cat ~/.ssh/id_rsa.pub
    echo ""
    
    info "=== SSH PRIVATE KEY (Add to GitHub Secrets) ==="
    cat ~/.ssh/id_rsa
    echo ""
    
    info "VPS IP Address: $VPS_IP"
    echo ""
}

# Function to install dependencies
install_dependencies() {
    log "Installing system dependencies..."
    
    # Update package list
    sudo apt update
    
    # Install essential packages
    sudo apt install -y curl wget git unzip software-properties-common jq
    
    # Install Docker if not installed
    if ! command_exists docker; then
        log "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
        rm get-docker.sh
        log "Docker installed successfully!"
    else
        warning "Docker already installed!"
    fi
    
    # Install Docker Compose if not installed
    if ! command_exists docker-compose; then
        log "Installing Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        log "Docker Compose installed successfully!"
    else
        warning "Docker Compose already installed!"
    fi
    
    # Install Node.js if not installed
    if ! command_exists node; then
        log "Installing Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt install -y nodejs
        log "Node.js installed successfully!"
    else
        warning "Node.js already installed!"
    fi
    
    log "All dependencies installed successfully!"
}

# Function to setup firewall
setup_firewall() {
    log "Setting up firewall..."
    
    # Install UFW if not installed
    sudo apt install -y ufw
    
    # Configure firewall
    sudo ufw --force enable
    sudo ufw allow 22/tcp    # SSH
    sudo ufw allow 80/tcp     # HTTP
    sudo ufw allow 443/tcp    # HTTPS
    
    log "Firewall configured successfully!"
    sudo ufw status
}

# Function to clone repository
clone_repository() {
    log "Setting up application directory..."
    
    # Create application directory
    sudo mkdir -p $APP_DIR
    sudo chown $USER:$USER $APP_DIR
    
    # Check if repository exists
    if [ ! -d "$APP_DIR/.git" ]; then
        info "Please provide your GitHub repository URL:"
        REPO_URL=$(get_input "GitHub repository URL (e.g., https://github.com/username/portfolio_nghiapd.git)")
        
        if [ -n "$REPO_URL" ]; then
            log "Cloning repository..."
            git clone $REPO_URL $APP_DIR
            log "Repository cloned successfully!"
        else
            error "Repository URL is required!"
            exit 1
        fi
    else
        warning "Repository already exists!"
    fi
}

# Function to configure application
configure_application() {
    log "Configuring application for VPS deployment..."
    
    cd $APP_DIR
    
    # Create .env.local
    cat > .env.local << EOF
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
EOF
    
    # Update nginx config for IP only
    cat > nginx/conf.d/portfolio.conf << 'EOF'
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
EOF
    
    # Update docker-compose.yml for IP only
    cat > docker-compose.yml << 'EOF'
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
EOF
    
    log "Application configured successfully!"
}

# Function to deploy application
deploy_application() {
    log "Deploying application..."
    
    cd $APP_DIR
    
    # Build and start containers
    log "Building and starting containers..."
    docker-compose up -d --build
    
    # Wait for application to be ready
    log "Waiting for application to be ready..."
    sleep 30
    
    # Check if application is running
    if docker-compose ps | grep -q "Up"; then
        log "Application deployed successfully!"
    else
        error "Application deployment failed!"
        docker-compose logs
        exit 1
    fi
    
    # Clean up old images
    log "Cleaning up old Docker images..."
    docker system prune -f
}

# Function to test deployment
test_deployment() {
    log "Testing deployment..."
    
    # Test local
    log "Testing local connection..."
    if curl -s http://localhost:3000/api/health > /dev/null; then
        log "✓ Local application is running"
    else
        error "✗ Local application is not responding"
    fi
    
    # Test nginx
    log "Testing nginx proxy..."
    if curl -s http://localhost/health > /dev/null; then
        log "✓ Nginx proxy is working"
    else
        error "✗ Nginx proxy is not working"
    fi
    
    # Test public access
    log "Testing public access..."
    if curl -s http://$VPS_IP/api/health > /dev/null; then
        log "✓ Public access is working"
    else
        error "✗ Public access is not working"
    fi
    
    echo ""
    info "=== Application URLs ==="
    echo "Local: http://localhost:3000"
    echo "Public: http://$VPS_IP"
    echo "Health: http://$VPS_IP/api/health"
    echo ""
}

# Function to show status
show_status() {
    log "Application Status:"
    echo "=================="
    
    cd $APP_DIR
    docker-compose ps
    
    echo ""
    log "Recent logs:"
    docker-compose logs --tail=10
}

# Function to create monitoring script
create_monitoring() {
    log "Creating monitoring script..."
    
    cd $APP_DIR
    
    cat > check-status.sh << 'EOF'
#!/bin/bash
echo "=== Portfolio Application Status ==="
echo "Date: $(date)"
echo ""

echo "Docker Containers:"
docker-compose ps
echo ""

echo "Application Health:"
curl -s http://localhost:3000/api/health | jq . 2>/dev/null || echo "Health check failed"
echo ""

echo "Nginx Status:"
curl -s http://localhost/health || echo "Nginx health check failed"
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
    
    # Create cron job
    (crontab -l 2>/dev/null; echo "*/5 * * * * cd $APP_DIR && ./check-status.sh >> /var/log/portfolio-monitor.log") | crontab -
    
    log "Monitoring script created successfully!"
}

# Function to show GitHub setup instructions
show_github_setup() {
    echo ""
    info "=== GitHub Actions Setup ==="
    echo ""
    echo "1. Go to your GitHub repository"
    echo "2. Navigate to Settings > Secrets and variables > Actions"
    echo "3. Add the following secrets:"
    echo ""
    echo "   VPS_HOST=$VPS_IP"
    echo "   VPS_USERNAME=$USER"
    echo "   VPS_SSH_KEY=$(cat ~/.ssh/id_rsa)"
    echo "   VPS_PORT=22"
    echo ""
    echo "4. Push code to main branch to trigger deployment"
    echo ""
}

# Main function
main() {
    echo ""
    log "=== VPS Setup for Portfolio Application ==="
    echo ""
    
    case "${1:-all}" in
        "ssh")
            generate_ssh_key
            ;;
        "install")
            install_dependencies
            ;;
        "firewall")
            setup_firewall
            ;;
        "clone")
            clone_repository
            ;;
        "config")
            configure_application
            ;;
        "deploy")
            deploy_application
            ;;
        "test")
            test_deployment
            ;;
        "status")
            show_status
            ;;
        "monitor")
            create_monitoring
            ;;
        "github")
            show_github_setup
            ;;
        "all")
            generate_ssh_key
            install_dependencies
            setup_firewall
            clone_repository
            configure_application
            deploy_application
            test_deployment
            create_monitoring
            show_github_setup
            ;;
        *)
            echo "Usage: $0 {ssh|install|firewall|clone|config|deploy|test|status|monitor|github|all}"
            echo ""
            echo "Commands:"
            echo "  ssh      - Generate SSH keys"
            echo "  install  - Install dependencies"
            echo "  firewall - Setup firewall"
            echo "  clone    - Clone repository"
            echo "  config   - Configure application"
            echo "  deploy   - Deploy application"
            echo "  test     - Test deployment"
            echo "  status   - Show status"
            echo "  monitor  - Setup monitoring"
            echo "  github   - Show GitHub setup instructions"
            echo "  all      - Run all steps (default)"
            exit 1
            ;;
    esac
    
    echo ""
    log "Setup completed successfully!"
    echo ""
}

# Run main function
main "$@"
