# Build stage
FROM node:18 AS builder
WORKDIR /splitter
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18 AS production
WORKDIR /splitter
COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY --from=builder /splitter/.next ./.next

EXPOSE 3000
CMD ["npm", "run", "start"]
