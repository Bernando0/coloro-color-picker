# --- Stage 1: build ---
FROM node:18-alpine AS builder

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем package.json и lock-файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --frozen-lockfile

# Копируем проект
COPY . .

# Собираем Next.js
RUN npm run build

# --- Stage 2: production ---
FROM node:18-alpine AS runner

WORKDIR /app

# Устанавливаем только production-зависимости
COPY package*.json ./
RUN npm install --omit=dev --frozen-lockfile

# Копируем сборку из builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=3001

# Пробрасываем порт
EXPOSE 3001

# Запускаем Next.js
CMD ["npm", "run", "start"]
