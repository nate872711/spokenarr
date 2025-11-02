FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3000 6006
# Start both dev server and storybook; use a lightweight process manager approach
CMD ["sh", "-c", "npm run dev & npm run storybook"]
