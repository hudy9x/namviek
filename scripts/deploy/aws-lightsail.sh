# move to bitnami folder first and update dependencies
cd /home/bitnami
sudo apt update

git clone https://github.com/hudy9x/namviek
cd namviek

# Declare REDIS_HOST, NEXT_PUBLIC_FE_GATEWAY, PORT, MONGODB_URL

echo "REDIS_HOST=$REDIS_HOST
NEXT_PUBLIC_FE_GATEWAY=$NEXT_PUBLIC_FE_GATEWAY
PORT=${PORT:-3000}
MONGODB_URL=$MONGODB_URL

JWT_VERIFY_USER_LINK_TOKEN_EXPIRED=10m
JWT_SECRET_KEY=09123skjdhfwe
JWT_TOKEN_EXPIRED=30m
JWT_REFRESH_KEY=Iw98erhsd
JWT_REFRESH_EXPIRED=2d
" > .env

# =================== create apache virtual host ===============

sudo echo "
  <VirtualHost _default_:80>
    ServerAlias *
    DocumentRoot "/opt/bitnami/projects/myapp/public"
    <Directory "/opt/bitnami/projects/myapp/public">
      Require all granted
    </Directory>
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
  </VirtualHost>
" > /opt/bitnami/apache/conf/vhosts/myapp-http-vhost.conf 

sudo echo "
  <VirtualHost _default_:443>
    ServerAlias *
    SSLEngine on
    SSLCertificateFile "/opt/bitnami/apache/conf/bitnami/certs/server.crt"
    SSLCertificateKeyFile "/opt/bitnami/apache/conf/bitnami/certs/server.key"
    DocumentRoot "/opt/bitnami/projects/myapp"
    <Directory "/opt/bitnami/projects/myapp">
      Require all granted
    </Directory>
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
  </VirtualHost>

" > /opt/bitnami/apache/conf/vhosts/myapp-https-vhost.conf

sudo /opt/bitnami/ctlscript.sh restart apache


# install forever and node_modules
sudo chmod 0777 *
sudo npm install pm2 -g
sudo yarn install

# build code
sudo yarn generate2
sudo yarn build:be

# start backend
sudo pm2 start ./dist/apps/backend/main.js
