# Stage 1: Build frontend with Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install -y

# Copy the entire project
COPY . .

# Build the frontend project
RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "dev"]