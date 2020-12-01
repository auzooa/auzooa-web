import { css, customElement, html, LitElement, property } from 'lit-element'
import { general } from '../../styles/general'
import { AppPage } from '../../core/components/app-page'
import { TYPES } from '../../types'
import { Translation } from '../../core/language/translation'
import { queryParentRouterSlot } from 'router-slot'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { subscribe } from '../../core/subscribe'
import { resolve } from '../../core/types/resolve'
import { Id } from '../../core/types/id'
import { Stair } from '../stair'
import { Message } from '../message'
import { tap } from 'rxjs/operators'
import { GetStairQry } from './get-stair-qry'
import { GetMessagesLiveQry } from './get-messages-live-qry'

@customElement('app-stair')
export class StairPage extends LitElement implements AppPage {
  @resolve()
  private readonly getStairQry!: GetStairQry

  @resolve()
  private readonly getMessagesLiveQry!: GetMessagesLiveQry

  @resolve(TYPES.TRANSLATION)
  private readonly translation!: Translation

  @property({ type: Object })
  private stair?: Stair

  @property({ type: Object })
  private messages: Message[] = []

  nameBehaviourSubject = new BehaviorSubject('')

  @property({ type: Object })
  name: Observable<string> = this.nameBehaviourSubject.asObservable()

  private stairId?: Id
  private hasLoaded = false
  private nameSubscription!: Subscription
  private messagesSubscription!: Subscription

  static get styles() {
    return [
      general,
      css`
        :host {
          height: 100%;
        }

        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .scrolling-area {
          overflow-y: scroll;
        }

        .instructions {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        app-neighbours {
          margin-top: var(--s);
        }

        .messages {
          display: flex;
          flex-direction: column;
          gap: var(--s);
          width: 100%;
        }

        .message {
          margin: var(--m) 0;
        }

        .write-message {
          --input-text-background-color: var(--secondary-color);
          --input-text-color: white;
          display: flex;
          margin-top: var(--s);
          border-radius: 5%;
        }
      `
    ]
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.nameSubscription.unsubscribe()
    this.messagesSubscription.unsubscribe()
  }

  private async setName() {
    if (this.stairId !== undefined && !this.hasLoaded) {
      const stair = await this.getStairQry.execute(this.stairId)
      this.nameBehaviourSubject.next(stair.name)
      this.stair = stair
      this.messagesSubscription = this.getMessagesLiveQry
        .execute(this.stairId)
        .pipe(
          tap(x => {
            this.messages = x
          })
        )
        .subscribe()
      this.hasLoaded = true
    }
  }

  render() {
    this.stairId = queryParentRouterSlot(this)?.match?.params.id
    this.setName()
    return html` <div class="wrapper">
      <section class="scrolling-area">
        <header class="instructions">
          <app-neighbours></app-neighbours>
          <app-message class="message">
            ${subscribe(this.translation('chat_instruction'))}
          </app-message>
          <app-input-code .readonly="${true}" .value="${this.stair?.code}"></app-input-code>
          <app-message class="message">${subscribe(this.translation('chat_template'))}</app-message>
          <app-button>${subscribe(this.translation('chat_downloadTemplate'))}</app-button>
          <app-message class="message">
            ${subscribe(this.translation('chat_nextSteps'))}
          </app-message>
        </header>
        <section class="messages">
          ${this.messages.map(
            x =>
              html`<app-message .sender="${x.sender}" .timestamp="${x.timestamp}"
                >${x.content}</app-message
              >`
          )}
        </section>
      </section>
      <app-input-text
        class="write-message"
        .label="${subscribe(this.translation('chat_newMessage'))}"
        value=""
      ></app-input-text>
    </div>`
  }
}
