import { Observable } from 'rxjs'

export interface AppPage {
  name: Observable<string>
  subtitle?: Observable<string>
}
