#!/bin/sh

# Upload frontend:
rsync -avz ./next/dist/ fakhir@fakhirshaheen.com:/home/nginx/apps/autograder/next

# Upload backend:
#   also exclude the things mentioned in the "exclude.txt" file:
rsync -avz --exclude-from='./backend/exclude.txt' ./backend/ fakhir@fakhirshaheen.com:/home/nginx/apps/autograder/backend

echo "\nRun the following command to install dependencies:"
echo "npm install --only=production"
