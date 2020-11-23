import { LruCache } from './lru-cache'
import { Cache } from './cache'
import { singleton } from 'tsyringe'
import { Md5 } from 'ts-md5/dist/md5'

@singleton()
export class CacheManager {
  private caches: Record<string, Cache<any>> = {}

  cache(ttl = 500_000, cacheKey: string, fn: Function, ...args: any[]) {
    if (this.caches[cacheKey] === undefined) {
      this.caches[cacheKey] = new LruCache()
    }

    const cache = this.caches[cacheKey]
    const key = new Md5().appendStr(JSON.stringify(args)).end() as string
    const now = Date.now()

    if (cache.get(key) === undefined) {
      cache.set(key, { createdAt: now, returns: fn.apply(this, args) })
    }

    const existingResult = cache.get(key)!
    if (this.isPromise(existingResult.returns)) {
      existingResult.returns.catch(() => cache.delete(key))
    }

    if (now - existingResult.createdAt > ttl) {
      cache.delete(key)
    }

    return existingResult.returns
  }

  invalidateCache(cacheKey: string) {
    const cache = this.caches[cacheKey]
    cache.delete(cacheKey)
  }

  private isPromise(object: Promise<unknown> | unknown): object is Promise<unknown> {
    return typeof object !== 'undefined' && typeof (object as Promise<unknown>).then === 'function'
  }
}
