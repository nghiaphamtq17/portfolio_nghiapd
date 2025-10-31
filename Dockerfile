FROM node:18-alpine

WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=3000

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
