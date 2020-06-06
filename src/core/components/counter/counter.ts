import { css, customElement, html, LitElement, property } from 'lit-element'
import { general } from '../../../styles/general'
import { subscribe } from '../../subscribe'
import { inject } from '../../types/inject'
import { TYPES } from '../../../types'
import { Translation } from '../../language/translation'
import { AppEvent } from '../../app-event'

@customElement('app-counter')
export class Counter extends LitElement {
  @property({ type: Number })
  start!: number

  @property({ type: Number })
  private interval = -1

  @inject(TYPES.TRANSLATION)
  translation!: Translation

  static get styles() {
    return [
      general,
      css`
        :host {
          width: 100%;
        }

        .counter {
          position: relative;
          border-radius: 100%;
          border: 1px dashed var(--on-background-color);
        }

        .counter:after {
          content: '';
          display: block;
          padding-top: 100%;
        }

        .content {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .count {
          margin: 0;
        }

        .dot {
          position: absolute;
          top: 0;
          width: 0.5rem;
          height: 0.5rem;
          transform: translateY(-50%);
          border-radius: 100%;
          background-color: var(--on-background-color);
        }
      `
    ]
  }

  connectedCallback() {
    super.connectedCallback()
    this.interval = window.setInterval(() => {
      if (this.start !== 0) {
        this.start--
      } else {
        this.dispatchEvent(new AppEvent('on-counter-end'))
        this.clearInterval()
      }
    }, 1_000)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.clearInterval()
  }

  private clearInterval() {
    window.clearInterval(this.interval)
  }
  render() {
    return html`<div class="counter">
      <div class="content">
        <span class="dot"></span>
        <h3 class="count">${this.start}</h3>
        <small>${subscribe(this.translation('_seconds'))}</small>
      </div>
    </div>`
  }
}
