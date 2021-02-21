#Stage 1
#Instalacao das dependencias, compilacao e analise do codigo
FROM node:10.23.2-alpine as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm config set package-lock false && \
    yarn install
COPY . .
RUN yarn run build && \
    yarn run lint

#Stage 2
#Imagem final para producao e start da aplicacao
FROM node:10.23.2-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm config set package-lock false && \
    yarn install --production
COPY .env .
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3001
CMD [ "yarn", "run", "start" ]