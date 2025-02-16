# Use the base image from Docker Hub
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files (* =>  if file name packages all files inside will be copied)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app will run on
EXPOSE 5173

# Set environment variable to expose the server
ENV HOST 0.0.0.0

# Start the application
CMD ["npm", "run", "dev"]
