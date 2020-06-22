import { css, customElement, html, LitElement, property, PropertyValues, query } from 'lit-element'
import { RouterSlot } from 'router-slot'
import { general } from './styles/general'
import { HomePage } from './features/home/index'
import { inject } from './core/types/inject'
import { TYPES } from './types'
import { IsUserFirstVisitUseCase } from './features/is-user-first-visit-use-case'
import { filter, switchMapTo, tap } from 'rxjs/operators'
import { SetUserFirstVisitUseCase } from './features/set-user-first-visit-use-case'
import { AppPage } from './core/components/app-page'
import { EMPTY, Observable } from 'rxjs'
import { subscribe } from './core/subscribe'

@customElement('app-auzooa')
export class Auzooa extends LitElement {
  @query('router-slot')
  readonly routerSlot!: RouterSlot

  @inject(TYPES.IS_USER_FIRST_VISIT_USE_CASE)
  readonly isUserFirstVisitUseCase!: IsUserFirstVisitUseCase

  @inject(TYPES.SET_USER_FIRST_VISIT_USE_CASE)
  readonly setUserFirstVisitUseCase!: SetUserFirstVisitUseCase

  @property({ type: Object })
  private currentTitle: Observable<string> = EMPTY

  @property({ type: Object })
  private currentSubtitle: Observable<string> | undefined = undefined

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
        path: '/new-stair',
        component: () => import('./features/new-stair/index'),
        setup: this.getSetup()
      },
      {
        path: '/stairs/:id',
        component: () => import('./features/stair/index'),
        setup: this.getSetup()
      },
      {
        path: '/',
        component: HomePage,
        setup: this.getSetup()
      },
      {
        path: '**',
        redirectTo: '/'
      }
    ])
  }

  private getSetup(): (component: HTMLElement) => void {
    const setup = (component: AppPage) => {
      this.currentTitle = component.name
      this.currentSubtitle = component.subtitle
    }
    return (setup as unknown) as (component: HTMLElement) => void
  }

  render() {
    return html`<app-page>
      <app-navbar
        slot="header"
        .title="${subscribe(this.currentTitle)}"
        .subtitle="${subscribe(this.currentSubtitle ?? EMPTY)}"
      ></app-navbar>
      <router-slot></router-slot>
    </app-page>`
  }
}
