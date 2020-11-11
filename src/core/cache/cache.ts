export type Key = string

export interface Cache<T> {
  get(key: Key): T | undefined
  set(key: Key, value: T): void
  delete(key: Key): void
  clear(): void
}
