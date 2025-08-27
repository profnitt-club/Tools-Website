# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Set environment variables (or use .env file)
# ENV PORT=5000

# Expose the port the app runs on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
