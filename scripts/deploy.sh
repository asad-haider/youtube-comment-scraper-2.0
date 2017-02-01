#!/bin/bash

#
# Currently this script is the same as redeploy, but once a database
# has been added, it will be different
#

# Pull down new image
echo "# Pull down new image"
docker pull philbot/youtube-comment-scraper2.0:latest

# Kill and remove existing container
echo "# Kill and remove existing container (may fail)"
docker kill youtube-comment-scraper2.0
docker rm youtube-comment-scraper2.0

# Run container
echo "# Start new container"
docker run -p 49162:3000 --restart="always" -d --name youtube-comment-scraper2.0 philbot/youtube-comment-scraper2.0
