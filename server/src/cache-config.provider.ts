import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { CacheOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { ConfigType } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

import config from './config';
import { Environment } from './common/enums';

@Injectable()
export class CacheConfigProvider implements CacheOptionsFactory {
  constructor(@Inject(config.KEY) private readonly configService: ConfigType<typeof config>) {}

  private async development(): Promise<CacheOptions> {
    return {
      store: await redisStore({
        url: this.configService.redis.url,
        ttl: this.configService.redis.ttl,
      }),
    };
  }

  async createCacheOptions(): Promise<CacheOptions<Record<string, any>>> {
    try {
      if (this.configService.nodeEnv === Environment.DEVELOPMENT) {
        return await this.development();
      } else if (this.configService.nodeEnv === Environment.TESTING) {
        return { ttl: 1 * 60 * 1000 };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
