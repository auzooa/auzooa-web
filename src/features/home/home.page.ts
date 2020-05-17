import { css, customElement, LitElement } from 'lit-element'

@customElement('app-home')
export class HomePage extends LitElement {
  static get styles() {
    return [css``]
  }
  render() {
    return `Home`
  }
}
