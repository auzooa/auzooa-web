import { container } from '../../container'

type constructor<T> = {
  new (...args: any[]): T
}

type InjectionToken<T = any> = constructor<T> | string | symbol

export function resolve(type?: InjectionToken): (target: any, name: string) => any {
  return (target: any, name: string): any => {
    const property = {
      get(): any {
        const metadata = Reflect.getMetadata('design:type', target, name)
        const paramType = type ?? metadata
        return container.resolve(paramType)
      }
    }

    Object.defineProperty(target, name, property)

    return target
  }
}
