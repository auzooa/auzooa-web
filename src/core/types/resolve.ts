import InjectionToken from 'tsyringe/dist/typings/providers/injection-token'
import { container } from '../../container'

export function resolve(type?: InjectionToken<any>): (target: any, name: string) => any {
  return (target: any, name: string): any => {
    const property = {
      get(): any {
        const metadata = Reflect.getMetadata('design:type', target, name)
        console.log({ metadata })
        const paramType = type ?? metadata
        return container.resolve(paramType)
      }
    }

    Object.defineProperty(target, name, property)

    return target
  }
}
