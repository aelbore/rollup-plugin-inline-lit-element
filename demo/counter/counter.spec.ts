import './counter'

describe('Counter', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('ar-counter')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element)
  })

  it('should have element', () => {
    expect(element).toBeDefined()
  })

  it('should have shadowRoot.', () => {
    expect(element.shadowRoot).toBeDefined()
  })

})