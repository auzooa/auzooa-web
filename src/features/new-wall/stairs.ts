import { customElement, LitElement, svg } from 'lit-element'
import { general } from '../../styles/general'

@customElement('app-stairs')
export class Stairs extends LitElement {
  static get styles() {
    return [general]
  }

  render() {
    return svg`<svg width="250" height="116" viewBox="0 0 250 116" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="1" y1="115" x2="249" y2="115" stroke="white" stroke-width="2" stroke-linecap="round"/>
<rect x="87.7964" y="58.0242" width="6.82632" height="31.4011" fill="#3C433C"/>
<rect x="105.545" y="40.2757" width="6.82632" height="31.4011" fill="#3C433C"/>
<rect x="124.658" y="22.5273" width="6.82632" height="31.4011" fill="#3C433C"/>
<rect x="142.407" y="4.77887" width="6.82632" height="31.4011" fill="#3C433C"/>
<path d="M141.042 34.8146V40.9583H147.868V59.3894H181.317V34.8146H141.042Z" fill="#9B7200"/>
<path d="M123.293 53.9283V60.072H130.12V78.5031H181.317V53.9283H123.293Z" fill="#C89829"/>
<path d="M104.179 71.6768V77.8205H111.006V96.2516H181.317V71.6768H104.179Z" fill="#9B7200"/>
<path d="M86.431 89.4252V95.5689H93.2574V114H181.317V89.4252H86.431Z" fill="#C89829"/>
<path d="M93.2574 114H68V73.0421C68.0572 70.4007 68.8242 68.9025 71.4132 66.2157L134.215 2.73095C136.396 0.487987 137.938 -0.0168972 141.042 0.000425156H180.634V13.6531H151.281C146.151 13.6097 143.874 14.1679 141.042 16.3836L83.0179 75.09C82.0404 76.2116 81.6836 76.9305 81.6526 78.5031V99.6647L93.2574 99.6647V114Z" fill="#8D959E"/>
</svg>
`
  }
}
