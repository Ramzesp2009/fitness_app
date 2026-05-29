FROM node:22-alpine
WORKDIR /app
# Копіюємо package.json
COPY package*.json ./
# Встановлюємо залежності
RUN npm install
# Копіюємо весь код
COPY . .
# Генеруємо Prisma Client
RUN npx prisma generate
# Компілюємо TypeScript
# RUN npm run build
EXPOSE 3000
CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && node src/index.js"]