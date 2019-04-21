import { LitElement, html, customElement, property } from 'lit-element';
import './counter.scss'

@customElement('ar-counter')
export class Counter extends LitElement {

  @property({ type: Number })
  count = 0

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