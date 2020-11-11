import { Cache, Key } from './cache'
import lru, { Lru } from 'tiny-lru'

export class LruCache<T> implements Cache<T> {
  private _lru: Lru<T> = lru(100)

  get(key: Key): T | undefined {
    return this._lru.get(key)
  }

  set(key: Key, value: T) {
    this._lru.set(key, value)
  }

  delete(key: Key) {
    this._lru.delete(key)
  }

  clear() {
    this._lru.clear()
  }
}
