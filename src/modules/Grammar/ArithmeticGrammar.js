import Grammar from './Grammar.js'

class ArithmeticGrammar extends Grammar {
  constructor() {
    super()
    this.setRegexTypes()
  }

  setRegexTypes() {
    const arithmetic = {
      NUMBER: /\d+\.?\d?/,
      ADD: /\+/,
      SUBTRACT: /-/,
      DIVIDE: /\//,
      MULTIPLY: /\*/,
      EQUAL: /=/
    }
    this._setRegexTypes(arithmetic)
    this._setGeneralRegex(/[+|*|/|()=]|[0-9]+(\.([0-9])+)?/g)
  }

  getRegexTypes() {
    return this._getRegexTypes()
  }

  getGeneralRegex() {
    return this._getGeneralRegex()
  }
}

export default ArithmeticGrammar