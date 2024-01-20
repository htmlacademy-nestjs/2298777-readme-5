import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from '@project/shared/utils';

export function getRabbitMQOptions(optionSpace: string) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}.queue`)!,
          type: 'direct',
        },
      ],
      uri: getRabbitMQConnectionString(
        config.get<string>(`${optionSpace}.username`)!,
        config.get<string>(`${optionSpace}.password`)!,
        config.get<string>(`${optionSpace}.host`)!,
        config.get<number>(`${optionSpace}.port`)!
      ),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService],
  };
}
