import { css, customElement, html, LitElement, PropertyValues, query } from 'lit-element'
import { RouterSlot } from 'router-slot'
import { general } from './core/styles/general'
import { HomePage } from './features/home/home.page'
import { inject } from './core/types/inject'
import { TYPES } from './types'
import { IsUserFirstVisitUseCase } from './features/is-user-first-visit-use-case'
import { filter, switchMapTo, tap } from 'rxjs/operators'
import { SetUserFirstVisitUseCase } from './features/set-user-first-visit-use-case'

@customElement('app-auzooa')
export class Auzooa extends LitElement {
  @query('router-slot')
  readonly routerSlot!: RouterSlot

  @inject(TYPES.IS_USER_FIRST_VISIT_USE_CASE)
  readonly isUserFirstVisitUseCase!: IsUserFirstVisitUseCase

  @inject(TYPES.SET_USER_FIRST_VISIT_USE_CASE)
  readonly setUserFirstVisitUseCase!: SetUserFirstVisitUseCase

  static get styles() {
    return [general, css``]
  }

  connectedCallback() {
    super.connectedCallback()
    this.isUserFirstVisitUseCase
      .execute()
      .pipe(
        filter(x => x),
        tap(() => {
          history.pushState(null, '', '/onboarding')
        }),
        switchMapTo(this.setUserFirstVisitUseCase.execute())
      )
      .toPromise()
  }

  firstUpdated(props: PropertyValues) {
    super.firstUpdated(props)
    this.routerSlot.add([
      {
        path: 'onboarding',
        component: () => import('./features/onboarding/index')
      },
      {
        path: '/',
        component: HomePage
      },
      {
        path: '**',
        redirectTo: '/'
      }
    ])
  }

  render() {
    return html`<app-page>
      <router-slot></router-slot>
    </app-page>`
  }
}
