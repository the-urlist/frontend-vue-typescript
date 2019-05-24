FROM nginx

WORKDIR /app

# Copy in the static build assets
COPY dist/ /app/

# Copy in the nginx config file
COPY nginx.conf /etc/nginx/nginx.conf

# All files are in, start the web server
CMD ["nginx"]