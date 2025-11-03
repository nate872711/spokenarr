FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "npm run storybook -- --host 0.0.0.0 -p 3000"]
