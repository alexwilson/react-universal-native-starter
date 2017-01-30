FROM node:7.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN npm install -g rn-nodeify
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
COPY package.json yarn.lock ./
RUN $HOME/.yarn/bin/yarn install --pure-lockfile

COPY . /usr/src/app
RUN npm run build || exit 2

EXPOSE 4545

CMD npm run start-prod
