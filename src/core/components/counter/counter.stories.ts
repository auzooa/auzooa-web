import './counter'
import { html } from 'lit-element'

export default {
  title: 'Counter',
  component: 'app-counter'
}

export const base = () => html`<app-counter .start="10"></app-counter>`
