import { LitElement, html, customElement, property } from 'lit-element'

@customElement('hello-world')
export class HelloWorld extends LitElement {

  @property() message = ''

  render() {
    return html `<h1>Hello ${this.message}</h1>`
  }

}