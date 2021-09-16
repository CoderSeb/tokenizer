import Grammar from './Grammar.js'

/**
 * Contains RegExp for: FLOAT, INTEGER.
 * @extends Grammar
 */
class MaximalMunch extends Grammar {
  constructor() {
    super()
    this._setRegexTypes({
      FLOAT: /^[0-9]+\.[0-9]+/,
      INTEGER: /^[0-9]+/
    })
  }
}

export default MaximalMunch