import { LitElement, html } from 'lit-element'
import './hello-world.css'

class HelloWorld extends LitElement {

  static get properties() {
    return {
      message: { type: String }
    }
  }

  render() {
    return html `<h1>Hello ${this.message}</h1>`
  }

}

customElements.define('hello-world', HelloWorld)