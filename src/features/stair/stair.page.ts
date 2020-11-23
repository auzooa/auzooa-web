import { css, customElement, html, LitElement, property } from 'lit-element'
import { general } from '../../styles/general'
import { AppPage } from '../../core/components/app-page'
import { TYPES } from '../../types'
import { Translation } from '../../core/language/translation'
import { queryParentRouterSlot } from 'router-slot'
import { StairsRepository } from '../new-stair/stairs-repository'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { subscribe } from '../../core/subscribe'
import { resolve } from '../../core/types/resolve'
import { Id } from '../../core/types/id'
import { Stair } from '../stair'
import { Message } from '../message'
import { tap } from 'rxjs/operators'

@customElement('app-stair')
export class StairPage extends LitElement implements AppPage {
  @resolve(TYPES.STAIR_REPOSITORY)
  private readonly stairRepository!: StairsRepository

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

        .instructions {
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-y: scroll;
        }

        app-neighbours {
          margin-top: var(--s);
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
      const stair = await this.stairRepository.find(this.stairId)
      this.nameBehaviourSubject.next(stair.name)
      this.stair = stair
      this.messagesSubscription = this.stairRepository
        .findMessages(this.stairId)
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
      <header class="instructions">
        <app-neighbours></app-neighbours>
        <app-message class="message">
          ${subscribe(this.translation('chat_instruction'))}
        </app-message>
        <app-input-code .readonly="${true}" .value="${this.stair?.name}"></app-input-code>
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
      <app-input-text
        class="write-message"
        .label="${subscribe(this.translation('chat_newMessage'))}"
        value=""
      ></app-input-text>
    </div>`
  }
}
