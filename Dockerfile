# Step 1: Use an official Node.js image to build the app
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire application
COPY . .

# Build the app (outputs to 'dist/')
RUN npm run build

# Step 2: Use nginx to serve the built files
FROM nginx:alpine

# Copy the built files from the 'dist' directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
