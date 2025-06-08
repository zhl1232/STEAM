// apps/backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
// We no longer need to import the entity class here

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // For debugging the path in Render's logs
        console.log('Executing in directory:', __dirname);

        return {
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          synchronize: true, // Warning: Set to false in a real production environment

          // Use a glob pattern to find all .entity.js files
          // This is the most reliable method for production builds.
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
    }),

    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }