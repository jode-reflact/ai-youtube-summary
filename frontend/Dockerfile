# Stage 1: Build the Vue.js application
FROM node:18.16.0-alpine3.18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy only the package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Vue.js application for production
RUN npm run build

# Stage 2: Serve the Vue.js application using npm run start
FROM node:18.16.0-alpine3.18

# Set the working directory in the container
WORKDIR /app

# Copy the production build from the first stage
COPY --from=build /app/dist ./dist

# Install serve to run the application
RUN npm install -g serve

# Expose the port that the Vue.js application will listen on
EXPOSE 5173

# Start the Vue.js application using npm run start
CMD ["serve", "-s", "dist", "-l", "5173"]
