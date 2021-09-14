import Grammar from './Grammar.js'

class WordAndDot extends Grammar {
  constructor() {
    super()
    this.setRegexTypes({
      WORD: /^[\w|åäöÅÄÖ]+/,
      DOT: /^\./
    })
  }
}

export default WordAndDot