# Kampuni

## Generate schema
In order to typescript suggests your schema when typing, run the generate command below
```shell
$ yarn prisma generate --schema=.\packages\shared-models\src\prisma\schema.prisma
```

## Push database

Make sure that you have defined database url properly. See `.env` for more information. Ex:

```shell
MONGODB_URL=mongodb+srv://kadmin:CNl8IgyZZ8LRKUPc@cluster0.weszq.mongodb.net/kampuni?ssl=true&connectTimeoutMS=5000&maxPoolSize=50
```

Now, generate collections using the below command
```shell
$ yarn prisma db push --schema=.\packages\shared-models\src\prisma\schema.prisma
```

