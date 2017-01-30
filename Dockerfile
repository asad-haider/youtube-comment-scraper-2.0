FROM node:6-alpine

# Install yarn
RUN npm install --global yarn

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app

RUN yarn run build:prod

EXPOSE 3000
CMD [ "yarn", "run", "start:prod" ]
