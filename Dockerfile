# 第一阶段：构建
# FROM do.nark.eu.org/library/node:20 AS builder

FROM node:lts AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

EXPOSE 3000
CMD ["npm", "start", "3000"]

# 第二阶段：运行时
# FROM do.nark.eu.org/library/node:20
# WORKDIR /app
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.env ./
# COPY --from=builder /app/package*.json ./
# EXPOSE 3000

# CMD ["pnpm", "start", "3000"]