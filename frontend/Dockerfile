# Frontend Dockerfile for Storybook dev mode
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose the Storybook dev port
EXPOSE 3000

# Run Storybook directly (development mode)
CMD ["npx", "storybook", "dev", "-p", "3000", "--ci", "--no-open"]
