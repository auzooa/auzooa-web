import { html } from 'lit-html'
import './input-code'

export default {
  title: 'Input Code'
}

export const base = () =>
  html`<div style="background-color:black;">
    <app-input-code></app-input-code>
    <div></div>
  </div>`
