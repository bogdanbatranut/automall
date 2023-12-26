# Use official node image as the base image
FROM node:latest as build
# Set the working directory
WORKDIR /dist/src/app

RUN npm cache clean --force

# Add the source code to the app
COPY . .
# Install all dependencies
RUN npm install
# Generate the build of the app
RUN npm run build --prod

# Stage 2 Serve app with nginx
#  Use official nginx image
FROM nginx:latest AS ngi
# Copy the build output to replace the default nginx contentx
COPY --from=build /dist/src/app/dist/automall /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
