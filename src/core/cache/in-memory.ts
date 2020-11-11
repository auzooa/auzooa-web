import { createHash } from './create-hash'
import { Cache } from './cache'

export const isPromise = (object: Promise<unknown> | unknown): object is Promise<unknown> =>
  typeof object !== 'undefined' && typeof (object as Promise<unknown>).then === 'function'

export const inMemory = (
  _target: unknown,
  cache: Cache<{ createdAt: number; returns: any }>,
  original: Function,
  _fnName: string,
  instance: unknown,
  ttl: number
) => (...args: any[]) => {
  const key = createHash(JSON.stringify(args))
  const now = Date.now()

  if (cache.get(key) === undefined) {
    cache.set(key, { createdAt: now, returns: original.apply(instance, args) })
  }

  const existingResult = cache.get(key)!
  if (isPromise(existingResult.returns)) {
    existingResult.returns
      .then(args => {
        if (Array.isArray(args) && args[0]) {
          cache.delete(key)
        }
      })
      .catch(() => cache.delete(key))
  }

  if (now - existingResult.createdAt > ttl) {
    cache.delete(key)
  }

  return cache.get(key) !== undefined ? existingResult.returns : original.apply(instance, args)
}
