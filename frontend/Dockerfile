FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-storybook
CMD ["npx", "http-server", "storybook-static", "-p", "6006"]
