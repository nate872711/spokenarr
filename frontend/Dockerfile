FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all frontend source
COPY . .

# Expose ports for Vite (3000) and Storybook (6006)
EXPOSE 3000 6006

# Ensure scripts run in proper PATH and both processes stay alive
CMD [ "sh", "-c", "npm run dev & npm run storybook -- --ci --no-open" ]
