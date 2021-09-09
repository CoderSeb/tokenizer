import Grammar from './Grammar.js'

class TextGrammar extends Grammar {
  constructor() {
    super()
    this.setRegexTypes()
  }

  setRegexTypes() {
    const wordAndDot = {
      WORD: /(?=[0-9])|([A-ZÅÄÖ])\w*/gi,
      DOT: /\./g,
      COMMA: /,/g
    }
    this._setRegexTypes(wordAndDot)
  }

  getRegexTypes() {
    return this._getRegexTypes()
  }
}

export default TextGrammar