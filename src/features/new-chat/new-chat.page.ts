import { css, customElement, html, LitElement } from 'lit-element'
import { general } from '../../core/styles/general'
import { AppPage } from '../../core/components/app-page'

@customElement('app-new-chat')
export class NewChatPage extends LitElement implements AppPage {
  title = 'Nuevo muro'

  static get styles() {
    return [general, css``]
  }

  render() {
    return html`<div></div>`
  }
}
