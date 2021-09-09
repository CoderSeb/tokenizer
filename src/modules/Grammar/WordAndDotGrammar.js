import Grammar from './Grammar.js'

class WordAndDotGrammar extends Grammar {
  constructor() {
    super()
    this.setTypes()
  }

  setTypes() {
    const wordAndDot = {
      WORD: /(?=[0-9])|([A-ZÅÄÖ])*\w*/gi,
      DOT: /\./g
    }
    this._setTypes(wordAndDot)
  }

  getRegexTypes() {
    return this._getRegexTypes()
  }
}

export default WordAndDotGrammar