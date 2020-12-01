import { css, customElement, html, LitElement } from 'lit-element'
import { general } from '../../styles/general'
import { AppPage } from '../../core/components/app-page'
import { TYPES } from '../../types'
import { Translation } from '../../core/language/translation'
import { IconName } from '../../core/components/icon/icon-name'
import { subscribe } from '../../core/subscribe'
import { AppEvent } from '../../core/app-event'
import { resolve } from '../../core/types/resolve'
import { CreateStairCmd } from './create-stair-cmd'

@customElement('app-new-stair')
export class NewStairPage extends LitElement implements AppPage {
  @resolve(TYPES.TRANSLATION)
  translation!: Translation

  @resolve()
  createStairCmd!: CreateStairCmd

  name = this.translation('newChat_name')
  subtitle = this.translation('newChat_subtitle')

  stairName = ''

  static get styles() {
    return [
      general,
      css`
        :host {
          height: 100%;
        }

        .wrapper {
          padding-top: var(--l);
          display: flex;
          height: 100%;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }

        app-stairs {
          margin-bottom: var(--l);
        }

        .form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .byline {
          align-self: flex-start;
          opacity: 0.6;
        }

        app-button {
          margin-top: auto;
          align-self: flex-end;
        }
      `
    ]
  }

  private async createStair() {
    const id = await this.createStairCmd.execute(this.stairName)
    history.pushState(null, '', `/stairs/${id}`)
  }

  render() {
    return html`<div class="wrapper">
      <div class="form">
        <app-stairs></app-stairs>
        <app-input-text
          .value="${this.stairName}"
          .label="${subscribe(this.translation('newChat_subject'))}"
          @on-input="${(value: AppEvent<string>) => {
            this.stairName = value.detail
          }}"
        ></app-input-text>
        <small class="byline">${subscribe(this.translation('newChat_subjectByline'))}</small>
      </div>
      <app-button round @click="${this.createStair}"
        ><app-icon .name="${IconName.DONE}"></app-icon
      ></app-button>
    </div> `
  }
}
