import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello(key, value) {
    await this.cacheManager.del(key);
    await this.cacheManager.set(key, value);
    const cachedItem = await this.cacheManager.get(key);
    console.log(cachedItem);
    return 'done';
  
  }
  async getkey(key) {

    const cachedItem = await this.cacheManager.get(key);
    console.log(cachedItem);
    return `${cachedItem}`;
    
  }
}
