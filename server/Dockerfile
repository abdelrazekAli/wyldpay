# Use an official Node.js image as the base image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire source code to the container
COPY . .

# Install TypeScript globally
RUN npm install -g typescript nodemon

# Compile TypeScript code
RUN tsc

# Expose the port the app runs on
EXPOSE 8000

# Start the Node.js application
CMD ["npm", "start"]