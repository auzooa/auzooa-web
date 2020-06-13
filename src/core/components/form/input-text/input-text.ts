import { css, customElement, html, LitElement, property } from 'lit-element'
import { AppEvent } from '../../../app-event'
import { general } from '../../../../styles/general'

@customElement('app-input-text')
export class InputText extends LitElement {
  @property({ type: String })
  label!: string

  @property({ type: String })
  value!: string

  static get styles() {
    return [
      general,
      css`
        :host {
          width: 100%;
        }

        input {
          border-radius: 0.4rem;
          border: none;
          width: 100%;
          padding: var(--m);
        }
      `
    ]
  }

  render() {
    return html`<input
      .placeholder="${this.label}"
      .value="${this.value}"
      @input="${(event: InputEvent) =>
        this.dispatchEvent(new AppEvent('on-input', (event.target as HTMLInputElement).value))}"
    />`
  }
}
