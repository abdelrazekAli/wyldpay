# Use Node.js image to build the React app
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the React source code
COPY . .

# Build the app
RUN npm run build

# Use an NGINX image to serve the built app
FROM nginx:alpine

# Copy built React files to the NGINX container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
