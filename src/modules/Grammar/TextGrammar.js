import Grammar from './Grammar.js'

class TextGrammar extends Grammar {
  constructor() {
    super()
    this.setRegexTypes()
  }

  setRegexTypes() {
    const wordAndDot = {
      WORD: /[\w|åäöÅÄÖ]+/g,
      DOT: /\./g,
      COMMA: /,/g,
      EXCLAMATION: /!/g,
      AND: /&/g
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