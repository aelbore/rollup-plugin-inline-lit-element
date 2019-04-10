Decorators
------------


#### Setup
* `hello-world.css`
  ```css
  h1 {
    color: red;
  }
  ```

* `hello-world.js`
  ```javascript
  import { LitElement, html, customElement } from 'lit-element'
  import './hello-world.css'

  @customElement('hello-world')
  export class HelloWorld extends LitElement {

    static get properties() {
      return {
        message: { type: String }
      }
    }

    render() {
      return html `<h1>Hello ${this.message}</h1>`
    }

  }
  ```

* output of your `hello-world.js`
  ```javascript
  import { LitElement, html, css } from 'lit-element'

  export class HelloWorld extends LitElement {

    static get styles() {
      return css `h1 { color: red; }`
    }

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
  ```
<br />

#### Actual output without inlineLitElement plugin
* Has additional code
  ```javascript
  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  import { LitElement, html, customElement } from 'lit-element';
  let HelloWorld = class HelloWorld extends LitElement {
      static get properties() {
          return {
              message: { type: String }
          };
      }
      render() {
          return html `<h1>Hello ${this.message}</h1>`;
      }
  };
  HelloWorld = __decorate([
      customElement('hello-world')
  ], HelloWorld);
  export { HelloWorld };
  ```
