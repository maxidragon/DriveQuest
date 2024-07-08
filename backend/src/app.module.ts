import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { QuestionModule } from './question/question.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [DbModule, AuthModule, QuestionModule],
})
export class AppModule {}
