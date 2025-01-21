#! /bin/sh

set -e

fnm use

npm ci
npm run build

npm i -g pm2

PM2_EXIST=$(if pm2 list 2>/dev/null | grep -q nvnhan0810-it-web; then echo "Yes"; else echo "No"; fi)

if [ $PM2_EXIST = Yes ]; then
	pm2 stop nvnhan0810-it-web
	pm2 delete nvnhan0810-it-web
fi

pm2 --name nvnhan0810-it-web start npm -- start -- -p 3002