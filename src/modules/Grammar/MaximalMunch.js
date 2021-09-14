import Grammar from './Grammar.js'

class MaximalMunch extends Grammar {
  constructor() {
    super()
    this.setRegexTypes({
      FLOAT: /^[0-9]+\.[0-9]+/,
      INTEGER: /^[0-9]+/
    })
  }
}

export default MaximalMunch