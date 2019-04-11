import { LitElement, html, customElement } from 'lit-element';
import './counter.scss'

@customElement('ar-counter')
export class Counter extends LitElement {

  count: number;

  static get properties() {
    return {
      count: {
        type: Number,
        value: 0
      }
    }
  }

  constructor() {
    super()
    this.incrementCount = this.incrementCount.bind(this)
    this.count = 0
  }

  incrementCount(e: CustomEvent) {
    this.count = this.count + 1
  }

  render() {
    return html `
      <button id="count" @click=${this.incrementCount}>
        ${this.count}
      </button>   
    `
  }

}