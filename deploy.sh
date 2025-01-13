#! /bin/sh

set -e

npm i -g pm2

PM2_EXIST=$(if pm2 list 2>/dev/null | grep -q nvnahn0810-it-web; then echo "Yes"; else echo "No"; fi)

if [ $PM2_EXIST = Yes ]; then
	pm2 stop nvnahn0810-it-web
	pm2 delete nvnahn0810-it-web
fi

pm2 --name nvnahn0810-it-web start pnpm -- start -p 3002