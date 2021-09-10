import Grammar from './Grammar.js'

class TextGrammar extends Grammar {
  constructor() {
    super()
    this.setRegexTypes()
  }

  setRegexTypes() {
    const wordAndDot = {
      WORD: /[\w|åäöÅÄÖ]+/,
      DOT: /\./,
      COMMA: /,/,
      EXCLAMATION: /!/,
      AND: /&/
    }
    this._setRegexTypes(wordAndDot)
    this._setGeneralRegex(/[\w|åäöÅÄÖ]+|\.|!|,|&/g)
  }

  getRegexTypes() {
    return this._getRegexTypes()
  }

  getGeneralRegex() {
    return this._getGeneralRegex()
  }
}

export default TextGrammar