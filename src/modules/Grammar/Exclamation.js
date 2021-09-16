import Grammar from './Grammar.js'

/**
 * Contains RegExp for: EXCLAMATION.
 * @extends Grammar
 */
class Exclamation extends Grammar {
  constructor() {
    super()
    this._setRegexTypes({
      EXCLAMATION: /^!/
    })
  }
}

export default Exclamation