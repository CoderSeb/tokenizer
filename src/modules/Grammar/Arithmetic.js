import Grammar from './Grammar.js'

class Arithmetic extends Grammar {
  constructor() {
    super()
    this.setRegexTypes({
      NUMBER: /^\d*\.?\d+/,
      ADD: /^\+/,
      SUB: /^-/,
      DIV: /^\//,
      MUL: /^\*/,
      EQUAL: /^=/,
      OPENING: /^\(/,
      CLOSING: /^\)/
    })
  }
}

export default Arithmetic