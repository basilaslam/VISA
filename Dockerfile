# Use a Node.js image as the base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package.json .

RUN rm -rf node_modules package-lock.json && npm install

# Install dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

# Build the Next.js application

RUN npm run build

# Expose the desired port (if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]