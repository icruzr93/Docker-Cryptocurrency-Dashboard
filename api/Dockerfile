FROM node:carbon

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Bundle app source
ADD package.json /app
ADD . /app

# Set the command to start the node server.
CMD npm run serve

# Tell Docker about the port we'll run on.
EXPOSE 3000