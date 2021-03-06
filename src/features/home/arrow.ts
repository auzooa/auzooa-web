import { customElement, LitElement, svg } from 'lit-element'
import { general } from '../../styles/general'

@customElement('app-arrow')
export class Arrow extends LitElement {
  static get styles() {
    return [general]
  }

  render() {
    return svg`<svg
      width="100%"
      height="100%"
      viewBox="0 0 114 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M112.535 80.3696C112.739 80.1837 112.753 79.8674 112.567 79.6633L109.537 76.3367C109.351 76.1326 109.035 76.1178 108.831 76.3038C108.627 76.4898 108.612 76.806 108.798 77.0102L111.492 79.9671L108.535 82.6609C108.33 82.8469 108.316 83.1631 108.502 83.3672C108.688 83.5714 109.004 83.5861 109.208 83.4001L112.535 80.3696ZM15.7272 2.16868C26.3203 31.7271 36.9977 50.7147 51.7824 62.609C66.5781 74.5121 85.4133 79.2531 112.175 80.4995L112.221 79.5005C85.5394 78.2579 66.96 73.5359 52.4092 61.8298C37.8473 50.1148 27.2463 31.3469 16.6686 1.83132L15.7272 2.16868Z"
        fill="currentColor"
      />
    </svg>`
  }
}
