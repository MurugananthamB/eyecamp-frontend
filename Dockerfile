# Stage 1: Build frontend with Node.js
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the frontend project
RUN npm run build

# Stage 2: Serve frontend using Nginx
FROM nginx:latest

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend files from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (Optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for frontend access
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
