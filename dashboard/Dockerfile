FROM node:8.9-alpine

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Bundle app source
ADD package.json /app
ADD . /app

# Install dependences.
RUN npm install

# Run build
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Set the command to start the node server.
CMD serve -s build

# Tell Docker about the port we'll run on.
EXPOSE 5000