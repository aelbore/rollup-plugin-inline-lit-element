# rollup-plugin-inline-lit-element
Rollup plugin to inline external styles in lit-element

Installation
------------
  ```
    npm install --save-dev rollup-plugin-inline-lit-element
  ```

Setup
------------
* `hello-world.css`
  ```css
  h1 {
    color: red;
  }
  ```
  <br />

* `hello-world.js`
  ```javascript
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
  ```
  <br />

* `rollup.config.js`
  ```javascript
  import minifyHTML from 'rollup-plugin-minify-html-literals';
  import resolve from 'rollup-plugin-node-resolve'

  import { terser } from 'rollup-plugin-terser'
  const { inlineLitElement } = require('rollup-plugin-inline-lit-element')

  export default {
    treeshake: true,
    input: 'src/hello-world.js',
    external: [],
    plugins: [
      minifyHTML(),
      inlineLitElement(),
      resolve(),
      terser()
    ],
    output: {
      sourcemap: true,
      globals: {},
      file: 'dist/hello-world.js',
      format: 'esm'
    }
  }  
  ```
<br />

Support Sass
------------
  ```
    npm install --save-dev node-sass
  ```