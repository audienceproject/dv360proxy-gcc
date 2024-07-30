#!/bin/sh

docker run -it -v $(pwd):/home/dv360proxy -w "/home/dv360proxy" gcr.io/google.com/cloudsdktool/google-cloud-cli:latest 