FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000 6006 1234

ENTRYPOINT [ "yarn", "run" ] 
CMD ["dev"]


# docker run -it --rm -p 1234:1234 -e HOST=0.0.0.0 node:16-alpine npx -y y-websocket --y