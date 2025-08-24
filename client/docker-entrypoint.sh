#!/bin/sh

# Replace placeholder with actual env var
envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js

# Start nginx
exec "$@"
