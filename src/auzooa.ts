import { css, customElement, html, LitElement, PropertyValues, query } from 'lit-element'
import { RouterSlot } from 'router-slot'
import { general } from './core/styles/general'
import { HomePage } from './features/home/home.page'

@customElement('app-auzooa')
export class Auzooa extends LitElement {
  @query('router-slot')
  readonly routerSlot!: RouterSlot

  static get styles() {
    return [general, css``]
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
