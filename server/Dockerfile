FROM node:22
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY prisma ./prisma
COPY http ./http
RUN npx prisma generate
RUN mkdir -p /app/http/uploads
EXPOSE 3333
CMD ["npm", "run", "dev"]