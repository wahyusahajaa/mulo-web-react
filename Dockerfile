FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install && apk add --no-cache curl

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
