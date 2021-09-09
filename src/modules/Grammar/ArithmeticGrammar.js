import Grammar from './Grammar.js'

class ArithmeticGrammar extends Grammar {
  constructor() {
    super()
    this.setRegexTypes()
  }

  setRegexTypes() {
    const arithmetic = {
      NUMBER: /\d+\.?\d?/g,
      ADD: /\+/g,
      SUBTRACT: /-/g,
      DIVIDE: /\//g,
      MULTIPLY: /\*/g,
      EQUAL: /=/g
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