```$xslt
 websocket
 npx sequelize migration:generate --name=init-users 
 npx sequelize db:migrate 升级数据库
 NODE_ENV=test npx sequelize db:migrate:up
 NODE_ENV=prod npx sequelize db:migrate:up
```