# 第一阶段：构建
FROM node:lts AS builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install --shamefully-hoist
RUN pnpm run build

# 第二阶段：运行时
FROM node:lts
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./
COPY --from=builder /app/package*.json ./
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add --no-cache python3 python3-dev
EXPOSE 3000

CMD ["npm", "start", "3000"]