# YouTube Comment Scraper 2.0

http://ytcomments2.klostermann.ca

**Still WORK IN PROGRESS!**

## Deploy

### Manually

``` bash
$ docker build -t philbot/youtube-comment-scraper2.0 .
$ docker run -p 49162:3000 -d philbot/youtube-comment-scraper2.0
```
### Docker Hub

**NOTE:** The Docker image is private for the time being.

``` bash
$ docker pull philbot/youtube-comment-scraper2.0
$ docker run -p 49162:3000 -d philbot/youtube-comment-scraper2.0
```

### Continuous Delivery

#### Server setup

* Set up [dockerhub-webhook](https://github.com/philbot9/dockerhub-webhook) on the server
* Add the [redeploy script](scripts/redeploy.sh) to the dockerhub-webook/scripts/ directory and name it `youtube-comment-scraper2.0`
* Start the webhook service: `forever start dockerhub-webhook/index.js`
* Set up autostart on reboot ([How-To](http://stackoverflow.com/questions/13385029/automatically-start-forever-node-on-system-restart))

#### DockerHub Setup

* Set up a Webhook on https://hub.docker.com/r/philbot/youtube-comment-scraper2.0/~/settings/webhooks/
* The default URL is `http://hostname:3000/api/$TOKEN`


#### Build Pipeline

Pushes to the `production` branch will trigger travis-ci to build a new
Docker image and push it to DockerHub. `dockerhub-webhook` will automatically
deploy the new image on the server.
