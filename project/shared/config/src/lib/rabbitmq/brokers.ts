import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from '@project/shared/utils';

export const getRabbitMQOptions = (optionSpace: string) => ({
  useFactory: (configService: ConfigService) => ({
    exchanges: [
      {
        name: configService.get<string>(`${optionSpace}.queue`),
        type: 'direct',
      },
    ],
    uri: getRabbitMQConnectionString(
      configService.get<string>(`${optionSpace}.user`)!,
      configService.get<string>(`${optionSpace}.password`)!,
      configService.get<string>(`${optionSpace}.host`)!,
      configService.get<number>(`${optionSpace}.port`)!
    ),
  }),
  inject: [ConfigService],
});
