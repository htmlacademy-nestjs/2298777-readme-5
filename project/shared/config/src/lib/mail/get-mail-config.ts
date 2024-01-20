import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import path = require('node:path');
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export function getMailConfigOptions(optionSpace: string): MailerAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => ({
      transport: {
        host: config.get<string>(`${optionSpace}.host`)!,
        port: config.get<number>(`${optionSpace}.port`)!,
        secure: false,
        auth: {
          user: config.get<string>(`${optionSpace}.username`)!,
          pass: config.get<string>(`${optionSpace}.password`)!,
        },
      },
      defaults: {
        from: config.get<string>(`${optionSpace}.from`)!,
      },
      template: {
        dir: path.resolve(__dirname, 'assets'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    inject: [ConfigService],
  };
}
