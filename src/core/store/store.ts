import { injectable } from '../types/injectable'
import { Locale } from '../language/locale'
import { BehaviorSubject, Observable } from 'rxjs'
import { State } from './state'

@injectable()
export class Store {
  private readonly behaviorSubject = new BehaviorSubject<State>({
    locale: Locale.EN
  })

  on(): Observable<State> {
    return this.behaviorSubject.asObservable()
  }

  value() {
    return this.behaviorSubject.value
  }
}
