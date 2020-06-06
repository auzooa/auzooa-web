import { css, customElement, html, LitElement, property, PropertyValues, query } from 'lit-element'
import { IRoutingInfo, RouterSlot } from 'router-slot'
import { general } from './styles/general'
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

  @property({ type: String })
  private currentTitle = ''

  static get styles() {
    return [
      general,
      css`
        router-slot {
          display: block;
          width: 100%;
          height: 100%;
        }
      `
    ]
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
        component: HomePage,
        setup: (component, _info: IRoutingInfo) => {
          this.currentTitle = component.title
        }
      },
      {
        path: '**',
        redirectTo: '/'
      }
    ])
  }

  render() {
    return html`<app-page>
      <app-navbar slot="header" .title="${this.currentTitle}"></app-navbar>
      <router-slot></router-slot>
    </app-page>`
  }
}
