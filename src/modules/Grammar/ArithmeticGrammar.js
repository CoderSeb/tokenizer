import Grammar from './Grammar.js'

class ArithmeticGrammar extends Grammar {
  constructor() {
    super()
    this.setTypes()
  }

  setTypes() {
    const arithmetic = {
      ADD: /\+/g,
      SUBTRACT: /\-/g
    }
    this._setTypes(arithmetic)
  }

  getRegexTypes() {
    return this._getRegexTypes()
  }
}

export default ArithmeticGrammar