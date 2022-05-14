import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as redis from 'redis';
//const redis = require('redis');

var redisClient = redis.createClient({
  url: 'redis://redis-16024.c13.us-east-1-3.ec2.cloud.redislabs.com:16024',
  password: 'mspTzJRRGE5GtOJ0ydgBjKHTGZtk2344',

  //host : "redis-16024.c13.us-east-1-3.ec2.cloud.redislabs.com",
  //port:16024,
  //password: 'mspTzJRRGE5GtOJ0ydgBjKHTGZtk2344',
});

// (async () => {

// });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await redisClient.connect();

  redisClient.set('name', 'hyunx9');
  console.log((await redisClient.get('name')).toString());
}

//redisClient.set('key1', 'aaaaa');
//console.log(redisClient.get('key1'));
bootstrap();
