import { LitElement, html, customElement } from 'lit-element'
import './hello-world.css'

@customElement('hello-world')
export class HelloWorld extends LitElement {

  message

  static get properties() {
    return {
      message: { type: String }
    }
  }

  render() {
    return html `<h1>Hello ${this.message}</h1>`
  }

}