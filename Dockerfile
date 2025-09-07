# ---------- Base Stage ----------
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---------- Dependencies Stage ----------
FROM base AS deps
RUN npm install

# ---------- Builder Stage (for production) ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- Runner Stage (production runtime) ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]

# ---------- Dev Stage (optional) ----------
FROM deps AS dev
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]