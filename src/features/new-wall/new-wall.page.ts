import { css, customElement, html, LitElement } from 'lit-element'
import { general } from '../../styles/general'
import { AppPage } from '../../core/components/app-page'
import { inject } from '../../core/types/inject'
import { TYPES } from '../../types'
import { Translation } from '../../core/language/translation'
import { IconName } from '../../core/components/icon/icon-name'
import { subscribe } from '../../core/subscribe'
import { WallRepository } from './wall-repository'
import { AppEvent } from '../../core/app-event'

@customElement('app-new-wall')
export class NewWallPage extends LitElement implements AppPage {
  @inject(TYPES.TRANSLATION)
  translation!: Translation

  @inject(TYPES.WALL_REPOSITORY)
  wallRepository!: WallRepository

  name = this.translation('newChat_name')
  subtitle = this.translation('newChat_subtitle')

  wallName = ''

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

  private async createWall() {
    const id = await this.wallRepository.create(this.wallName).toPromise()
    history.pushState(null, '', `/walls/${id}`)
  }

  render() {
    return html`<div class="wrapper">
      <div class="form">
        <app-stairs></app-stairs>
        <app-input-text
          .value="${this.wallName}"
          .label="${subscribe(this.translation('newChat_subject'))}"
          @on-input="${(value: AppEvent<string>) => {
            this.wallName = value.detail
          }}"
        ></app-input-text>
        <small class="byline">${subscribe(this.translation('newChat_subjectByline'))}</small>
      </div>
      <app-button round @click="${this.createWall}"
        ><app-icon .name="${IconName.DONE}"></app-icon
      ></app-button>
    </div> `
  }
}
