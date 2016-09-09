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


# data folder is a volume because it will
# contains the user's data files (ex: CSV)
VOLUME /app/data

RUN mkdir -p /opt/ezmaster/config/
RUN ln -s /app/config.local.json /opt/ezmaster/config/config.json
RUN ln -s /app/data /opt/ezmaster/data

# run the application
ENTRYPOINT ["/app/docker-entrypoint.sh"]
EXPOSE 3000
