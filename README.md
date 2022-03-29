# HAH-BROWSER

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### nginx setup
``` bash
sduo apt install nginx
sudo cp nginx.conf /etc/nginx/conf.d/
sudo service nginx restart
tar -czvf dist.tar.gz dist
scp ./dist.tar.gz hah-xg:/home/zos/web/dist.tar.gz
tar -xzvf dist.tar.gz
```