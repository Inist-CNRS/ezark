# see https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:argon

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Bundle app source
COPY . /app

# Install app dependencies
RUN rm -rf ./node_modules && \
    npm install --production && \
    npm cache clean

RUN mkdir -p /opt/ezmaster/config/
RUN ln -s /app/config.local.json /opt/ezmaster/config/config.json

# run the application
ENTRYPOINT ["/app/docker-entrypoint.sh"]
EXPOSE 3000
