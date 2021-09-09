import Grammar from './Grammar.js'

class ArithmeticGrammar extends Grammar {
  constructor() {
    super()
    this.setRegexTypes()
  }

  setRegexTypes() {
    const arithmetic = {
      ADD: /\+/g,
      SUBTRACT: /-/g,
      DIVIDE: /\//g,
      MULTIPLY: /\*/g
    }
    this._setRegexTypes(arithmetic)
  }

  getRegexTypes() {
    return this._getRegexTypes()
  }
}

export default ArithmeticGrammar