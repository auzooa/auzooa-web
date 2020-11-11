import { container } from '../../container'
import { CacheManager } from '../cache/cache-manager'

export abstract class UseCase<Result = void, Param = void> {
  invalidates: string[] = []
  abstract internalExecute(param: Param): Promise<Result>

  execute(param: Param): Promise<Result> {
    const cacheManager = container.resolve<CacheManager>(CacheManager)
    const cacheKey = `${this.constructor.name}`
    const result = cacheManager.cache(undefined, cacheKey, this.internalExecute, param)
    this.invalidates.forEach(invalidation => {
      cacheManager.invalidateCache(invalidation)
    })
    return result
  }
}
