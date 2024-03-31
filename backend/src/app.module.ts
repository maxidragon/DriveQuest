import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: `DriveQuest <${process.env.SMTP_USER}>`,
        },
      }),
    }),
    QuestionModule,
  ],
})
export class AppModule {}
