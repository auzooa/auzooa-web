export type Key = string

export interface Cache<T> {
  get(key: Key): T | undefined
  set(key: Key, value: T): void
  has(key: Key): boolean
  delete(key: Key): void
  clear(): void
}
