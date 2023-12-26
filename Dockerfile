# Use official node image as the base image
FROM node:latest as build
# Set the working directory
WORKDIR /usr/local/app
# Add the source code to the app
COPY ./ /usr/local/app/
# Install all dependencies
RUN npm install
# Generate the build of the app
RUN npm run build

# Stage 2 Serve app with nginx
#  Use official nginx image
FROM nginx:latest
# Copy the build output to replace the default nginx contentx
COPY --from=build /usr/local/app/automall /usr/share/nginx/html

EXPOSE 80
