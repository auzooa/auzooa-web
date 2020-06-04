import { css, customElement, LitElement } from 'lit-element'
import { AppPage } from '../../core/components/app-page'
import { general } from '../../core/styles/general'

@customElement('app-home')
export class HomePage extends LitElement implements AppPage {
  title = 'Auzooa'

  static get styles() {
    return [general, css``]
  }

  render() {
    return `Home`
  }
}
