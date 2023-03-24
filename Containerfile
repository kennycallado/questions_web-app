FROM nginx:alpine

COPY ./dist/ /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80

### STAGE 1:BUILD ###
# Defining a node image to be used as giving it an alias of "build"
# Which version of Node image to use depends on project dependencies 
# This is needed to build and compile our code 
# while generating the docker image
# Create a Virtual directory inside the docker image
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
# Copy files from local machine to virtual directory in docker image

# FROM node:alpine AS build
# WORKDIR /dist/src/app
# RUN npm cache clean --force
# COPY . .

# ENV NG_CLI_ANALYTICS=ci

# RUN npm install
# RUN npm run build

### STAGE 2:RUN ###
# Defining nginx image to be used
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder 
# Exposing a port, here it means that inside the container 
# the app will be using Port 80 while running

# FROM nginx:alpine AS ngi
# COPY --from=build /dist/src/app/dist/my-docker-angular-app /usr/share/nginx/html
# COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# EXPOSE 80
