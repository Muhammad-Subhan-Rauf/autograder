# Use an official Node.js runtime as a base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/server

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
# Using `npm ci` here is recommended for production builds (it's faster and more reliable for CI/CD)
RUN npm ci --only=production

# Copy the rest of your application's code
COPY . .

# Change working directory to src folder where server.js is located
WORKDIR /usr/src/server/src

# Your app binds to port 3000, so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app
# This could vary depending on how you start your app (e.g., you might use `node server.js`)
CMD [ "node", "server.js" ]
