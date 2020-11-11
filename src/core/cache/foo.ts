import { LruCache } from './lru-cache'
import { inMemory } from './in-memory'

const DEFAULT_TTL = 500

const caches: Record<string, any> = {}

const _cache = ({
  fnName,
  instance,
  original,
  target,
  ttl,
  cacheKey = `${target.constructor.name}::${fnName}`
}: {
  fnName?: string
  instance?: any
  original?: any
  target?: any
  ttl?: number
  cacheKey?: string
} = {}) => {
  let cache = caches[cacheKey]

  if (!cache) {
    cache = new LruCache()
    caches[cacheKey] = cache
  }

  return inMemory(target, cache, original, fnName, instance, ttl)
}

const _invalidateCache = (original: any, instance: any, cacheKey: string) => {
  const cache = caches[cacheKey]

  if (cache) {
    cache.clear()
  }

  return (...args: any[]) => {
    return original.apply(instance, args)
  }
}

export const cache = ({
  ttl = DEFAULT_TTL,
  cacheKey
}: { ttl?: number; cacheKey?: string } = {}) => {
  const timeToLife = ttl || DEFAULT_TTL
  return (target: any, fnName: string, descriptor) => {
    if (typeof window !== 'undefined' || typeof global !== 'undefined') {
      return descriptor
    }

    const { configurable, enumerable, writable } = descriptor
    const originalGet = descriptor.get
    const originalValue = descriptor.value
    const isGetter = !!originalGet

    // https://github.com/jayphelps/core-decorators.js/blob/master/src/autobind.js
    return Object.assign(
      {},
      {
        configurable,
        enumerable,
        get() {
          const fn = isGetter ? originalGet.call(this) : originalValue
          if (this === target) {
            return fn
          }
          const _fnCached = _cache({
            fnName,
            instance: this,
            original: fn,
            target,
            ttl: timeToLife,
            cacheKey
          })

          Object.defineProperty(this, fnName, {
            configurable,
            writable,
            enumerable,
            value: _fnCached
          })
          return _fnCached
        },
        set(newValue: any) {
          Object.defineProperty(this, fnName, {
            configurable: true,
            writable: true,
            enumerable: true,
            value: newValue
          })

          return newValue
        }
      }
    )
  }
}

export const invalidateCache = ({ cacheKey }: { cacheKey?: string } = {}) => {
  return (target: any, fnName: string, descriptor: any) => {
    const { configurable, enumerable, writable } = descriptor
    const originalGet = descriptor.get
    const originalValue = descriptor.value
    const isGetter = !!originalGet

    return Object.assign(
      {},
      {
        configurable,
        enumerable,
        get() {
          const fn = isGetter ? originalGet.call(this) : originalValue
          if (this === target) {
            return fn
          }
          const _fnCached = _invalidateCache(this, fn, cacheKey)

          Object.defineProperty(this, fnName, {
            configurable,
            writable,
            enumerable,
            value: _fnCached
          })

          return _fnCached
        },
        set(newValue: any) {
          Object.defineProperty(this, fnName, {
            configurable: true,
            writable: true,
            enumerable: true,
            value: newValue
          })

          return newValue
        }
      }
    )
  }
}

export default cache
