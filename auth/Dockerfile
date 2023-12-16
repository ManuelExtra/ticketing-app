FROM node:alpine

COPY package.json ./
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]