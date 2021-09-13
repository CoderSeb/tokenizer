import Grammar from './Grammar.js'

class Arithmetic extends Grammar {
  constructor() {
    super()
    this.setRegexTypes()
  }

  setRegexTypes() {
    const arithmetic = {
      NUMBER: /^\d+\.?\d?/,
      ADD: /^\+/,
      SUBTRACT: /^-/,
      DIVIDE: /^\//,
      MULTIPLY: /^\*/,
      EQUAL: /^=/,
      OPENING: /^\(/,
      CLOSING: /^\)/
    }
    this._setRegexTypes(arithmetic)
  }

  getRegexTypes() {
    return this._getRegexTypes()
  }
}

export default Arithmetic