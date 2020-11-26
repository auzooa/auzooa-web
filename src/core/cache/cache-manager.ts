import { LruCache } from './lru-cache'
import { Cache } from './cache'
import { Md5 } from 'ts-md5/dist/md5'
import { CacheKey } from './cache-key'
import { singleton } from 'tsyringe'
import { isPromise } from '../utils/is-promise'

@singleton()
export class CacheManager {
  private caches: Map<CacheKey, Cache<any>> = new Map()

  constructor(private readonly ttl = 500_000) {}

  cache(cacheKey: CacheKey, fn: Function, ...args: any[]) {
    if (!this.caches.has(cacheKey)) {
      this.caches.set(cacheKey, new LruCache())
    }

    const existingCache = this.caches.get(cacheKey)!
    const hash = new Md5().appendStr(JSON.stringify(args)).end() as string
    const now = Date.now()

    if (!existingCache.has(hash)) {
      existingCache.set(hash, { createdAt: now, returns: fn.apply(this, args) })
    }

    const existingResult = existingCache.get(hash)!
    if (isPromise(existingResult.returns)) {
      existingResult.returns.catch((error: Error) => {
        existingCache.delete(hash)
        throw error
      })
    }

    if (now - existingResult.createdAt > this.ttl) {
      existingCache.delete(hash)
    }

    return existingResult.returns
  }

  invalidateCache(cacheKey: CacheKey) {
    this.caches.delete(cacheKey)
  }

  invalidateCaches() {
    this.caches.clear()
  }
}
