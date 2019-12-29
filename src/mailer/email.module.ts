import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nest-modules/mailer';

import { emailConfig } from '../config/configs';

@Module({
    imports: [MailerModule.forRootAsync({
        useFactory: () => ({
          transport: emailConfig.transport,
          defaults: {
            from:'"nest-modules" <modules@nestjs.com>',
          }
        }),
      })],
    providers: [EmailService],
    exports: [EmailService]
})
export class EmailModule {}