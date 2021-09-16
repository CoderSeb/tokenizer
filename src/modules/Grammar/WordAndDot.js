import Grammar from './Grammar.js'

/**
 * Contains RegExp for: WORD, DOT.
 * @extends Grammar
 */
class WordAndDot extends Grammar {
  constructor() {
    super()
    this._setRegexTypes({
      WORD: /^[\w|åäöÅÄÖ]+/,
      DOT: /^\./
    })
  }
}

export default WordAndDot