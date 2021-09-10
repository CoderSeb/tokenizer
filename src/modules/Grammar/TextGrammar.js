import Grammar from './Grammar.js'

class TextGrammar extends Grammar {
  constructor() {
    super()
    this.setRegexTypes()
  }

  setRegexTypes() {
    const wordAndDot = {
      WORD: /^[\w|åäöÅÄÖ]+/,
      DOT: /^\./,
      COMMA: /^,/,
      EXCLAMATION: /^!/,
      AND: /^&/
    }
    this._setRegexTypes(wordAndDot)
  }

  getRegexTypes() {
    return this._getRegexTypes()
  }
}

export default TextGrammar