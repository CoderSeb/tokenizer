import Grammar from './Grammar.js'

/**
 * Contains RegExp for: NUMBER, ADD, SUB, DIV, MUL, EQUAL, OPENING, CLOSING.
 * @extends Grammar
 */
class Arithmetic extends Grammar {
  constructor() {
    super()
    this._setRegexTypes({
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