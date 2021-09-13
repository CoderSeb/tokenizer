import Grammar from './Grammar.js'

class WordAndDot extends Grammar {
  constructor() {
    super()
    this.setRegexTypes()
  }

  setRegexTypes() {
    const wordAndDot = {
      WORD: /^[\w|åäöÅÄÖ]+/,
      DOT: /^\./
    }
    this._setRegexTypes(wordAndDot)
  }

  getRegexTypes() {
    return this._getRegexTypes()
  }
}

export default WordAndDot