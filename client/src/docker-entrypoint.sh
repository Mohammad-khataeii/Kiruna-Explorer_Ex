#!/bin/sh
# Replace placeholder with env var
sed -i "s|__API_BASE_URL__|${API_BASE_URL:-http://localhost:5001}|" /usr/share/nginx/html/config.js

# Start Nginx
exec "$@"
