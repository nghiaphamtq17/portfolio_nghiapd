#!/bin/bash

# Deploy script for Portfolio Next.js Application
# Usage: ./deploy.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="portfolio_nghiapd"
APP_DIR="/var/www/$APP_NAME"
BACKUP_DIR="/var/backups/$APP_NAME"
LOG_FILE="/var/log/$APP_NAME/deploy.log"

# Create necessary directories
sudo mkdir -p $BACKUP_DIR
sudo mkdir -p /var/log/$APP_NAME
sudo mkdir -p $APP_DIR

# Function to log messages
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a $LOG_FILE
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1" | tee -a $LOG_FILE
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install dependencies
install_dependencies() {
    log "Installing system dependencies..."
    
    # Update package list
    sudo apt update
    
    # Install essential packages
    sudo apt install -y curl wget git unzip software-properties-common
    
    # Install Docker if not installed
    if ! command_exists docker; then
        log "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
        rm get-docker.sh
    fi
    
    # Install Docker Compose if not installed
    if ! command_exists docker-compose; then
        log "Installing Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi
    
    # Install Node.js if not installed (for local development)
    if ! command_exists node; then
        log "Installing Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt install -y nodejs
    fi
    
    log "Dependencies installed successfully!"
}

# Function to setup SSL certificates
setup_ssl() {
    log "Setting up SSL certificates..."
    
    # Install Certbot
    if ! command_exists certbot; then
        sudo apt install -y certbot python3-certbot-nginx
    fi
    
    # Create SSL directory
    sudo mkdir -p $APP_DIR/ssl
    
    # Generate self-signed certificate for development
    if [ ! -f "$APP_DIR/ssl/cert.pem" ]; then
        log "Generating self-signed SSL certificate..."
        sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout $APP_DIR/ssl/key.pem \
            -out $APP_DIR/ssl/cert.pem \
            -subj "/C=VN/ST=Hanoi/L=Hanoi/O=Portfolio/CN=your-domain.com"
    fi
    
    log "SSL certificates setup completed!"
}

# Function to create backup
create_backup() {
    log "Creating backup..."
    
    if [ -d "$APP_DIR" ]; then
        BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
        sudo cp -r $APP_DIR $BACKUP_DIR/$BACKUP_NAME
        log "Backup created: $BACKUP_DIR/$BACKUP_NAME"
    else
        warning "No existing application found to backup"
    fi
}

# Function to deploy application
deploy_app() {
    log "Starting deployment..."
    
    # Navigate to application directory
    cd $APP_DIR
    
    # Pull latest changes
    log "Pulling latest changes from repository..."
    git pull origin main
    
    # Stop existing containers
    log "Stopping existing containers..."
    docker-compose down || true
    
    # Build and start new containers
    log "Building and starting new containers..."
    docker-compose up -d --build
    
    # Wait for application to be ready
    log "Waiting for application to be ready..."
    sleep 30
    
    # Check if application is running
    if docker-compose ps | grep -q "Up"; then
        log "Application deployed successfully!"
    else
        error "Application deployment failed!"
        exit 1
    fi
    
    # Clean up old images
    log "Cleaning up old Docker images..."
    docker system prune -f
}

# Function to setup monitoring
setup_monitoring() {
    log "Setting up monitoring..."
    
    # Create systemd service for monitoring
    sudo tee /etc/systemd/system/portfolio-monitor.service > /dev/null <<EOF
[Unit]
Description=Portfolio Application Monitor
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
ExecStart=/bin/bash -c 'cd $APP_DIR && docker-compose ps'
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF
    
    sudo systemctl daemon-reload
    sudo systemctl enable portfolio-monitor.service
    
    log "Monitoring setup completed!"
}

# Function to show status
show_status() {
    log "Application Status:"
    echo "=================="
    
    cd $APP_DIR
    docker-compose ps
    
    echo ""
    log "Recent logs:"
    docker-compose logs --tail=20
}

# Function to rollback
rollback() {
    log "Rolling back to previous version..."
    
    # List available backups
    echo "Available backups:"
    ls -la $BACKUP_DIR
    
    read -p "Enter backup name to rollback to: " BACKUP_NAME
    
    if [ -d "$BACKUP_DIR/$BACKUP_NAME" ]; then
        # Stop current application
        cd $APP_DIR
        docker-compose down
        
        # Restore backup
        sudo rm -rf $APP_DIR
        sudo cp -r $BACKUP_DIR/$BACKUP_NAME $APP_DIR
        
        # Start application
        cd $APP_DIR
        docker-compose up -d
        
        log "Rollback completed!"
    else
        error "Backup not found: $BACKUP_NAME"
        exit 1
    fi
}

# Main function
main() {
    case "${1:-deploy}" in
        "install")
            install_dependencies
            ;;
        "ssl")
            setup_ssl
            ;;
        "deploy")
            create_backup
            deploy_app
            ;;
        "status")
            show_status
            ;;
        "rollback")
            rollback
            ;;
        "monitor")
            setup_monitoring
            ;;
        *)
            echo "Usage: $0 {install|ssl|deploy|status|rollback|monitor}"
            echo ""
            echo "Commands:"
            echo "  install  - Install system dependencies"
            echo "  ssl      - Setup SSL certificates"
            echo "  deploy   - Deploy application (default)"
            echo "  status   - Show application status"
            echo "  rollback - Rollback to previous version"
            echo "  monitor  - Setup monitoring"
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
